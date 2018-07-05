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
import {MultiError, VError} from 'VError'

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
    constructor (public config : LF, private factoryInstances : (() => Promise<IConfigFactory>)[])
    {
    }

    startAsync() : Promise<void []>
    {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.startAsync())));
    }

    stopAsync() : Promise<void []>
    {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.stopAsync())));
    }
}

class Errors {
    static readonly configurationMissing : string = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
    static readonly failedToNewFactory : string = "FailedToLoadFactory";
}

export async function LoadConfig<L extends JoiX.XObjectSchema, 
LF = JoiX.ExtractWithFactoriesFromSchema<L>>
(configSettings : any, configSchema : L, lazyLoad : boolean = false, configOptional : boolean = false) : Promise<FactoriesInstancesResolver<L, LF>>
{
    const originalConfigSchema = _.cloneDeep(configSchema);

    if (configOptional)
    {
        const children = JoiX.getXObjectChildrens(configSchema);

        JoiX.OperateOnXObjectKeys(children, async (key : string, schema : any, acc : any, config : any) => {
            (schema as Joi.AnySchema).optional();
        }, (key : string, acc : any) => {}, null);
    }

    const children = JoiX.getXObjectChildrens(originalConfigSchema);

    const validateConfigSettings : any = await JoiX.validate(configSettings, configSchema);

    let loadedConfig : any = {};
    let factoryConfig : (() => Promise<IConfigFactory>) [] = [];

    await JoiX.OperateOnXObjectKeys(children, async (key : string, schema : any, acc : any, configValue : any) : Promise<void> => {
        
        const factory = JoiX.findFactory(schema)
        
        if (factory)
        {
            let factoryInstance : IConfigFactory | undefined = undefined;

            const lazyLoader = async () =>
            {
                if (factoryInstance === undefined)
                {
                    try
                    {
                        factoryInstance = factory.__newFactory(configValue);
                        
                        await factoryInstance.createFactoryAsync(configValue);

                        if (lazyLoad)
                            await factoryInstance.startAsync();
                    }
                    catch(e)
                    {
                        if (configOptional)
                            throw new VError({name:Errors.configurationMissing, cause: e}, `factory at key [${key}] missing`);
                        else
                            throw new VError({name:Errors.failedToNewFactory, cause: e}, `failed to new factory [${key}]`);
                    }
                }

                return factoryInstance as IConfigFactory;
            }

            let lazyLoaderPromise: () => Promise<IConfigFactory> = () => {return lazyLoader()};
            
            if (!lazyLoad) {
                const resolved =  await lazyLoader();
                lazyLoaderPromise = () => Promise.resolve(resolved);
            }

            factoryConfig.push(lazyLoaderPromise);
            Object.defineProperty(acc, key, { get : lazyLoaderPromise });
        }
        else
        {
            let propertyValue : () => string = () => configValue;

            if (configOptional)
            {
                try
                {
                    const value = await JoiX.validate(configValue, schema);
                    propertyValue = () => value;
                }
                catch(e)
                {
                    propertyValue = () => {throw new VError({name:Errors.configurationMissing, cause: e}, `factory at key [${key}] missing`)};
                }
            }

            Object.defineProperty(acc, key, { get : propertyValue });
        }
    },
    (key : string, acc : any) => {
        acc[key] = {};
        return acc[key];
    }, loadedConfig, validateConfigSettings);

    return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
}


