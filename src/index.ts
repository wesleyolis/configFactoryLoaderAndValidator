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
import { isXArrayHasChildren } from './joi-x';

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

export class LoadConfigErrors {
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
        const optionalConfigSchema = await JoiX.OperateOnJoiSchema<JoiX.OperateOnJoiSchemaAcc>(configSchema,
        async (schema : Joi.AnySchema, acc : JoiX.OperateOnJoiSchemaAcc, key : string | undefined, configValue : JoiX.ConfigValue) : Promise<void> => {
            
            const newSchema = schema.optional();

            switch(acc.kind)
            {
                case 'array' : {  
                    acc.items.push(newSchema);
                }
                break;

                case 'alter' : {
                    acc.matches.push(newSchema);
                }
                break;

                case 'object' : {
                    if (key != undefined)
                        acc.keys[key] = newSchema;
                    else
                        throw Error("object must always have a key");   // what I could look at doing is that the key, be hidden away in the accumulator,
                        // but that would mean, can't just operate on things.. probably what I should be doing is having and undefine key word, which means the 
                        // their was no present for the key in the first place.
                }
                break;
                case 'undefined': {
                    acc = newSchema as JoiX.UndefinedAcc;
                
                break;
                }
            }

        },
        (schema : Joi.AnySchema) : JoiX.OperateOnJoiSchemaAcc =>{
            if (JoiX.isXArrayHasChildren(schema))
            {
                const newAcc : JoiX.ChildArrayAcc = 
                {
                    kind : 'array',
                    items : [],
                    newContainerObject: () => Joi.array().optional()
                }

                return newAcc;
            }
            else if (JoiX.isXAlternativesHasChildren(schema))
            {
                const newAcc : JoiX.ChildAlterAcc = 
                {
                    kind : 'alter',
                    matches : [],
                    newContainerObject: () => Joi.alternatives().optional()
                }

                return newAcc;
            }
            else
            {
                const newAcc : JoiX.ChildObjectAcc =
                {
                    kind : 'object',
                    keys : {},
                    newContainerObject: () => Joi.object().optional()
                }

                return newAcc;
            }
        },
        (key : string | undefined, schema : Joi.AnySchema, parentAcc : JoiX.OperateOnJoiSchemaAcc, acc : JoiX.OperateOnJoiSchemaAcc) : JoiX.OperateOnJoiSchemaAcc => {

            let typeParentAcc : Joi.AnySchema;

            let typeContainer : Joi.AnySchema  = Joi.object();

            // if (key == undefined && acc.newContainerObject != null)
            //     typeContainer = acc.newContainerObject();
            
            switch(acc.kind)
            {
                case 'array' : {  
                    typeContainer = acc.newContainerObject().items(acc.items);
                }
                break;

                case 'alter' : {
                    typeContainer = acc.newContainerObject().try(acc.matches);
                }
                break;

                case 'object' : {
                    typeContainer = acc.newContainerObject().keys(acc.keys);
                }
                break;
            }

            // parent could also be null.
            switch(parentAcc.kind)
            {
                case 'array' : {  
                    parentAcc.items.push(typeContainer);
                }
                break;

                case 'alter' : {
                    parentAcc.matches.push(typeContainer);
                }
                break;

                case 'object' : {

                    if(key)
                        parentAcc.keys[key] = typeContainer;
                    else
                        throw Error("Object must always have a key");
                }
                break;
                case 'undefined': {
                    parentAcc = typeContainer as JoiX.UndefinedAcc; // this is a little bit hacky but it should work.
                }

                break;
            }

            return parentAcc;
        }, {kind:'undefined'} as JoiX.UndefinedAcc);
        // this could be simplified and we can get away from casting.

        configSchema = optionalConfigSchema as Joi.AnySchema as L;
                
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
                            throw new VError({name:LoadConfigErrors.configurationMissing, cause: e}, `factory at key [${key}] missing`);
                        else
                            throw new VError({name:LoadConfigErrors.failedToNewFactory, cause: e}, `failed to new factory [${key}]`);
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
                    propertyValue = () => {throw new VError({name:LoadConfigErrors.configurationMissing, cause: e}, `factory at key [${key}] missing`)};
                }
            }

            Object.defineProperty(acc, key, { get : propertyValue });
        }
    },
    (key : string, acc : any) => {
        return {};
    },
    (key, parentAcc, acc) => {

        parentAcc[key] = acc;
        return parentAcc;
    },
    loadedConfig, validateConfigSettings);

    return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
}


