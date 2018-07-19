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
            yield this.startAsync();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQWM1QixnQkFBRTtBQWJYLHVGQUFxRztBQUNyRywwQ0FBMkM7QUFFM0MsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVFwQixvQkFBSTtBQU5iLCtDQUFnRTtBQUVoRSwyQkFBNEI7QUFDNUIsbUNBQWdDO0FBQ2hDLGlDQUFpQztBQXNEakMsbUJBQW1CLElBQWlCLEVBQUUsSUFBYTtJQUVqRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUM7UUFDcEIsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksRUFBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBUyxDQUFDLE9BQU87Z0JBQ2hFLEtBQUssRUFBRyxDQUFDO2dCQUNULEdBQUcsRUFBRyxDQUFDO2dCQUNQLEtBQUssRUFBRyxDQUFDO2dCQUNULElBQUksRUFBRyxDQUFDO2dCQUNSLEdBQUcsRUFBRyxDQUFDO2FBQ00sRUFBRSxJQUFJLEVBQUUsY0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFlLENBQUM7SUFFdEU7Ozs7Ozs7O01BUUU7SUFFRixnREFBZ0Q7SUFDaEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FB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