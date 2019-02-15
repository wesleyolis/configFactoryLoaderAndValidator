import { promisify } from 'bluebird'

import * as CS from './config-schema'
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types'
import * as Joi from 'joi'
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'

import { SftpClient } from '../client/index'
import * as Ssh2 from 'ssh2';
import { Connection, ClientInfo, ServerConfig } from 'ssh2';
import { SFTPStream, FileEntry, ParsedKey } from 'ssh2-streams';
import * as fs from 'fs';
import * as path from 'path';
import {constants} from 'fs'
import { VError } from 'verror';
import * as Crypto from 'crypto';

export { Ssh2 }
export { CS }

type FSNode = {[index:string] : FSNodeItem}

interface FSNodeItem {
  items : FSNode | null,
  attribs : Attributes,
  type : FSNodeTypes
  data : Buffer | null
}

interface FSNodeReferanceCount {
  node : FSNodeItem,
  count : number
}


 interface Attributes {
  mode: FSNodeAttributes;
  uid: number;
  gid: number;
  size: number;
  atime: number;
  mtime: number;
}

type FSNodeTypes = typeof constants.S_IFMT
| typeof constants.S_IFREG
| typeof constants.S_IFDIR
| typeof constants.S_IFCHR
| typeof constants.S_IFBLK
| typeof constants.S_IFIFO
| typeof constants.S_IFLNK
| typeof constants.S_IFSOCK


type FSNodeAttributes = typeof constants.S_IRWXU
| typeof constants.S_IRUSR
| typeof constants.S_IWUSR
| typeof constants.S_IXUSR
| typeof constants.S_IRWXG
| typeof constants.S_IRGRP
| typeof constants.S_IWGRP
| typeof constants.S_IXGRP
| typeof constants.S_IRWXO
| typeof constants.S_IROTH
| typeof constants.S_IWOTH
| typeof constants.S_IXOTH


function getFSNode(root : FSNodeItem, path : string) : FSNodeItem | undefined | null
{
  if (!path)
    return undefined;
  else if (path === "/")
    return {items: null, attribs: {
      mode : constants.S_IRWXU | constants.S_IRWXG | constants.S_IRWXO,
      atime : 0,
      gid : 0,
      mtime : 0,
      size : 0,
      uid : 0
    } as Attributes, type: constants.S_IFDIR, data: null} as FSNodeItem;

  /*

interface FSNodeItem {
  items : FSNode | null,
  attribs : Attributes,
  type : FSNodeTypes
  data : Buffer | null
}
  */

  // Assume it is not the route node that we need.
  const nodePathSegmentNames = path.split('/');

  let currNode = root;

  for (let i = 1; i < nodePathSegmentNames.length; i++)
  {
    const segmentName = nodePathSegmentNames[i];

    if (currNode.items)
    {
      const item = currNode.items[segmentName];

      if (item === undefined)
        return null;

      currNode = item;
    }
    else
      return null;
  }

  return null;
}


function isFSNodeDir(node : FSNodeItem) : boolean
{
  if (node && node.type === constants.S_IFDIR)
    return true;
  else
    return false;
}

function isFSDir(root : FSNodeItem, path : string) : boolean
{
  const node = getFSNode(root, path);

  if (node && node.type === constants.S_IFDIR)
    return true;
  else
    return false;
}

class Errors
{
  static readonly parseKeyFailedToLoad : string = "parseKeyFailedToLoad";
}

const hostKeyPath = path.resolve('resouces/test/ssh/sftp_rsa');

export class SftpInMemoryClientWrapper<T extends CS.ConfigSchema> extends SftpClient<T>
{
    factoryName: string = CS.factoryName;
    factoryClass: ConfigFactoryClass = ConfigFactoryClass.netService;
    type: ConfigFactoryTypes = ConfigFactoryTypes.production;
    configSchema = CS.configSchema;

    private server? : Ssh2.Server = undefined;

