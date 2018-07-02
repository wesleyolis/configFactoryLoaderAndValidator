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
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const __1 = require("../../..");
const index_1 = require("../client/index");
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
                    if (this.configSettings.credentials.auth.type === __1.JoiV.AuthType.publicKey || this.configSettings.credentials.auth.type === __1.JoiV.AuthType.any) {
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
                    if (this.configSettings.credentials.auth.type == __1.JoiV.AuthType.password || this.configSettings.credentials.auth.type == __1.JoiV.AuthType.any) {
                        if (authCtx.password == this.configSettings.credentials.auth.password) {
                            rbLog.info({}, `Client Authenticated`);
                            authCtx.accept();
                        }
                        else {
                            authCtx.reject(this.configSettings.credentials.auth.type == __1.JoiV.AuthType.any ? ['publicKey'] : [], true);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFHM0IsdUNBQW9DO0FBRXBDLHNDQUFxQztBQUNyQyx1RkFBcUc7QUFDckcsZ0NBQWdDO0FBRWhDLDJDQUE0QztBQUM1Qyw2QkFBNkI7QUFRcEIsb0JBQUk7QUFOYiwrQ0FBZ0U7QUFFaEUsMkJBQTRCO0FBQzVCLG1DQUFnQztBQUNoQyxpQ0FBaUM7QUFvRGpDLG1CQUFtQixJQUFpQixFQUFFLElBQWE7SUFFakQsSUFBSSxDQUFDLElBQUk7UUFDUCxPQUFPLFNBQVMsQ0FBQztTQUNkLElBQUksSUFBSSxLQUFLLEdBQUc7UUFDbkIsT0FBTyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2dCQUM1QixJQUFJLEVBQUcsY0FBUyxDQUFDLE9BQU8sR0FBRyxjQUFTLENBQUMsT0FBTyxHQUFHLGNBQVMsQ0FBQyxPQUFPO2dCQUNoRSxLQUFLLEVBQUcsQ0FBQztnQkFDVCxHQUFHLEVBQUcsQ0FBQztnQkFDUCxLQUFLLEVBQUcsQ0FBQztnQkFDVCxJQUFJLEVBQUcsQ0FBQztnQkFDUixHQUFHLEVBQUcsQ0FBQzthQUNNLEVBQUUsSUFBSSxFQUFFLGNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBZSxDQUFDO0lBRXRFOzs7Ozs7OztNQVFFO0lBRUYsZ0RBQWdEO0lBQ2hELE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFFcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLE1B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