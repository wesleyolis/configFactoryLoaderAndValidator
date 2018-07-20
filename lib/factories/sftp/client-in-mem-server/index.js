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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQWM1QixnQkFBRTtBQWJYLHVGQUFxRztBQUNyRywwQ0FBMkM7QUFFM0MsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVFwQixvQkFBSTtBQU5iLCtDQUFnRTtBQUVoRSwyQkFBNEI7QUFDNUIsbUNBQWdDO0FBQ2hDLGlDQUFpQztBQXNEakMsbUJBQW1CLElBQWlCLEVBQUUsSUFBYTtJQUVqRCxJQUFJLENBQUMsSUFBSTtRQUNQLE9BQU8sU0FBUyxDQUFDO1NBQ2QsSUFBSSxJQUFJLEtBQUssR0FBRztRQUNuQixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksRUFBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBUyxDQUFDLE9BQU87Z0JBQ2hFLEtBQUssRUFBRyxDQUFDO2dCQUNULEdBQUcsRUFBRyxDQUFDO2dCQUNQLEtBQUssRUFBRyxDQUFDO2dCQUNULElBQUksRUFBRyxDQUFDO2dCQUNSLEdBQUcsRUFBRyxDQUFDO2FBQ00sRUFBRSxJQUFJLEVBQUUsY0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFlLENBQUM7SUFFdEU7Ozs7Ozs7O01BUUU7SUFFRixnREFBZ0Q7SUFDaEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JB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