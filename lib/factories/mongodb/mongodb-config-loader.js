"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
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

*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi1jb25maWctbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItY29uZmlnLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcUNFIn0=