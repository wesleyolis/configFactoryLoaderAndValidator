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
                hostKeys: [],
                ident: CS.factoryName,
                debug: rbLog.info
            };
            this.server = Ssh2.Server.createServer(sftpSettings, this.ServerConnectionListern);
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
    ServerConnectionListern(clientConnection, info) {
        if (this.configSettings.credentials) {
            clientConnection.on('authentication', (authCtx) => {
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
        }
    }
}
exports.SftpInMemoryClientWrapper = SftpInMemoryClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQWM1QixnQkFBRTtBQWJYLHVGQUFxRztBQUNyRywwQ0FBMkM7QUFFM0MsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVFwQixvQkFBSTtBQU5iLCtDQUFnRTtBQUVoRSwyQkFBNEI7QUFDNUIsbUNBQWdDO0FBQ2hDLGlDQUFpQztBQXNEakMsbUJBQW1CLElBQWlCLEVBQUUsSUFBYTtJQUVqRCxJQUFJLENBQUMsSUFBSTtRQUNQLE9BQU8sU0FBUyxDQUFDO1NBQ2QsSUFBSSxJQUFJLEtBQUssR0FBRztRQUNuQixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksRUFBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBUyxDQUFDLE9BQU87Z0JBQ2hFLEtBQUssRUFBRyxDQUFDO2dCQUNULEdBQUcsRUFBRyxDQUFDO2dCQUNQLEtBQUssRUFBRyxDQUFDO2dCQUNULElBQUksRUFBRyxDQUFDO2dCQUNSLEdBQUcsRUFBRyxDQUFDO2FBQ00sRUFBRSxJQUFJLEVBQUUsY0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFlLENBQUM7SUFFdEU7Ozs7Ozs7O01BUUU7SUFFRixnREFBZ0Q7SUFDaEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JB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QUVELFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUV2QyxVQUFVLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQzt3QkFDdkMsQ0FBQyxDQUFDLENBQUM7d0JBRUgsVUFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTs0QkFFN0QsVUFBVSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsRCxDQUFDLENBQUMsQ0FBQzt3QkFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFOzRCQUVyRCxJQUFHLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dDQUNoRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLHlCQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUVsRSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBRXZDLElBQUksQ0FBQyxPQUFPO2dDQUNWLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLHlCQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzRCQUUzRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQ3RCO2dDQUNFLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO2dDQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs2QkFD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