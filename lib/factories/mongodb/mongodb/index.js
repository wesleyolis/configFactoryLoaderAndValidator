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
const abase_config_factory_1 = require("../../../config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const CS = require("./configSchema");
const JoiV = require("../../../joi-x-validators");
const cache = {};
class MongoDBConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    // We loose the compiler auto complete features, if configSettings is unioned with undefined.
    constructor(configSettings) {
        super();
        this.configSettings = configSettings;
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.service;
        this.type = config_factory_types_1.ConfigFactoryTypes.production;
        this.configSchema = CS.configSchema;
    }
    static NewInstance() {
        return new MongoDBConfigFactory(undefined);
    }
    createAsync(conf) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, conf); // This is genraic abstract procedure.
            yield this.makeMongoDBConnString(this.configSettings);
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
    getConnectionString() {
        return "";
    }
    makeMongoDBConnString(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let connString = 'mongodb://';
            let password = '';
            if (settings.credentials.username && settings.credentials.password.phrase) {
                if (settings.credentials.password.type == JoiV.PassType.encrypt && cache[settings.credentials.password.phrase]) {
                    password = cache[settings.credentials.password.phrase];
                }
                else if (settings.credentials.password.type == JoiV.PassType.encrypt && !cache[settings.credentials.password.phrase]) {
                    const buf = new Buffer(settings.credentials.password.phrase, 'base64');
                    let data;
                    try {
                        data = yield exports.decrypt(buf);
                    }
                    catch (err) {
                        throw new Error('Unable to decrypt password. Check encrypted string in config.' + err);
                    }
                    password = data.toString('utf-8');
                    cache[settings.credentials.password.phrase] = password;
                }
                else {
                    password = settings.credentials.password.phrase;
                }
                connString = connString + encodeURI(settings.credentials.username) + ':' + encodeURI(settings.credentials.password.phrase) + '@';
            }
            settings.hosts.forEach((host) => {
            });
            settings.hosts.forEach((host) => {
                connString = connString + host.hostname;
                if (host.port) {
                    connString = connString + ':' + host.port;
                }
                else {
                    connString = connString + ':27017';
                }
                connString = connString + ',';
            });
            connString = connString.replace(/,+$/, '');
            connString = connString + '/' + settings.database;
            if (settings.options) {
                connString = connString + '?';
                Object.keys(settings.options).forEach(function (key) {
                    connString = connString + key + '=' + encodeURI(settings.options[key]);
                });
            }
            return connString;
        });
    }
}
exports.MongoDBConfigFactory = MongoDBConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUZBQWdGO0FBR2hGLHVGQUFvRztBQUNwRyxxQ0FBcUM7QUFHckMsa0RBQWlEO0FBR2pELE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFJekMsMEJBQTZELFNBQVEseUNBQWtCO0lBWXJGLDZGQUE2RjtJQUM3RixZQUFtQixjQUFrQjtRQUVuQyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBWDVCLGdCQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUM3QixpQkFBWSxHQUFHLHlDQUFrQixDQUFDLE9BQU8sQ0FBQztRQUMxQyxTQUFJLEdBQUcseUNBQWtCLENBQUMsVUFBVSxDQUFDO1FBQ3JDLGlCQUFZLEdBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztJQVd6QyxDQUFDO0lBVEQsTUFBTSxDQUFDLFdBQVc7UUFFakIsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQU0sU0FBUyxDQUEwQyxDQUFBO0lBQ3pGLENBQUM7SUFRSyxXQUFXLENBQUMsSUFBc0I7OztZQUV0QyxNQUFNLHFCQUFpQixZQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsc0NBQXNDO1lBRXJFLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFWSxVQUFVOzs7WUFFckIsTUFBTSxvQkFBZ0IsV0FBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVZLFNBQVM7OztZQUVwQixNQUFNLG1CQUFlLFdBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRCxtQkFBbUI7UUFFakIsTUFBTSxDQUFDLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFYSxxQkFBcUIsQ0FBQyxRQUF5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