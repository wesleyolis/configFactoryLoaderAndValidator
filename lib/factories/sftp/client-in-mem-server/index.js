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
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, config);
        });
    }
    startAsync() {
        const _super = name => super[name];
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
            global.rbLog.info({ InMemsftp: {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHVDQUFvQztBQUVwQyxzQ0FBcUM7QUFpQjVCLGdCQUFFO0FBaEJYLHVGQUFxRztBQUdyRyxrREFBaUQ7QUFFakQsMkNBQTRDO0FBQzVDLDZCQUE2QjtBQVNwQixvQkFBSTtBQVBiLCtDQUFnRTtBQUNoRSx5QkFBeUI7QUFDekIsNkJBQTZCO0FBQzdCLDJCQUE0QjtBQUM1QixtQ0FBZ0M7QUFDaEMsaUNBQWlDO0FBc0RqQyxtQkFBbUIsSUFBaUIsRUFBRSxJQUFhO0lBRWpELElBQUksQ0FBQyxJQUFJO1FBQ1AsT0FBTyxTQUFTLENBQUM7U0FDZCxJQUFJLElBQUksS0FBSyxHQUFHO1FBQ25CLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxFQUFHLGNBQVMsQ0FBQyxPQUFPLEdBQUcsY0FBUyxDQUFDLE9BQU8sR0FBRyxjQUFTLENBQUMsT0FBTztnQkFDaEUsS0FBSyxFQUFHLENBQUM7Z0JBQ1QsR0FBRyxFQUFHLENBQUM7Z0JBQ1AsS0FBSyxFQUFHLENBQUM7Z0JBQ1QsSUFBSSxFQUFHLENBQUM7Z0JBQ1IsR0FBRyxFQUFHLENBQUM7YUFDTSxFQUFFLElBQUksRUFBRSxjQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQWUsQ0FBQztJQUV0RTs7Ozs7Ozs7TUFRRTtJQUVGLGdEQUFnRDtJQUNoRCxNQUFNLG9CQUFvQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFN0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxNQUFN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