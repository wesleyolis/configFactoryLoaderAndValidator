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
const abase_config_factory_1 = require("../../config-factory/abase-config-factory");
const config_settings_errors_1 = require("../../config-options/config-settings-errors");
const cache = {};
class MongoDBConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    create(conf) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _super("create").call(this, conf);
            let settings = conf.ConfigSettings;
            if (settings.type && settings.type === 'mongodb') {
                yield this.makeMongoDBConnString(settings);
                return Promise.resolve(this);
            }
            else {
                throw new Error('Unsupported Type in db setting config.');
            }
        });
    }
    start() {
        return Promise.resolve();
    }
    stop() {
        return Promise.resolve();
    }
    describe() {
        return "";
    }
    validate() {
        let errors = [];
        let validateConfig = (this.ConfigSettings);
        if (validateConfig['type'] == undefined)
            errors.push(new config_settings_errors_1.ErrorSettingMissing("type"));
        if (validateConfig['hosts'] == undefined || validateConfig.hosts.length == 0)
            errors.push(new config_settings_errors_1.ErrorSettingMissing("hosts:[]"));
        if (validateConfig['database'] == undefined)
            errors.push(new config_settings_errors_1.ErrorSettingMissing("database"));
        if (errors.length == 1) {
            throw errors[0];
        }
        else if (errors.length != 0) {
            throw new config_settings_errors_1.ErrorSettingsMissing(errors);
        }
    }
    getConnectionString() {
        return "";
    }
    makeMongoDBConnString(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            let connString = 'mongodb://';
            let password = '';
            if (settings.username && (settings.password || settings.e_password)) {
                if (settings.e_password && cache[settings.e_password]) {
                    password = cache[settings.e_password];
                }
                else if (settings.e_password && !cache[settings.e_password]) {
                    const buf = new Buffer(settings.e_password, 'base64');
                    let data;
                    try {
                        data = yield exports.decrypt(buf);
                    }
                    catch (err) {
                        throw new Error('Unable to decrypt password. Check encrypted string in config.' + err);
                    }
                    password = data.toString('utf-8');
                    cache['settings.e_password'] = password;
                }
                else {
                    password = settings.password;
                }
                connString = connString + encodeURI(settings.username) + ':' + encodeURI(password) + '@';
            }
            settings.hosts.forEach(function (host) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvbW9uZ29kYi9tb25nb2RiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxvRkFBNkU7QUFJN0Usd0ZBQW9IO0FBRXBILE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFTekMsMEJBQWtDLFNBQVEseUNBQWtCO0lBRWxELE1BQU0sQ0FBQyxJQUF3Qjs7O1lBRW5DLGdCQUFZLFlBQUMsSUFBSSxFQUFFO1lBRW5CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7WUFFbkMsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFHO2dCQUVqRCxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFM0MsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO2lCQUVEO2dCQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQzthQUMzRDtRQUNILENBQUM7S0FBQTtJQUVNLEtBQUs7UUFFVixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU0sSUFBSTtRQUVULE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBRU4sT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsUUFBUTtRQUVOLElBQUksTUFBTSxHQUE0QixFQUFFLENBQUM7UUFFekMsSUFBSSxjQUFjLEdBQXVCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRS9ELElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLFNBQVM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLDRDQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFL0Ms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