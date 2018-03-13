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
function getdbsettings(database) {
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
exports.getdbsettings = getdbsettings;
function makePostgresConnString(settings) {
    return __awaiter(this, void 0, void 0, function* () {
        throw new Error('Postgress Not yet implemented.');
    });
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFPekMsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFTLE1BQWtCLEVBQUUsS0FBYTtJQUN4RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxXQUFXO0tBQ3RCLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyxNQUFNLE1BQU0sR0FBRztZQUNYLEtBQUssRUFBRSxLQUFLO1lBQ1osU0FBUyxFQUFFLE1BQU07U0FDcEIsQ0FBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBVSxFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUMzRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLE9BQU8sQ0FBQyxPQUFPLEdBQUcsVUFBUyxNQUFrQjtJQUN6QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BCLE1BQU0sRUFBRSxXQUFXO0tBQ3RCLENBQUMsQ0FBQztJQUNILE1BQU0s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