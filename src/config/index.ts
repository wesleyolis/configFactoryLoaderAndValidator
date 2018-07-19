import {ConfigSchema, configSchema} from './global'
import {LoadConfig, LoadedConfig } from '../index'
import { some } from 'bluebird';
export {ConfigSchema};

let configInstancesLoaded : LoadedConfig<typeof configSchema> | undefined = undefined; 

// Will potentially need the ability register callback, so that they can customize the configuration.
// That manually just recall configAsync, to be reload, with spesific set of configuration, wiht like a force reload.

export async function configAsync () : Promise<LoadedConfig<typeof configSchema>>
{
    if (configInstancesLoaded == undefined)
    {
        let config = require('config'); 
        // this should be replace with direct memory load of configuration, that is passed in via the enviroment.
        // their should be no file loading at all.

        configInstancesLoaded = await LoadConfig(config, configSchema, true);
    }
    
    return Promise.resolve(configInstancesLoaded);
}
