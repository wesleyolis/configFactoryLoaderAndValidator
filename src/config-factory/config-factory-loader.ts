import * as CFT from './config-factory-types';
import { ConfigSettings } from '../config-options/config-settings-types'
import { IConfigFactory, CreateConfigFactoryInstance, IConfigFactoryConstructor } from './iconfig-factory';

export class ErrorNoFactoryConfigFound extends Error {

    constructor()
    {
        super("No factory configuration has been found for stem key word 'factory'.");
    }
}

export class ErrorAmbiguousFactoryConfig extends Error {

    constructor()
    {
        super("Ambiguous Factory, more than one match has been found for stem key word 'factory'.");
    }
}

export class ConfigFactoryLoader
{
    static fromConfigGetJson<T extends IConfigFactory>(config : ConfigSettings) : T
    {
        let factoryConfigs : CFT.IConfigFactoryRes [] = Object.keys(config).reduce((acc :  CFT.IConfigFactoryRes [], configKeyPhrase) => 
        {
            CFT.ConfigFactoryClassStemKeys.forEach(factoryClassStem =>
            {
                let stemPos = configKeyPhrase.indexOf(factoryClassStem);

                if (stemPos == -1)
                    return;

                let value : string = config[configKeyPhrase] as string;

                let factoryType : CFT.ConfigFactoryTypes = CFT.ConfigFactoryTypes.Vanilla;
                
                if (stemPos !== -1 && stemPos != 0)
                {
                    let prefix = configKeyPhrase.substring(0, stemPos);

                    factoryType = CFT.ConfigFactoryTypesPrefix[prefix] || factoryType;
                }

                acc.push(<CFT.IConfigFactoryRes>{
                    FactoryClass : CFT.ConfigFactoryClassStem[factoryClassStem],
                    Type: factoryType,
                    Resouce: value,
                    ConfigSettings: config['options']
                });
            });
            
            return acc;

        },[]);

        if (factoryConfigs.length == 0)
        {
            throw new ErrorNoFactoryConfigFound();
        }
        else if (factoryConfigs.length == 1)
        {
            let config = factoryConfigs[0];
            // create and load the factory.
            let iConfigFactory : IConfigFactoryConstructor<T> = require(config.Resouce);

            let configFactoryInstance = CreateConfigFactoryInstance(iConfigFactory)

            configFactoryInstance.create(config);

            return configFactoryInstance;
        }
        else
        {
            throw new ErrorAmbiguousFactoryConfig();
        } 
    }
}