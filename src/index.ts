import * as configFactories from './config-factory'
export {configFactories as ConfigFactories}

import * as CFT from './config-factory/config-factory-types'
export {CFT as CFT}


import * as factories from './factories'
export {factories as Factories}

import * as Joi from 'Joi'
export {Joi as Joi}

import * as JoiX from './joi-x'
export {JoiX as JoiX}

import * as JoiV from './joi-x-validators'
import { ConfigFactories, IConfigFactory } from './config-factory';
export {JoiV as JoiV}

export {describe as describeConfigSchema, validateAsync as validatConfigSchemaAsync} from './config-factory/config'

/*
export abstract class IConfigBundle
{
    static async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined = undefined) : Promise<any>
    {
        if (settings == undefined)
        {
            await validatConfigSchemaAsync(require('config'), configSchema);
            settings = require('config');
        }
        return settings;
    }

    // Typically were you would inject any configuraiton for other modules.
    // For instance resolving encrypted passwords for mutiple factories async.
    abstract async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined) : Promise<IConfigFactoryInstance>
}

export interface IConfigFactoryInstance
{
    startAsync() : Promise<void>;
    stopAsync() : Promise<void>;
}


export class ConfigBundle implements IConfigBundle
{
    async newBundleAndResolveConfigAsync(settings : JoiX.XJSchemaMap | undefined = undefined) : Promise<ConfigFactoryInstance>
    {
        let rawConfig = await IConfigBundle.newBundleAndResolveConfigAsync(settings);

        const config = settings as ConfigSchema;

        const mongodbInstance = Factories.MongoDB.NewFactory(config.mongodb);

        await mongodbInstance.createFactoryAsync(config.mongodb);

        const mongoConnectionStr : string = mongodbInstance.getConnectionString();

        rawConfig['mongoConnectionString'] = mongoConnectionStr;

        return new ConfigFactoryInstance(config, mongodbInstance);
    }
}

export class ConfigFactoryInstance implements IConfigFactoryInstance
{
    constructor(private config : ConfigSchema, private mongodbInstance : IMongoSettings){

    }

    async startAsync() : Promise<void>
    {
        await this.mongodbInstance.startAsync();
    }

    async stopAsync() : Promise<void>
    {
        await this.mongodbInstance.stopAsync();
    }
}
*/