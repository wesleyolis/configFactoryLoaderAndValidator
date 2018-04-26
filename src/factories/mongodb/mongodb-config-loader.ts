import { ConfigFactoryLoader , ErrorNoFactoryConfigFound} from '../../config-factory/config-factory-loader';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types';
import { MongoDBConfigFactory } from './mongodb';

class MongoDbConfigFactoryLoader
{
  static async fromJsonConfig(dbOptions : CFT.JsonOptions) : Promise<IConfigFactory>
  {
    try 
    {
      let configFactoryInstance : IConfigFactory = await ConfigFactoryLoader.fromConfigGetJson(dbOptions);
    }
    catch (e)
    {
      if (e instanceof(ErrorNoFactoryConfigFound))
      {
        // The we attempt to use the default configuration mongo configuration loader for backwards compatibility.
        let config : CFT.IConfigFactoryDef = {
          FactoryClass : CFT.ConfigFactoryClass.Service,
          Type : CFT.ConfigFactoryTypes.Vanilla,
          Options : 
        };

        return await new MongoDBConfigFactory().create(dbOptions);
      }
      else
      {
        throw e;
      }
    }

  }
}