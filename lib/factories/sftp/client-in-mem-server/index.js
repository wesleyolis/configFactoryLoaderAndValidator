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
const CS = require("./config-schema");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const index_1 = require("../client/index");
const Ssh2 = require("ssh2");
exports.Ssh2 = Ssh2;
class SftpInMemoryClientWrapper extends index_1.SftpClient {
    constructor(configSettings) {
        super(configSettings);
        this.configSettings = configSettings;
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
            yield _super("startAsync").call(this);
            /*
    
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
            */
            //static createServer(config: ServerConfig, connectionListener?: (client: Connection, info: ClientInfo) => void): Server;
            // this.server = Ssh2.Server.createServer(sftpSettings, this.ServerConnectionListern);
            // const listernAsync = promisify(this.server.listen).bind(this.server);
            // await listernAsync(this.configSettings.port, this.configSettings.host);
            // rbLog.info({InMemsftp : {
            //     status: 'listerning', 
            //     address: this.server.address().address,
            //     port: this.server.address().port
            //     }
            // }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);
        });
    }
    stopAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("stopAsync").call(this);
        });
    }
    ServerConnectionListern(client, info) {
    }
}
exports.SftpInMemoryClientWrapper = SftpInMemoryClientWrapper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50LWluLW1lbS1zZXJ2ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFLM0Isc0NBQXFDO0FBQ3JDLHVGQUFxRztBQUNyRywyQ0FBNEM7QUFFNUMsNkJBQTZCO0FBRXJCLG9CQUFJO0FBSVosK0JBQWtFLFNBQVEsa0JBQWE7SUFjbkYsWUFBbUIsY0FBa0I7UUFFakMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRlAsbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFackMsZ0JBQVcsR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3JDLGlCQUFZLEdBQXVCLHlDQUFrQixDQUFDLFVBQVUsQ0FBQztRQUNqRSxTQUFJLEdBQXVCLHlDQUFrQixDQUFDLFVBQVUsQ0FBQztRQUN6RCxpQkFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFFdkIsV0FBTSxHQUFrQixTQUFTLENBQUM7SUFVMUMsQ0FBQztJQVJELE1BQU0sQ0FBQyxXQUFXO1FBRWQsT0FBTyxJQUFJLGtCQUFVLENBQU0sU0FBUyxDQUFnQyxDQUFDO0lBQ3pFLENBQUM7SUFPSyxXQUFXLENBQUMsTUFBeUI7OztZQUV2QyxNQUFNLHFCQUFpQixZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVZLFVBQVU7OztZQUVuQixNQUFNLG9CQUFnQixXQUFFLENBQUM7WUFDekI7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FnQkU7WUFDRix5SEFBeUg7WUFFekgsc0ZBQXNGO1lBRXRGLHdFQUF3RTtZQUV4RSwwRUFBMEU7WUFFMUUsNEJBQTRCO1lBQzVCLDZCQUE2QjtZQUM3Qiw4Q0FBOEM7WUFDOUMsdUNBQXVDO1lBQ3ZDLFFBQVE7WUFDUix3R0FBd0c7UUFDNUcsQ0FBQztLQUFBO0lBRVksU0FBUzs7O1lBRWxCLE1BQU0sbUJBQWUsV0FBRSxDQUFDO1FBQzVCLENBQUM7S0FBQTtJQUVPLHVCQUF1QixDQUFDLE1BQWtCLEVBQUUsSUFBZ0I7SUFHcEUsQ0FBQztDQUNKO0FBckVELDhEQXFFQyJ9