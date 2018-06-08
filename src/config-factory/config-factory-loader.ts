import * as CFT from './config-factory-types';
import {ConfigSettings} from '../config-options/config-settings-types'
import {IConfigFactory, NewConfigFactoryInstance, IConfigFactoryConstructor} from './iconfig-factory';
import {VError} from 'verror';

enum Error
{
    NoConfigFound = "NoFactoryFound",
    AmbiguousMutiple = "AmbiguousMutiple"
}


/*
export class ConfigFactoryLoader
{
    static async fromJsonGetConfigAndNewInstance<T extends IConfigFactory>(config : ConfigSettings) : Promise<T>
    {
        let {factory, fClass, type, settings} = config;

            let iConfigFactory : IConfigFactoryConstructor<T> = require(factory);

            let configFactoryInstance = NewConfigFactoryInstance(iConfigFactory)

            await configFactoryInstance.createAsync(settings);

            return configFactoryInstance;
        }
        else
        {
            throw new VError({name:Error.AmbiguousMutiple}, "Ambiguous Factories, mutiple entries matching 'Factory'");
        } 
    }
}*/