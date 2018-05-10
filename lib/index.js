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
const config_factory_loader_1 = require("./config-factory/config-factory-loader");
const mongodb_config_loader_1 = require("./factories/mongodb/mongodb-config-loader");
exports.ConfigFactoryLoader = config_factory_loader_1.ConfigFactoryLoader;
const databaseFactoryCache = {};
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
function hasDBConfig(database) {
    const config = require('config');
    return config.has('dbConfigs.' + database);
}
exports.hasDBConfig = hasDBConfig;
function getDBConnectionString(database) {
    return __awaiter(this, void 0, void 0, function* () {
        let factoryInstance;
        if (databaseFactoryCache[database])
            factoryInstance = databaseFactoryCache[database];
        else {
            const config = require('config');
            const dbSettings = config.get('dbConfigs')[database];
            if (!dbSettings) {
                throw new Error('No such db setting found in config');
            }
            factoryInstance = yield mongodb_config_loader_1.MongoDbConfigFactoryLoader.fromJsonConfig(dbSettings);
            databaseFactoryCache[database] = factoryInstance;
            yield factoryInstance.start();
        }
        return factoryInstance.getConnectionString();
    });
}
exports.getDBConnectionString = getDBConnectionString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtGQUE2RTtBQUU3RSxxRkFBc0Y7QUFHdEYsT0FBTyxDQUFDLG1CQUFtQixHQUFHLDJDQUFtQixDQUFDO0FBRWxELE1BQU0sb0JBQW9CLEdBQW1DLEVBQUUsQ0FBQztBQU9oRSxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVMsTUFBYyxFQUFFLEtBQWE7SUFDcEQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixNQUFNLEVBQUUsV0FBVztLQUN0QixDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLE1BQU0sTUFBTSxHQUFHO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDO1FBQ0YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFVLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzNELElBQUksR0FBRyxFQUFFO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDaEM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDO0FBRUYsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFTLE1BQWM7SUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQztRQUNwQixNQUFNLEVBQUUsV0FBVztLQUN0QixDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksT0FBTyxDQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLE1BQU0sTUFBTSxHQUFHO1lBQ1gsY0FBYyxFQUFFLE1BQU07U0FDekIsQ0FBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBVSxFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUMzRCxJQUFJLEdBQUcsRUFBRTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDZjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQzNCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQztBQUVGLHFCQUE0QixRQUFnQjtJQUMxQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBSEQsa0NBR0M7QUFFRCwrQkFBNEMsUUFBZ0I7O1FBRTFELElBQUksZUFBZ0MsQ0FBQztRQUVyQyxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQztZQUNoQyxlQUFlLEdBQUksb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUM7YUFFcEQ7WUFDRSxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVyRCxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUN2RDtZQUVELGVBQWUsR0FBRyxNQUFNLGtEQUEwQixDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUU5RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxlQUFlLENBQUM7WUFFakQsTUFBTSxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDL0I7UUFFRCxPQUFPLGVBQWUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQy9DLENBQUM7Q0FBQTtBQXZCRCxzREF1QkMifQ==