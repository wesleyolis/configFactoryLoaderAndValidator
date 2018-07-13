import * as BluebirdPromisify from './util/bluebird-promisify';
export {BluebirdPromisify as BluebirdPromisify};

const cache: Record<string, string> = {};

interface IKmsEncryptionResult {
    CiphertextBlob: string;
    Plaintext: string;
}

exports.encrypt = function(buffer: NodeBuffer, keyid: string) {
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

exports.decrypt = function(buffer: NodeBuffer) {
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

export async function getDBConnectionString(database: string): Promise<string> {
  const config = require('config');
  const dbSetting = config.get('dbConfigs')[database];

  if (!dbSetting) {
    throw new Error('No such db setting found in config');
  }

  if (dbSetting.type && dbSetting.type === 'mongodb' ) {
    return makeMongoDBConnString(dbSetting);
  }

  throw new Error('Unsupported Type in db setting config.');
}

async function makePostgresConnString(settings: any): Promise<string> {
  throw new Error('Postgress Not yet implemented.');
}

export function hasDBConfig(database: string): boolean {
  const config = require('config');
  return config.has('dbConfigs.' + database);
}

async function makeMongoDBConnString(settings: any ): Promise<string> {
  let connString = 'mongodb://';
  let password = '';

  if (settings.username && (settings.password || settings.e_password)) {
    if (settings.e_password && cache[settings.e_password]) {
      password = cache[settings.e_password];
    } else if (settings.e_password && !cache[settings.e_password]) {

      const buf = new Buffer(settings.e_password, 'base64');
      let data: NodeBuffer;

      try {
        data = await exports.decrypt(buf);
      } catch (err) {
        throw new Error('Unable to decrypt password. Check encrypted string in config.' + err);
      }
      password = data.toString('utf-8');
      cache['settings.e_password'] = password;

    } else {

      password = settings.password;

    }

    connString = connString + encodeURI(settings.username) + ':' + encodeURI(password) + '@';
  }

  settings.hosts.forEach(function(host: Record<string, string>) {
    connString = connString + host.hostname;

    if (host.port) {
      connString = connString + ':' + host.port;
    } else {
      connString = connString + ':27017';
    }

    connString = connString + ',';
  });

  connString = connString.replace(/,+$/, '');

  connString = connString + '/' + settings.database;

  if (settings.options) {
    connString = connString + '?';

    Object.keys(settings.options).forEach(
      function(key) {
        connString = connString + key + '=' + encodeURI(settings.options[key]);
      }
    );
  }

  return connString;
}
