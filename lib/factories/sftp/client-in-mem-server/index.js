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
const rbLog = global.rbLog;
const bluebird_1 = require("bluebird");
const CS = require("./config-schema");
exports.CS = CS;
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const index_1 = require("../../../index");
const index_2 = require("../client/index");
const Ssh2 = require("ssh2");
exports.Ssh2 = Ssh2;
const ssh2_streams_1 = require("ssh2-streams");
const fs = require("fs");
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
class SftpInMemoryClientWrapper extends index_2.SftpClient {
    constructor(configSettings) {
        super(configSettings);
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.netService;
        this.type = config_factory_types_1.ConfigFactoryTypes.production;
        this.configSchema = CS.configSchema;
        this.server = undefined;
    }
    static NewInstance() {
        return new index_2.SftpClient(undefined);
    }
    createAsync(config) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, config);
        });
    }
    startAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            const sftpSettings = {
                hostKeys: [fs.readFileSync('../resouces/test/ssh/sftp_rsa')],
                ident: CS.factoryName,
                debug: rbLog.info
            };
            this.server = Ssh2.Server.createServer(sftpSettings, (clientConnection, info) => {
                clientConnection.on('authentication', (authCtx) => {
                    if (this.configSettings.credentials) {
                        if (authCtx.username != this.configSettings.credentials.username) {
                            authCtx.reject(['password', 'publickey']);
                        }
                        else if (authCtx.method === 'publickey') {
                            if (this.configSettings.credentials.auth.type === index_1.JoiV.AuthType.publicKey || this.configSettings.credentials.auth.type === index_1.JoiV.AuthType.any) {
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
                            if (this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.password || this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.any) {
                                if (authCtx.password == this.configSettings.credentials.auth.password) {
                                    rbLog.info({}, `Client Authenticated`);
                                    authCtx.accept();
                                }
                                else {
                                    authCtx.reject(this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.any ? ['publicKey'] : [], true);
                                }
                            }
                            else {
                                authCtx.reject(['publicKey'], true);
                            }
                        }
                    }
                    else {
                        authCtx.accept();
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
                                    handle.writeUInt32BE(handleCount++, 0, true);
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
                                if (handle.length !== 4 || !openFiles[handle.readUInt32BE(0, true)])
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
                                const handleId = handle.readUInt32BE(0, true);
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
                                const handleId = handle.readUInt32BE(0, true);
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
            const listernAsync = bluebird_1.promisify(this.server.listen).bind(this.server);
            yield listernAsync(this.configSettings.port, this.configSettings.host);
            rbLog.info({ InMemsftp: {
                    status: 'listerning',
                    address: this.server.address().address,
                    port: this.server.address().port
                }
            }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);
            yield _super("startAsync").call(this);
        });
    }
    stopAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("stopAsync").call(this);
            this.server.close();
        });
    }
}
exports.SftpInMemoryClientWrapper = SftpInMemoryClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQWM1QixnQkFBRTtBQWJYLHVGQUFxRztBQUNyRywwQ0FBMkM7QUFFM0MsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVFwQixvQkFBSTtBQU5iLCtDQUFnRTtBQUNoRSx5QkFBeUI7QUFDekIsMkJBQTRCO0FBQzVCLG1DQUFnQztBQUNoQyxpQ0FBaUM7QUFzRGpDLG1CQUFtQixJQUFpQixFQUFFLElBQWE7SUFFakQsSUFBSSxDQUFDLElBQUk7UUFDUCxPQUFPLFNBQVMsQ0FBQztTQUNkLElBQUksSUFBSSxLQUFLLEdBQUc7UUFDbkIsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUM1QixJQUFJLEVBQUcsY0FBUyxDQUFDLE9BQU8sR0FBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPO2dCQUNoRSxLQUFLLEVBQUcsQ0FBQztnQkFDVCxHQUFHLEVBQUcsQ0FBQztnQkFDUCxLQUFLLEVBQUcsQ0FBQztnQkFDVCxJQUFJLEVBQUcsQ0FBQztnQkFDUixHQUFHLEVBQUcsQ0FBQzthQUNNLEVBQUUsSUFBSSxFQUFFLGNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBZSxDQUFDO0lBRXRFOzs7Ozs7OztNQVFFO0lBRUYsZ0RBQWdEO0lBQ2hELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUs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