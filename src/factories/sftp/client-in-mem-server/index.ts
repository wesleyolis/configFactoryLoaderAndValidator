import {} from 'redblade-types'
const rbLog = global.rbLog;

import * as JoiX from '../../../joi-x'
import { promisify } from 'bluebird'

import * as CS from './config-schema'
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types'
import { JoiV } from '../../..';

import { SftpClient } from '../client/index'
import * as Ssh2 from 'ssh2';
import { Connection, ClientInfo, ServerConfig } from 'ssh2';
import { SFTPStream, FileEntry, Attributes } from 'ssh2-streams';
import * as fs from 'fs';
import {constants} from 'fs'
import { STATUS_CODES } from 'http';

export { Ssh2 }

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
    return {items: null, attribs: 777, type: constants.S_IFDIR} as FSNodeItem;

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
        await super.startAsync();
        
this.configSettings.credentials

        this.configSettings.credentials.

        // The base class already handles this and check that createAsync has been called.
        const sftpSettings : ServerConfig = {
            ident : CS.factoryName,
            algorithms = {
                kex?: string[];
                cipher?: string[];
                serverHostKey?: string[];
                hmac?: string[];
                compress?: string[];
            } as Algorithms,
            debug : rbLog.info
        };
        
        //static createServer(config: ServerConfig, connectionListener?: (client: Connection, info: ClientInfo) => void): Server;

        this.server = Ssh2.Server.createServer(sftpSettings, this.ServerConnectionListern);
    
        const listernAsync = promisify(this.server.listen).bind(this.server);

        await listernAsync(this.configSettings.port, this.configSettings.host);

        rbLog.info({InMemsftp : {
            status: 'listerning', 
            address: this.server.address().address,
            port: this.server.address().port
            }
        }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);
    }

    public async stopAsync()
    {
        await super.stopAsync();
    }

    private ServerConnectionListern(clientConnection: Connection, info: ClientInfo) : void
    {
        if (this.configSettings.credentials)
        {
          clientConnection.on('authentication', (authCtx: Ssh2.AuthContext) => {

            // Typically should look at locking down the system.
            if (this.configSettings.credentials!.password.phrase === JoiV.PassType.plainText && authCtx.method === 'password')
            {
              if (authCtx.username == this.configSettings.credentials!.username && authCtx.password == this.configSettings.credentials!.password.phrase)
              {
                rbLog.info({}, `Client Authenticated`);
                authCtx.accept();
              }
              else
              {
                authCtx.reject();
              }
            }

          });
          
          clientConnection.on('ready', function()
          {
            clientConnection.on('session', function(accept, reject) {

              var session = accept();

              session.on('sftp', function(accept, reject) {
               
                let rootFSNodeItem : FSNodeItem = {items:null, attribs : 0, type:0, data: null};

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
                    handle.writeUInt32BE(handleCount++, 0, true);
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
                  openFSNode(reqid, path, isFSNodeDir);
                });

                sftpStream.on('WRITE', (reqid, handle, offset, data) =>
                {
                  if(handle.length !== 4 || !openFiles[handle.readUInt32BE(0, true)])
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

                sftpStream.on('CLOSE', (reqid, handle) => {

                  if (handle.length !== 4)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);

                  const handleId = handle.readUInt32BE(0, true);

                  const fsNode = openFiles[handleId];

                  if (!fsNode)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);
                  else
                  {
                    delete openFiles[handleId];
                  }

                  sftpStream.status(reqid, STATUS_CODE.OK);
                });

                sftpStream.on('READDIR', function (reqid: number, handle: Buffer)
                {
                  if (handle.length !== 4)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);

                  const handleId = handle.readUInt32BE(0, true);

                  const fsNode = openFiles[handleId];

                  if (!fsNode)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);

                  if (!fsNode.node.items)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);

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

                  sftpStream.status(reqid, STATUS_CODE.EOF);


                })
                
                sftpStream.on('CLOSE', function(reqid, handle) {
                  
                  if (handle.length !== 4)
                    return sftpStream.status(reqid, STATUS_CODE.FAILURE);

                  const handleId = handle.readUInt32BE(0, true);
                  const fsNode = openFiles[handleId];

                  if (fsNode)
                  {
                    fsNode.count--;

                    if (fsNode.count <= 0)
                      delete openFiles[handleId];

                    sftpStream.status(reqid, STATUS_CODE.OK);
                  }
                  else
                  {
                    sftpStream.status(reqid, STATUS_CODE.FAILURE);
                  }
                });
              });
            });
          }).on('end', function() {
            console.log('Client disconnected');
          });
          
    }
}


/*
function onSTAT(reqid, path) {
  let mode = constants.S_IFREG; // Regular file
  mode |= constants.S_IRWXU; // read, write, execute for user
  mode |= constants.S_IRWXG; // read, write, execute for group
  mode |= constants.S_IRWXO; // read, write, execute for other
  sftpStream.attrs(reqid, {
    mode: mode,
    uid: 0,
    gid: 0,
    size: 3,
    atime: Date.now(),
    mtime: Date.now()
  });
}
*/