import {ABaseConfigFactory} from '../../config-factory/abase-config-factory';
import {IConfigFactoryDef} from '../../config-factory/config-factory-types';
import {IConfigFactory} from '../../config-factory/iconfig-factory';
import {IMongoSettings} from './amongodb-config-factory'
import {ErrorSettingMissing, ErrorSettings, ErrorSettingsMissing} from '../../config-options/config-settings-errors'

const cache: Record<string, string> = {};

export type ConfigOptionsTypes = {
  type? : (string | 'mongodb'),
  hosts : {hostname: string, port : number} [],
  database : string,
  options : {replicaSet : string}
};

export class MongoDBConfigFactory extends ABaseConfigFactory implements IMongoSettings
{
    async create(conf : IConfigFactoryDef)
    {
      super.create(conf);

      let settings = conf.ConfigSettings;

      if (settings.type && settings.type === 'mongodb' ) {
       
        await this.makeMongoDBConnString(settings);

        return Promise.resolve(this);
      }
      else
      {
        throw new Error('Unsupported Type in db setting config.');
      }
    }

    public start () : Promise<any>
    {
      return Promise.resolve();
    }

    public stop () : Promise<any>
    {
      return Promise.resolve();
    }

    describe() : string 
    {
      return "";
    }

    validate() : void
    {
      let errors : ErrorSettingMissing [] = [];

      let validateConfig = <ConfigOptionsTypes>(this.ConfigSettings);

      if (validateConfig['type'] == undefined)
        errors.push(new ErrorSettingMissing("type"));

      if (validateConfig['hosts'] == undefined || validateConfig.hosts.length == 0)
        errors.push(new ErrorSettingMissing("hosts:[]")); 
      
      if (validateConfig['database'] == undefined)
        errors.push(new ErrorSettingMissing("database"));

      if ( errors.length == 1)
      {
        throw errors[0];
      }
      else if (errors.length != 0)
      {
        throw new ErrorSettingsMissing(errors);
      }
    }
    getConnectionString() : string
    {
      return ""
    }

    private async makeMongoDBConnString(settings: any ): Promise<string> {
      let connString = 'mongodb://';
      let password = '';
    
      if (settings.username && (settings.password || settings.e_password)) {
        if (settings.e_password && cache[settings.e_password]) {
          password = cache[settings.e_password];
        } else if (settings.e_password && !cache[settings.e_password]) {
    
          const buf = new Buffer(settings.e_password, 'base64');
          let data: Buffer;
    
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
}

