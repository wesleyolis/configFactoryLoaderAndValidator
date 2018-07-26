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
            this.server = Ssh2.Server.createServer(sftpSettings, () => {
                this.ServerConnectionListern.call(this, arguments);
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
    ServerConnectionListern(clientConnection, info) {
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
    }
}
exports.SftpInMemoryClientWrapper = SftpInMemoryClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQWM1QixnQkFBRTtBQWJYLHVGQUFxRztBQUNyRywwQ0FBMkM7QUFFM0MsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVFwQixvQkFBSTtBQU5iLCtDQUFnRTtBQUVoRSwyQkFBNEI7QUFDNUIsbUNBQWdDO0FBQ2hDLGlDQUFpQztBQXNEakMsbUJBQW1CLElBQWlCLEVBQUUsSUFBYTtJQUVqRCxJQUFJLENBQUMsSUFBSTtRQUNQLE9BQU8sU0FBUyxDQUFDO1NBQ2QsSUFBSSxJQUFJLEtBQUssR0FBRztRQUNuQixPQUFPLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQzVCLElBQUksRUFBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBUyxDQUFDLE9BQU87Z0JBQ2hFLEtBQUssRUFBRyxDQUFDO2dCQUNULEdBQUcsRUFBRyxDQUFDO2dCQUNQLEtBQUssRUFBRyxDQUFDO2dCQUNULElBQUksRUFBRyxDQUFDO2dCQUNSLEdBQUcsRUFBRyxDQUFDO2FBQ00sRUFBRSxJQUFJLEVBQUUsY0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFlLENBQUM7SUFFdEU7Ozs7Ozs7O01BUUU7SUFFRixnREFBZ0Q7SUFDaEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztJQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JB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