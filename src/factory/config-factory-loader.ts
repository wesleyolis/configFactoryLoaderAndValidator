import * as CFT from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';

export class ConfigFactoryLoader
{
    static fromConfigGetJson(config : CFT.JsonOptions)
    {
        Object.keys(config).filter(configKeyPhrase => {

            let factoryConfigs = CFT.ConfigFactoryClassStemKeys.reduce((acc : CFT.IConfigFactoryRes [], factoryClassStem) => {
                
                let stemPos = configKeyPhrase.indexOf(factoryClassStem);

                if (stemPos == -1)
                    return acc;

                let value : string = config[configKeyPhrase] as string;

                let factoryType : CFT.ConfigFactoryTypes = CFT.ConfigFactoryTypes.Vanilla;
                
                if (stemPos !== -1 && stemPos != 0)
                {
                    let prefix = configKeyPhrase.substring(0, stemPos);

                    factoryType =  CFT.ConfigFactoryTypesPrefix[prefix] || factoryType;
                }

                acc.push(<CFT.IConfigFactoryRes>{
                    FactoryClass : CFT.ConfigFactoryClassStem[factoryClassStem],
                    Type: factoryType,
                    Resouce: value,
                    Options: config['options']
                });
                    
                return acc;
            }, [] );

            if (factoryConfigs.length == 0)
            {
                throw new Error("No factory configuration has been found for stem key word 'factory'");
            }
            else if (factoryConfigs.length == 1)
            {
                let config = factoryConfigs[0];
                // create and load the factory.
                let iConfigFactory : IConfigFactory = require(config.Resouce);

                let factoryInstance = iConfigFactory.create(config);

                return factoryInstance;
            }
            else
            {
                throw new Error("Ambiguous Factory, more than one match has been found for stem key word 'factory'");
            } 
        });
    }
}