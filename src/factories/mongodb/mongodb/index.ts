import {ABaseConfigFactory} from '../../../config-factory/abase-config-factory';
import {IConfigFactory} from '../../../config-factory/iconfig-factory';
import {IMongoSettings} from './../amongodb-config-factory';
import {ConfigFactoryClass, ConfigFactoryTypes} from '../../../config-factory/config-factory-types';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as JoiV from '../../../joi-x-validators'
import {ConfigSchema} from './configSchema';

const cache: Record<string, string> = {};

export {CS as CS}

export class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings
{ 
  readonly factoryName = CS.factoryName;
  readonly factoryClass = ConfigFactoryClass.service;
  readonly type = ConfigFactoryTypes.production;
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
    // we can write a uri validate that takes this information infuture in a spesifica validation from like this.
    //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

    const hosts = this.configSettings.hosts;

    let hostConnectionStr = "mongodb://";

    if(this.configSettings.credentials)
    {
      hostConnectionStr += this.configSettings.credentials.username + ":" +
      this.configSettings.credentials.password.phrase + "@"
    }

    hostConnectionStr += hosts[0].hostname;
    
    if(hosts[0].port)
      hostConnectionStr += ":" + hosts[0].port;

    for (let i = 1; i < hosts.length; i++)
    {
      hostConnectionStr += "," + hosts[i].hostname;

      if (hosts[0].port)
        hostConnectionStr += ":" + hosts[0].port;
    }

    if(this.configSettings.database && this.configSettings.database.length)
      hostConnectionStr += "/" + this.configSettings.database;

    if(this.configSettings.options)
    {
      let keys = Object.keys(this.configSettings.options);
      
      if(keys.length)
      {
        const firstKey = keys[0];
        hostConnectionStr += "?" + firstKey + "=" + this.configSettings.options[firstKey];

        for(let i = 1; i < keys.length; i++)
        {
          const key = keys[i];
          hostConnectionStr += "&" + key + "=" + this.configSettings.options[key];
        }
      }
    }
    
    return hostConnectionStr;
  }

  private async makeMongoDBConnString(settings: CS.ConfigSchema): Promise<string> {
    let connString = 'mongodb://';
    let password = '';

    if (settings.credentials && settings.credentials.username && settings.credentials.password.phrase) {
      if (settings.credentials.password.type == JoiV.PassType.encrypt && cache[settings.credentials.password.phrase]) {
        password = cache[settings.credentials.password.phrase];
      } else if (settings.credentials.password.type == JoiV.PassType.encrypt && !cache[settings.credentials.password.phrase]) {
  
        const buf = new Buffer(settings.credentials.password.phrase, 'base64');
        let data: Buffer;
  
        try {
          data = await exports.decrypt(buf);
        } catch (err) {
          throw new Error('Unable to decrypt password. Check encrypted string in config.' + err);
        }
        password = data.toString('utf-8');
        cache[settings.credentials.password.phrase] = password;
  
      } else {
  
        password = settings.credentials.password.phrase;
      }
  
      connString = connString + encodeURI(settings.credentials.username) + ':' + encodeURI(settings.credentials.password.phrase) + '@';
    }

    settings.hosts.forEach((host) =>{
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
          if(settings.options)
            connString = connString + key + '=' + encodeURI(settings.options[key]);
        }
      );
    }
  
    return connString;
  }
}
