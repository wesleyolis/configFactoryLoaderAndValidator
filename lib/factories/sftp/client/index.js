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
const abase_config_factory_1 = require(".././../../../src/config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const index_1 = require("../../../index");
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
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, config);
        });
    }
    startAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("startAsync").call(this);
        });
    }
    stopAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("stopAsync").call(this);
        });
    }
    getLegacyConfig() {
        return {
            host: this.configSettings.host,
            port: this.configSettings.port,
            username: this.configSettings.credentials ? this.configSettings.credentials.username : "",
            password: this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.password
                || this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.any ? this.configSettings.credentials.auth.password : null,
            phrase: this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.publicKey
                || this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.any ? this.configSettings.credentials.auth.phrase : "",
            privateKey: this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.publicKey
                || this.configSettings.credentials.auth.type == index_1.JoiV.AuthType.any ? this.configSettings.credentials.auth.passKey : ""
        };
    }
}
exports.SftpClient = SftpClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxzQ0FBcUM7QUFRdkIsZ0JBQUU7QUFQaEIsZ0dBQTBGO0FBQzFGLHVGQUFxRztBQUlyRywwQ0FBMkM7QUFJM0MsZ0JBQW1ELFNBQVEseUNBQWtCO0lBWXpFLFlBQW1CLGNBQWtCO1FBRWpDLEtBQUssRUFBRSxDQUFDO1FBRk8sbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFWckMsZ0JBQVcsR0FBVyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3JDLGlCQUFZLEdBQXVCLHlDQUFrQixDQUFDLFVBQVUsQ0FBQztRQUNqRSxTQUFJLEdBQXVCLHlDQUFrQixDQUFDLFVBQVUsQ0FBQztRQUN6RCxpQkFBWSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUM7SUFVL0IsQ0FBQztJQVJELE1BQU0sQ0FBQyxXQUFXO1FBRWQsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFNLFNBQVMsQ0FBZ0MsQ0FBQztJQUN6RSxDQUFDO0lBT0ssV0FBVyxDQUFDLE1BQXlCOzs7WUFFdkMsTUFBTSxxQkFBaUIsWUFBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFWSxVQUFVOzs7WUFFbkIsTUFBTSxvQkFBZ0IsV0FBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVZLFNBQVM7OztZQUVsQixNQUFNLG1CQUFlLFdBQUUsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFTSxlQUFlO1FBRWxCLE1BQU0sQ0FBQztZQUNQLElBQUksRUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUk7WUFDL0IsSUFBSSxFQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSTtZQUMvQixRQUFRLEVBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN6RixRQUFRLEVBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFJLENBQUMsUUFBUSxDQUFDLFFBQVE7bUJBQzNFLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksWUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDeEgsTUFBTSxFQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksWUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO21CQUMxRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFlBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3BILFVBQVUsRUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFlBQUksQ0FBQyxRQUFRLENBQUMsU0FBUzttQkFDMUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxZQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtTQUN4SCxDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUNELGdDQThDQyJ9