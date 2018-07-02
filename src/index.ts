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
import {validateAsync} from './config-factory/config'

export {describe as describeConfigSchema, validateAsync as validatConfigSchemaAsync} from './config-factory/config'

export abstract class IConfigBundle
{
    static async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined = undefined, configSchema : JoiX.XObjectSchema, requireConfig : (file:string) => any = require('config')) : Promise<any>
    {
        if (settings == undefined)
        {
            let config = requireConfig('config');
            
            await validateAsync(configSchema, config);
            return config
            
        }
        return JSON.parse(JSON.stringify(settings));
    }

    // Typically were you would inject any configuraiton for other modules.
    // For instance resolving encrypted passwords for mutiple factories async.
    abstract async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined) : Promise<IConfigFactoriesInstances>
}

export interface IConfigFactoriesInstances
{
    
    startAsync() : Promise<void>;
    stopAsync() : Promise<void>;
}


export interface IConfigFactoriesInstancesResolver extends IConfigFactoriesInstances
{
    startAsync() : Promise<void>;
    stopAsync() : Promise<void>;
}

type ObjectFactoryInstances = IConfigFactory | FactoryInstances
type FactoryInstances = {
    [index:string] : ObjectFactoryInstances
}

/*
export class FactoriesInstancesResolver implements IConfigFactoriesInstances
{
    constructor(public localInstances : FactoryInstances, public parentInstances : FactoryInstances )
    {

    }

    startAsync() : Promise<void>
    {

    }
    stopAsync() : Promise<void>
    {

    }
}


export function LoadConfig(localConfig : JoiX.XObject, parentConfig : JoiX.XObject | null = null) : FactoriesInstancesResolver
{
    const keys = Object.keys(localConfig);

    let config = {};
    
    keys.forEach(key => {
        let value = localConfig[key];


        if (config[key]__factoryType
    });
}

*/
