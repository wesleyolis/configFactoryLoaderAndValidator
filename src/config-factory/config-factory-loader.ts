import * as CFT from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';

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
    static fromConfigGetJson(config : CFT.JsonOptions) : Promise<IConfigFactory>
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
                    Options: config['options']
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
            let iConfigFactory : IConfigFactory = require(config.Resouce);

            let factoryInstance = iConfigFactory.create(config);

            return factoryInstance;
        }
        else
        {
            throw new ErrorAmbiguousFactoryConfig();
        } 
    }
}