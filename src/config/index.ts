import {ConfigSchema, configSchema} from './global'
import {LoadConfig, LoadedConfig } from '../index'

let configInstancesLoaded : LoadedConfig<typeof configSchema> | undefined = undefined; 

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
