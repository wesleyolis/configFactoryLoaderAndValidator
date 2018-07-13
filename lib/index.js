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
const BluebirdPromisify = require("./util/bluebird-promisify");
exports.BluebirdPromisify = BluebirdPromisify;
const cache = {};
exports.encrypt = function (buffer, keyid) {
    const aws = require('aws-sdk');
    const kms = new aws.KMS({
        region: 'eu-west-1'
    });
    return new Promise((resolve, reject) => {
        const params = {
            KeyId: keyid,
            Plaintext: buffer
        };
        kms.encrypt(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.CiphertextBlob);
            }
        });
    });
};
exports.decrypt = function (buffer) {
    const aws = require('aws-sdk');
    const kms = new aws.KMS({
        region: 'eu-west-1'
    });
    return new Promise((resolve, reject) => {
        const params = {
            CiphertextBlob: buffer
        };
        kms.decrypt(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.Plaintext);
            }
        });
    });
};
function getDBConnectionString(database) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = require('config');
        const dbSetting = config.get('dbConfigs')[database];
        if (!dbSetting) {
            throw new Error('No such db setting found in config');
        }
        if (dbSetting.type && dbSetting.type === 'mongodb') {
            return makeMongoDBConnString(dbSetting);
        }
        throw new Error('Unsupported Type in db setting config.');
    });
}
exports.getDBConnectionString = getDBConnectionString;
function makePostgresConnString(settings) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error('Postgress Not yet implemented.');
    });
}
function hasDBConfig(database) {
    const config = require('config');
    return config.has('dbConfigs.' + database);
}
exports.hasDBConfig = hasDBConfig;
function makeMongoDBConnString(settings) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtEQUErRDtBQUNsQyw4Q0FBaUI7QUFFOUMsTUFBTSxLQUFLLEdBQTJCLEVBQUUsQ0FBQztBQU96QyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVMsTUFBa0IsRUFBRSxLQUFhO0lBQ3hELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEIsTUFBTSxFQUFFLFdBQVc7S0FDdEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBVSxFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUMzRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ2hDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxNQUFrQjtJQUN6QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxXQUFXO0tBQ3RCLENBQUMsQ0FBQztJQUNILE9BQU8sSUFBSSxPQUFPLENBQUUsQ0FBQyxPQUFP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