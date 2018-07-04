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

import * as _ from 'lodash';

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
        return settings;
    }

    // Typically were you would inject any configuraiton for other modules.
    // For instance resolving encrypted passwords for mutiple factories async.
    abstract async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined) : Promise<IConfigFactoriesInstances>
}

export interface IConfigFactoriesInstances
{
    startAsync() : Promise<void []>;
    stopAsync() : Promise<void []>;
}


export interface IConfigFactoriesInstancesResolver extends IConfigFactoriesInstances
{
    startAsync() : Promise<void []>;
    stopAsync() : Promise<void []>;
}


export class FactoriesInstancesResolver<L extends JoiX.XObjectSchema,
LF = JoiX.ExtractWithFactoriesFromSchema<L>
> 
implements IConfigFactoriesInstances
{
    constructor (public config : LF, private factoryInstances : (() => IConfigFactory)[])
    {
    }

    startAsync() : Promise<void []>
    {
        return Promise.all(this.factoryInstances.map(f => f().startAsync()));
    }

    stopAsync() : Promise<void []>
    {
        return Promise.all(this.factoryInstances.map(f => f().stopAsync()));
    }
}

export async function LoadConfig<L extends JoiX.XObjectSchema, 
LF = JoiX.ExtractWithFactoriesFromSchema<L>>
(configSettings : any, configSchema : L, lazyLoad : boolean = false, configOptional : Error | null = null) : Promise<FactoriesInstancesResolver<L, LF>>
{
    const originalConfigSchema = _.cloneDeep(configSchema);

    const children = JoiX.getXObjectChildrens(configSchema);

    if (configOptional)
        JoiX.OperateOnXObjectKeys(children, (key : string, schema : any, acc : any, config : any) => {
            (schema as Joi.AnySchema).optional();
    }, (key : string, acc : any) => {}, null);

    const validateConfigSettings : any = await JoiX.validate(configSettings, originalConfigSchema);

    let loadedConfig : any;
    let factoryConfig : (() => IConfigFactory) [] = [];

    JoiX.OperateOnXObjectKeys(children, (key : string, schema : any, acc : any, config : any) => {
        
        if (JoiX.isFactory(schema))
        {
            const lazyLoader = () =>
            {
                let factoryInstance : IConfigFactory | undefined = undefined

                if (factoryInstance)
                {
                    try
                    {
                        factoryInstance = schema.__NewFactory(config[key]);
                    }
                    catch(e)
                    {
                        if (configOptional)
                            throw new Error().message += JSON.stringify(e);
                    }
                }

                return factoryInstance as IConfigFactory;
            }

            if (!lazyLoad)
                lazyLoader();

            factoryConfig.push(lazyLoader);
            Object.defineProperty(acc, key, { get : lazyLoader });
        }
        else
        {
            let value = config[key];

            if (configOptional)
            {
                try
                {
                    value = JoiX.validate(config[key], schema);
                }
                catch(e)
                {
                    throw new Error().message += JSON.stringify(e);
                }
            }

            acc[key] = value;
        }
    },
    (key : string, acc : any) => {
        acc[key] = {};
        return acc[key];
    }, loadedConfig, validateConfigSettings);

    return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
}


