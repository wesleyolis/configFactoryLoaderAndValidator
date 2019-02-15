"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const CS = require("./config-schema");
exports.CS = CS;
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const JoiV = require("../../../joi-x-validators");
const index_1 = require("../client/index");
const Ssh2 = require("ssh2");
exports.Ssh2 = Ssh2;
const ssh2_streams_1 = require("ssh2-streams");
const fs = require("fs");
const path = require("path");
const fs_1 = require("fs");
const verror_1 = require("verror");
const Crypto = require("crypto");
function getFSNode(root, path) {
    if (!path)
        return undefined;
    else if (path === "/")
        return { items: null, attribs: {
                mode: fs_1.constants.S_IRWXU | fs_1.constants.S_IRWXG | fs_1.constants.S_IRWXO,
                atime: 0,
                gid: 0,
                mtime: 0,
                size: 0,
                uid: 0
            }, type: fs_1.constants.S_IFDIR, data: null };
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
    for (let i = 1; i < nodePathSegmentNames.length; i++) {
        const segmentName = nodePathSegmentNames[i];
        if (currNode.items) {
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
function isFSNodeDir(node) {
    if (node && node.type === fs_1.constants.S_IFDIR)
        return true;
    else
        return false;
}
function isFSDir(root, path) {
    const node = getFSNode(root, path);
    if (node && node.type === fs_1.constants.S_IFDIR)
        return true;
    else
        return false;
}
class Errors {
}
Errors.parseKeyFailedToLoad = "parseKeyFailedToLoad";
const hostKeyPath = path.resolve('resouces/test/ssh/sftp_rsa');
class SftpInMemoryClientWrapper extends index_1.SftpClient {
    constructor(configSettings) {
        super(configSettings);
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.netService;
        this.type = config_factory_types_1.ConfigFactoryTypes.production;
        this.configSchema = CS.configSchema;
        this.server = undefined;
    }
    static NewInstance() {
        return new index_1.SftpClient(undefined);
    }
    createAsync(config) {
        const _super = Object.create(null, {
            createAsync: { get: () => super.createAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.createAsync.call(this, config);
        });
    }
    startAsync() {
        const _super = Object.create(null, {
            startAsync: { get: () => super.startAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const sftpSettings = {
                hostKeys: [fs.readFileSync(hostKeyPath)],
                ident: CS.factoryName,
                debug: global.rbLog.info
            };
            this.server = Ssh2.Server.createServer(sftpSettings, (clientConnection, info) => {
                clientConnection.on('authentication', (authCtx) => {
                    if (this.configSettings.credentials) {
                        if (authCtx.username !== this.configSettings.credentials.username) {
                            if (authCtx.method === 'none')
                                authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey', 'password'] :
                                    this.configSettings.credentials.auth.type == JoiV.AuthType.password ? ['password'] : ['publicKey'], true);
                            else
                                authCtx.reject();
                            // reject better to move this code into each method.. I feel a big refactor is need, but we just leave this as is.
                        }
                        else if (authCtx.method === 'publickey') {
                            if (this.configSettings.credentials.auth.type === JoiV.AuthType.publicKey || this.configSettings.credentials.auth.type === JoiV.AuthType.any) {
                                function isParsedKey(x) {
                                    return x.public !== undefined;
                                }
                                const pubKeyOrError = Ssh2.utils.parseKey(this.configSettings.credentials.auth.phrase);
                                if (isParsedKey(pubKeyOrError)) {
                                    if (authCtx.key.algo === pubKeyOrError.fulltype && Buffer.compare(authCtx.key.data, pubKeyOrError.public) === 0) {
                                        if (authCtx.signature) {
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
                                    else {
                                        authCtx.reject();
                                    }
                                }
                                else {
                                    authCtx.reject();
                                    throw new verror_1.VError(pubKeyOrError, Errors.parseKeyFailedToLoad);
                                }
                            }
                            else {
                                authCtx.reject(this.configSettings.credentials.username === undefined ? [] : ['password']);
                            }
                        }
                        else if (authCtx.method === 'password') {
                            if (this.configSettings.credentials.auth.type == JoiV.AuthType.password || this.configSettings.credentials.auth.type == JoiV.AuthType.any) {
                                if (authCtx.password == this.configSettings.credentials.auth.password) {
                                    global.rbLog.info({}, `Client Authenticated`);
                                    authCtx.accept();
                                }
                                else {
                                    authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey'] : [], true);
                                }
                            }
                            else {
                                authCtx.reject(['publicKey'], true);
                            }
                        }
                        else if (authCtx.method === 'none') {
                            authCtx.reject(this.configSettings.credentials.auth.type == JoiV.AuthType.any ? ['publicKey', 'password'] :
                                this.configSettings.credentials.auth.type == JoiV.AuthType.password ? ['password'] : ['publicKey'], true);
                        }
                    }
                    else if (authCtx.method == "none") {
                        authCtx.accept();
                    }
                    else {
                        authCtx.reject();
                    }
                });
                clientConnection.on('ready', function () {
                    clientConnection.on('session', function (accept, reject) {
                        var session = accept();
                        session.on('sftp', function (accept, reject) {
                            let rootFSNodeItem = { items: null, attribs: {
                                    mode: fs_1.constants.S_IRWXU | fs_1.constants.S_IRWXG | fs_1.constants.S_IRWXO,
                                    uid: 0,
                                    gid: 0,
                                    size: 0,
                                    mtime: Date.now(),
                                    atime: Date.now()
                                }, type: 0, data: null };
                            // Open files needs to be a referance to FSNode.
                            var openFiles = {};
                            var handleCount = 0;
                            var sftpStream = accept();
                            function openFSNode(reqid, pathAndFilename, check) {
                                const fsNode = getFSNode(rootFSNodeItem, pathAndFilename);
                                if (!fsNode || !check(fsNode))
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                else {
                                    const nodeRef = openFiles[handleCount] || { count: 0, node: fsNode };
                                    nodeRef.count++;
                                    openFiles[handleCount] = nodeRef;
                                    const handle = new Buffer(4);
                                    handle.writeUInt32BE(handleCount++, 0);
                                    sftpStream.handle(reqid, handle);
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.OK);
                                }
                            }
                            sftpStream.on('OPENDIR', (reqid, path) => {
                                openFSNode(reqid, path, isFSNodeDir);
                            });
                            sftpStream.on('OPEN', (reqid, pathAndFilename, flags, attrs) => {
                                openFSNode(reqid, pathAndFilename, (_) => true);
                            });
                            sftpStream.on('WRITE', (reqid, handle, offset, data) => {
                                if (handle.length !== 4 || !openFiles[handle.readUInt32BE(0)])
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                const nodeRef = openFiles[handleCount];
                                if (!nodeRef)
                                    sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                if (!nodeRef.node.data) {
                                    const bufferLen = offset + data.length;
                                    nodeRef.node.data = new Buffer(bufferLen);
                                }
                                data.copy(nodeRef.node.data, offset);
                                return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.OK);
                            });
                            sftpStream.on('READDIR', function (reqid, handle) {
                                if (handle.length !== 4)
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                const handleId = handle.readUInt32BE(0);
                                const fsNode = openFiles[handleId];
                                if (!fsNode)
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                if (!fsNode.node.items)
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                const items = fsNode.node.items;
                                const keys = Object.keys(items);
                                let files = keys.map(key => {
                                    const item = items[key];
                                    return {
                                        filename: key,
                                        longname: "",
                                        attrs: item.attribs
                                    };
                                });
                                sftpStream.name(reqid, files);
                                sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.EOF);
                            });
                            sftpStream.on('CLOSE', function (reqid, handle) {
                                if (handle.length !== 4)
                                    return sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                const handleId = handle.readUInt32BE(0);
                                const fsNode = openFiles[handleId];
                                if (fsNode) {
                                    fsNode.count--;
                                    if (fsNode.count <= 0)
                                        delete openFiles[handleId];
                                    sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.OK);
                                }
                                else {
                                    sftpStream.status(reqid, ssh2_streams_1.SFTPStream.STATUS_CODE.FAILURE);
                                }
                            });
                        });
                    });
                }).on('end', function () {
                    console.log('Client disconnected');
                });
            });
            //Type upgrading issues...
            const listernAsync = bluebird_1.promisify(this.server.listen).bind(this.server);
            if (this.configSettings.port)
                //throw new Error('Please fix mis matching typing issues in typescript3.2 for htis code to work');
                yield listernAsync(this.configSettings.port, this.configSettings.host);
            global.rbLog.info({ InMemsftp: {
                    status: 'listerning',
                    address: this.server.address().address,
                    port: this.server.address().port
                }
            }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);
            yield _super.startAsync.call(this);
        });
    }
    stopAsync() {
        const _super = Object.create(null, {
            stopAsync: { get: () => super.stopAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.stopAsync.call(this);
            this.server.close();
        });
    }
}
exports.SftpInMemoryClientWrapper = SftpInMemoryClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVDQUFvQztBQUVwQyxzQ0FBcUM7QUFpQjVCLGdCQUFFO0FBaEJYLHVGQUFxRztBQUdyRyxrREFBaUQ7QUFFakQsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVNwQixvQkFBSTtBQVBiLCtDQUFnRTtBQUNoRSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDJCQUE0QjtBQUM1QixtQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBcURqQyxTQUFTLFNBQVMsQ0FBQyxJQUFpQixFQUFFLElBQWE7SUFFakQsSUFBSSxDQUFDLElBQUk7UUFDUCxPQUFPLFNBQVMsQ0FBQztTQUNkLElBQUksSUFBSSxLQUFLLEdBQUc7UUFDbkIsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUM1QixJQUFJLEVBQUcsY0FBUyxDQUFDLE9BQU8sR0FBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPO2dCQUNoRSxLQUFLLEVBQUcsQ0FBQztnQkFDVCxHQUFHLEVBQUcsQ0FBQztnQkFDUCxLQUFLLEVBQUcsQ0FBQztnQkFDVCxJQUFJLEVBQUcsQ0FBQztnQkFDUixHQUFHLEVBQUcsQ0FBQzthQUNNLEVBQUUsSUFBSSxFQUFFLGNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBZSxDQUFDO0lBRXRFOzs7Ozs7OztNQVFFO0lBRUYsZ0RBQWdEO0lBQ2hELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixD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