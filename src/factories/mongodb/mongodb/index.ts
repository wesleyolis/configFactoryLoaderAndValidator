import {ABaseConfigFactory} from '../../../config-factory/abase-config-factory';
import {IConfigFactory} from '../../../config-factory/iconfig-factory';
import {IMongoSettings} from './../amongodb-config-factory';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';

const cache: Record<string, string> = {};


export class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings
{ 
  readonly factoryName = "Network"
  readonly factoryClass = ConfigFactoryClass.service;
  readonly type = ConfigFactoryTypes.Production;
  readonly configSchema  = CS.configSchema;

  static NewInstance()
  {
   return new MongoDBConfigFactory<any>(undefined) as MongoDBConfigFactory<CS.ConfigSchema>
  }

  // We loose the compiler auto complete features, if configSettings is unioned with undefined.
  constructor(public configSettings : T)
  {
    super();
  }

  async createAsync(conf : CS.ConfigSchema)
  {
    await super.createAsync(conf); // This is genraic abstract procedure.
      
    await this.makeMongoDBConnString(this.configSettings);
  }

  public async startAsync ()
  {
    await super.startAsync();
  }

  public async stopAsync ()
  {
    await super.stopAsync();
  }
  
  getConnectionString() : string
  {
    return ""
  }

  private async makeMongoDBConnString(settings: CS.ConfigSchema): Promise<string> {
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
