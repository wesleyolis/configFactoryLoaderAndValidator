import { ConfigFactoryLoader, ErrorNoFactoryConfigFound} from '../../config-factory/config-factory-loader';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types';
import { MongoDBConfigFactory } from './mongodb';
import { ConfigSettings } from '../../config-options/config-settings-types'
import { IMongoSettings } from './amongodb-config-factory';

export class MongoDbConfigFactoryLoader
{
  static fromJsonConfig(configSettings : ConfigSettings)
  {
    try 
    {
      let configFactoryInstance : IMongoSettings = ConfigFactoryLoader.fromConfigGetJson<IMongoSettings>(configSettings);

      return configFactoryInstance;
    }
    catch (e)
    {
      if (e instanceof(ErrorNoFactoryConfigFound))
      {
        // The we attempt to use the default configuration mongo configuration loader for backwards compatibility.
        let config : CFT.IConfigFactoryDef = {
          FactoryClass : CFT.ConfigFactoryClass.Service,
          Type : CFT.ConfigFactoryTypes.Vanilla,
          ConfigSettings : configSettings
        };

        let instance = new MongoDBConfigFactory();

        instance.create(config);

        return instance;
      }
      else
      {
        throw e;
      }
    }

  }
}