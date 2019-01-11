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
        const _super = Object.create(null, {
            createAsync: { get: () => super.createAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.createAsync.call(this, conf); // This is genraic abstract procedure.
            yield this.makeMongoDBConnString(this.configSettings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUZBQWdGO0FBR2hGLHVGQUFvRztBQUNwRyxxQ0FBcUM7QUFRdkIsZ0JBQUU7QUFMaEIsa0RBQWlEO0FBR2pELE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFJekMsTUFBYSxvQkFBZ0QsU0FBUSx5Q0FBa0I7SUFZckYsNkZBQTZGO0lBQzdGLFlBQW1CLGNBQWtCO1FBRW5DLEtBQUssRUFBRSxDQUFDO1FBRlMsbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFYNUIsZ0JBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQzdCLGlCQUFZLEdBQUcseUNBQWtCLENBQUMsT0FBTyxDQUFDO1FBQzFDLFNBQUksR0FBRyx5Q0FBa0IsQ0FBQyxVQUFVLENBQUM7UUFDckMsaUJBQVksR0FBSSxFQUFFLENBQUMsWUFBWSxDQUFDO0lBV3pDLENBQUM7SUFURCxNQUFNLENBQUMsV0FBVztRQUVqQixPQUFPLElBQUksb0JBQW9CLENBQU0sU0FBUyxDQUEwQyxDQUFBO0lBQ3pGLENBQUM7SUFRSyxXQUFXLENBQUMsSUFBc0I7Ozs7O1lBRXRDLE1BQU0sT0FBTSxXQUFXLFlBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7WUFFckUsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hELENBQUM7S0FBQTtJQUVZLFVBQVU7Ozs7O1lBRXJCLE1BQU0sT0FBTSxVQUFVLFdBQUUsQ0FBQztRQUMzQixDQUFDO0tBQUE7SUFFWSxTQUFTOzs7OztZQUVwQixNQUFNLE9BQU0sU0FBUyxXQUFFLENBQUM7UUFDMUIsQ0FBQztLQUFBO0lBRUQsbUJBQW1CO1FBRWpCLDZHQUE2RztRQUM3Ryx3R0FBd0c7UUFF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