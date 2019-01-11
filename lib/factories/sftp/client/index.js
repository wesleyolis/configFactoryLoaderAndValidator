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
const CS = require("./config-schema");
exports.CS = CS;
const abase_config_factory_1 = require("../../../config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const JoiV = require("../../../joi-x-validators");
class SftpClient extends abase_config_factory_1.ABaseConfigFactory {
    constructor(configSettings) {
        super();
        this.configSettings = configSettings;
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.netService;
        this.type = config_factory_types_1.ConfigFactoryTypes.production;
        this.configSchema = CS.configSchema;
    }
    static NewInstance() {
        return new SftpClient(undefined);
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
            yield _super.startAsync.call(this);
        });
    }
    stopAsync() {
        const _super = Object.create(null, {
            stopAsync: { get: () => super.stopAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.stopAsync.call(this);
        });
    }
    getLegacyConfig() {
        return {
            host: this.configSettings.host,
            port: this.configSettings.port,
            username: this.configSettings.credentials ? this.configSettings.credentials.username : "",
            password: this.configSettings.credentials.auth.type == JoiV.AuthType.password
                || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.password : null,
            phrase: this.configSettings.credentials.auth.type == JoiV.AuthType.publicKey
                || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.phrase : null,
            privateKey: this.configSettings.credentials.auth.type == JoiV.AuthType.publicKey
                || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.passKey : null
        };
    }
}
exports.SftpClient = SftpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzQ0FBcUM7QUFTdkIsZ0JBQUU7QUFSaEIsdUZBQWlGO0FBQ2pGLHVGQUFxRztBQUtyRyxrREFBaUQ7QUFJakQsTUFBYSxVQUFzQyxTQUFRLHlDQUFrQjtJQVl6RSxZQUFtQixjQUFrQjtRQUVqQyxLQUFLLEVBQUUsQ0FBQztRQUZPLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBVnJDLGdCQUFXLEdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUNyQyxpQkFBWSxHQUF1Qix5Q0FBa0IsQ0FBQyxVQUFVLENBQUM7UUFDakUsU0FBSSxHQUF1Qix5Q0FBa0IsQ0FBQyxVQUFVLENBQUM7UUFDekQsaUJBQVksR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDO0lBVS9CLENBQUM7SUFSRCxNQUFNLENBQUMsV0FBVztRQUVkLE9BQU8sSUFBSSxVQUFVLENBQU0sU0FBUyxDQUFnQyxDQUFDO0lBQ3pFLENBQUM7SUFPSyxXQUFXLENBQUMsTUFBeUI7Ozs7O1lBRXZDLE1BQU0sT0FBTSxXQUFXLFlBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRVksVUFBVTs7Ozs7WUFFbkIsTUFBTSxPQUFNLFVBQVUsV0FBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVZLFNBQVM7Ozs7O1lBRWxCLE1BQU0sT0FBTSxTQUFTLFdBQUUsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFTSxlQUFlO1FBRWxCLE9BQU87WUFDUCxJQUFJLEVBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJO1lBQy9CLElBQUksRUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUk7WUFDL0IsUUFBUSxFQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFBLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDekYsUUFBUSxFQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRO21CQUMzRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ3hILE1BQU0sRUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzttQkFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUN0SCxVQUFVLEVBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7bUJBQzFFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDMUgsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTlDRCxnQ0E4Q0MifQ==