    static NewInstance()
    {
        return new SftpClient<any>(undefined) as SftpClient<CS.ConfigSchema>; 
    }

    constructor(configSettings : T)
    {
        super(configSettings);
    }

    async createAsync(config : JoiX.XJSchemaMap) : Promise<void>
    {
        await super.createAsync(config);
    }
    
    public async startAsync()
    {
      const sftpSettings : ServerConfig = {
        hostKeys : [fs.readFileSync(hostKeyPath)],
        ident : CS.factoryName,
        debug : (global as any).rbLog.info
      };
      
      this.server = Ssh2.Server.createServer(sftpSettings, (clientConnection: Connection, info: ClientInfo) : void =>
      {
        clientConnection.on('authentication', (authCtx: Ssh2.AuthContext) => {

          if (this.configSettings.credentials)
          {
            if (authCtx.username !== this.configSettings.credentials.username)
            {
              if (authCtx.method === 'none')
                authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey','password'] :
                this.configSettings.credentials.auth.type == JoiV.AuthType.password ? ['password'] : ['publicKey'], true);
              else
                authCtx.reject();
              // reject better to move this code into each method.. I feel a big refactor is need, but we just leave this as is.
            }
            else if (authCtx.method === 'publickey')
            {
              if (this.configSettings.credentials.auth.type === JoiV.AuthType.publicKey || this.configSettings.credentials.auth.type === JoiV.AuthType.any)
              {
                function isParsedKey(x : ParsedKey | Error) : x is ParsedKey
                {
                  return (<ParsedKey> x).public !== undefined; 
                }
  
                const pubKeyOrError = Ssh2.utils.parseKey(this.configSettings.credentials.auth.phrase);
  
                if (isParsedKey(pubKeyOrError))
                {
                  if (authCtx.key.algo === pubKeyOrError.fulltype && Buffer.compare(authCtx.key.data, pubKeyOrError.public) === 0)
                  {
                    if (authCtx.signature)
                    {
                      const verifier = Crypto.createVerify(authCtx.sigAlgo);
                      verifier.update(authCtx.blob);
  
                      if (verifier.verify(pubKeyOrError, authCtx.signature))
                        authCtx.accept();
                      else
                        authCtx.reject();
                    }
                    else
                      authCtx.accept();
                  }
                  else
                  {
                    authCtx.reject();
                  }
                }
                else
                {
                  authCtx.reject();
                  throw new VError(pubKeyOrError, Errors.parseKeyFailedToLoad);
                }
              }
              else
              {
                authCtx.reject(this.configSettings.credentials!.username === undefined ? [] : ['password']);
              }
            }
            else if (authCtx.method === 'password')
            {
              if (this.configSettings.credentials.auth.type == JoiV.AuthType.password || this.configSettings.credentials.auth.type == JoiV.AuthType.any)
              {
                if (authCtx.password == this.configSettings.credentials.auth.password)
                {
                  (global as any).rbLog.info({}, `Client Authenticated`);
                  authCtx.accept();
                }
                else
                {
                  authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey'] : [], true);
                }
              }
              else
              {
                authCtx.reject(['publicKey'], true);
              }
            }
            else if (authCtx.method === 'none')
            {
              authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey','password'] :
              this.configSettings.credentials.auth.type == JoiV.AuthType.password ? ['password'] : ['publicKey'], true);
            }
          }
          else if (authCtx.method == "none")
          {
            authCtx.accept();
          }
          else
          {
            authCtx.reject();
          }
        });
        
        clientConnection.on('ready', function()
        {
          clientConnection.on('session', function(accept, reject) {
  
            var session = accept();
  
            session.on('sftp', function(accept, reject) {
              
              let rootFSNodeItem : FSNodeItem = {items:null, attribs : {
                mode : constants.S_IRWXU | constants.S_IRWXG | constants.S_IRWXO,  
                uid : 0,
                gid : 0,
                size : 0,
                mtime : Date.now(),
                atime : Date.now()
              }, type:0, data: null};
  
              // Open files needs to be a referance to FSNode.
              var openFiles : {[index:number] : FSNodeReferanceCount} = {};
              var handleCount = 0;
              
              var sftpStream = accept();
  
              function openFSNode(reqid : number, pathAndFilename : string, check: (item: FSNodeItem) => boolean)
              {
                const fsNode = getFSNode(rootFSNodeItem, pathAndFilename);
  
                if (!fsNode || !check(fsNode))
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
                else
                {
                  const nodeRef = openFiles[handleCount] || {count: 0, node: fsNode};
                  nodeRef.count++;
                  openFiles[handleCount] = nodeRef;
  
                  const handle = new Buffer(4);
                  handle.writeUInt32BE(handleCount++, 0);
                  sftpStream.handle(reqid, handle);
                  
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.OK);
                }
              }
  
              sftpStream.on('OPENDIR', (reqid, path) =>
              {
                openFSNode(reqid, path, isFSNodeDir);
              });
  
              sftpStream.on('OPEN', (reqid, pathAndFilename, flags, attrs) =>
              {
                openFSNode(reqid, pathAndFilename, (_) => true);
              });
  
              sftpStream.on('WRITE', (reqid, handle, offset, data) =>
              {
                if(handle.length !== 4 || !openFiles[handle.readUInt32BE(0)])
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
    
                const nodeRef = openFiles[handleCount];
  
                if (!nodeRef)
                  sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
  
                if (!nodeRef.node.data)
                {
                  const bufferLen = offset + data.length;
                  nodeRef.node.data = new Buffer(bufferLen);
                }
                
                data.copy(nodeRef.node.data, offset);
  
                return sftpStream.status(reqid, SFTPStream.STATUS_CODE.OK);
              });
  
              sftpStream.on('READDIR', function (reqid: number, handle: Buffer)
              {
                if (handle.length !== 4)
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
  
                const handleId = handle.readUInt32BE(0);
  
                const fsNode = openFiles[handleId];
  
                if (!fsNode)
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
  
                if (!fsNode.node.items)
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
  
                const items = fsNode.node.items;
                const keys = Object.keys(items);
  
                let files : FileEntry [] = keys.map(key => {
  
                  const item = items[key];
  
                  return {
                    filename : key,
                    longname : "",
                    attrs : item.attribs
                  } as FileEntry
  
                });
  
                sftpStream.name(reqid, files);
  
                sftpStream.status(reqid, SFTPStream.STATUS_CODE.EOF);
              })
              
              sftpStream.on('CLOSE', function(reqid, handle) {
                
                if (handle.length !== 4)
                  return sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
  
                const handleId = handle.readUInt32BE(0);
                const fsNode = openFiles[handleId];
  
                if (fsNode)
                {
                  fsNode.count--;
  
                  if (fsNode.count <= 0)
                    delete openFiles[handleId];
  
                  sftpStream.status(reqid, SFTPStream.STATUS_CODE.OK);
                }
                else
                {
                  sftpStream.status(reqid, SFTPStream.STATUS_CODE.FAILURE);
                }
              });
            });
          });
        }).on('end', function() {
          console.log('Client disconnected');
        });
      });
  
      //Type upgrading issues...
      const listernAsync = promisify(this.server.listen).bind(this.server)

      if(this.configSettings.port)
        //throw new Error('Please fix mis matching typing issues in typescript3.2 for htis code to work');
      await (listernAsync as any)(this.configSettings.port, this.configSettings.host);

      (global as any).rbLog.info({InMemsftp : {
          status: 'listerning', 
          address: this.server.address().address,
          port: this.server.address().port
          }
      }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);

      await super.startAsync();
    }

    public async stopAsync()
    {
      await super.stopAsync();

      this.server!.close();
    }

    
}
