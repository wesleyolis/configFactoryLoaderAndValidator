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
exports.CS = CS;
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
        // we can write a uri validate that takes this information infuture in a spesifica validation from like this.
        //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
        const hosts = this.configSettings.hosts;
        let hostConnectionStr = "mongodb://";
        if (this.configSettings.credentials) {
            hostConnectionStr += this.configSettings.credentials.username + ":" +
                this.configSettings.credentials.password.phrase + "@";
        }
        hostConnectionStr += hosts[0].hostname;
        if (hosts[0].port)
            hostConnectionStr += ":" + hosts[0].port;
        for (let i = 1; i < hosts.length; i++) {
            hostConnectionStr += "," + hosts[i].hostname;
            if (hosts[0].port)
                hostConnectionStr += ":" + hosts[0].port;
        }
        if (this.configSettings.database && this.configSettings.database.length)
            hostConnectionStr += "/" + this.configSettings.database;
        if (this.configSettings.options) {
            let keys = Object.keys(this.configSettings.options);
            if (keys.length) {
                const firstKey = keys[0];
                hostConnectionStr += "?" + firstKey + "=" + this.configSettings.options[firstKey];
                for (let i = 1; i < keys.length; i++) {
                    const key = keys[i];
                    hostConnectionStr += "&" + key + "=" + this.configSettings.options[key];
                }
            }
        }
        return hostConnectionStr;
    }
    makeMongoDBConnString(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let connString = 'mongodb://';
            let password = '';
            if (settings.credentials && settings.credentials.username && settings.credentials.password.phrase) {
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
                    if (settings.options)
                        connString = connString + key + '=' + encodeURI(settings.options[key]);
                });
            }
            return connString;
        });
    }
}
exports.MongoDBConfigFactory = MongoDBConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUZBQWdGO0FBR2hGLHVGQUFvRztBQUNwRyxxQ0FBcUM7QUFRdkIsZ0JBQUU7QUFMaEIsa0RBQWlEO0FBR2pELE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFJekMsMEJBQTZELFNBQVEseUNBQWtCO0lBWXJGLDZGQUE2RjtJQUM3RixZQUFtQixjQUFrQjtRQUVuQyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBWDVCLGdCQUFXLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUM3QixpQkFBWSxHQUFHLHlDQUFrQixDQUFDLE9BQU8sQ0FBQztRQUMxQyxTQUFJLEdBQUcseUNBQWtCLENBQUMsVUFBVSxDQUFDO1FBQ3JDLGlCQUFZLEdBQUksRUFBRSxDQUFDLFlBQVksQ0FBQztJQVd6QyxDQUFDO0lBVEQsTUFBTSxDQUFDLFdBQVc7UUFFakIsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQU0sU0FBUyxDQUEwQyxDQUFBO0lBQ3pGLENBQUM7SUFRSyxXQUFXLENBQUMsSUFBc0I7OztZQUV0QyxNQUFNLHFCQUFpQixZQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsc0NBQXNDO1lBRXJFLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFWSxVQUFVOzs7WUFFckIsTUFBTSxvQkFBZ0IsV0FBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVZLFNBQVM7OztZQUVwQixNQUFNLG1CQUFlLFdBQUUsQ0FBQztRQUMxQixDQUFDO0tBQUE7SUFFRCxtQkFBbUI7UUFFakIsNkdBQTZHO1FBQzdHLHdHQUF3RztRQUV4RyxNQUFNLEtBQUssR0FB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