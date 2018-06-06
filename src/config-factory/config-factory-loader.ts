import * as CFT from './config-factory-types';
import {ConfigSettings} from '../config-options/config-settings-types'
import {IConfigFactory, NewConfigFactoryInstance, IConfigFactoryConstructor} from './iconfig-factory';
import {VError} from 'verror';

enum Error
{
    NoConfigFound = "NoFactoryFound",
    AmbiguousMutiple = "AmbiguousMutiple"
}

export class ConfigFactoryLoader
{
    static async fromJsonGetConfigAndNewInstance<T extends IConfigFactory>(config : ConfigSettings) : Promise<T>
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
                    factoryClass : CFT.ConfigFactoryClassStem[factoryClassStem],
                    type: factoryType,
                    Resouce: value,
                    ConfigSettings: config['options']
                });
            });
            
            return acc;

        },[]);

        if (factoryConfigs.length == 0)
        {
            throw new VError({name:Error.NoConfigFound}, "No configuration found matching, Factory stem key work.");
        }
        else if (factoryConfigs.length == 1)
        {
            let config = factoryConfigs[0];
            // create and load the factory.
            let iConfigFactory : IConfigFactoryConstructor<T> = require(config.Resouce);

            let configFactoryInstance = NewConfigFactoryInstance(iConfigFactory)

            await configFactoryInstance.createAsync(config);

            return configFactoryInstance;
        }
        else
        {
            throw new VError({name:Error.AmbiguousMutiple}, "Ambiguous Factories, mutiple entries matching 'Factory'");
        } 
    }
}