import { ConfigFactoryLoader } from './config-factory/config-factory-loader';
import { IConfigFactory } from './config-factory/iconfig-factory';
//import { MongoDbConfigFactoryLoader } from './factories/mongodb/mongodb-config-loader'
import { IMongoSettings } from './factories/mongodb/amongodb-config-factory'
/*
exports.ConfigFactoryLoader = ConfigFactoryLoader;

const databaseFactoryCache: Record<string, IMongoSettings> = {};

interface IKmsEncryptionResult {
    CiphertextBlob: string;
    Plaintext: string;
}

exports.encrypt = function(buffer: Buffer, keyid: string) {
    const aws = require('aws-sdk');
    const kms = new aws.KMS({
        region: 'eu-west-1'
    });
    return new Promise((resolve, reject) => {
        const params = {
            KeyId: keyid,
            Plaintext: buffer
        };
        kms.encrypt(params, (err: Error, data: IKmsEncryptionResult) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.CiphertextBlob);
            }
        });
    });
};

exports.decrypt = function(buffer: Buffer) {
    const aws = require('aws-sdk');
    const kms = new aws.KMS({
        region: 'eu-west-1'
    });
    return new Promise( (resolve, reject) => {
        const params = {
            CiphertextBlob: buffer
        };
        kms.decrypt(params, (err: Error, data: IKmsEncryptionResult) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Plaintext);
            }
        });
    });
};

export function hasDBConfig(database: string): boolean {
  const config = require('config');
  return config.has('dbConfigs.' + database);
}

export async function getDBConnectionString(database: string): Promise<string> {

  let factoryInstance : IMongoSettings;

  if (databaseFactoryCache[database])
    factoryInstance =  databaseFactoryCache[database];
  else
  {
    const config = require('config');
    const dbSettings = config.get('dbConfigs')[database];

    if (!dbSettings) {
      throw new Error('No such db setting found in config');
    }

    factoryInstance = await MongoDbConfigFactoryLoader.fromJsonConfig(dbSettings);

    databaseFactoryCache[database] = factoryInstance;

    await factoryInstance.start();
  }

  return factoryInstance.getConnectionString();
}
*/