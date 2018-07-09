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
        const optionalConfigSchema : {ref:JoiX.XObjectSchema} = {ref:JoiX.object()};

        const children = JoiX.getXObjectChildrens(configSchema);

        try
        {
            /*
            object : Joi.AnySchema,
  operate : (schema : Joi.AnySchema, acc : ACC, configValue : ConfigValue) => Promise<void>,
  initAcc : (schema : Joi.AnySchema) => ACC,
  updateParentAcc : (key : string, schema : Joi.AnySchema, parentAcc : ACC, acc : ACC) => ACC,
  acc : ACC, config : Config = undefined, key : string | undefined = undefined) : Promise<void>
            */
            await JoiX.OperateOnJoiSchema<JoiX.OperateOnJoiSchemaAcc>(configSchema,
            async (schema : Joi.AnySchema, acc : JoiX.OperateOnJoiSchemaAcc, configValue : JoiX.ConfigValue) : Promise<void> => {
              
            },
            (schema : Joi.AnySchema) : JoiX.OperateOnJoiSchemaAcc =>
            {
                if (JoiX.isXAlternativesHasChildren(schema))
                {
                    const newAcc : JoiX.ChildArrayAcc = 
                    {
                        kind : 'array',
                        items : []
                    }

                    return newAcc;
                }
                else if (JoiX.isXAlternativesHasChildren(schema))
                {
                    const newAcc : JoiX.ChildAlterAcc = 
                    {
                        kind : 'alter',
                        matches : []
                    }

                    return newAcc;
                }
                else
                {
                   const newAcc : JoiX.ChildObjectAcc =
                   {
                        kind : 'object',
                        keys : {}
                   }

                   return newAcc;
                }
            },
            (key : string | undefined, schema : Joi.AnySchema, parentAcc : JoiX.OperateOnJoiSchemaAcc, acc : JoiX.OperateOnJoiSchemaAcc) : JoiX.OperateOnJoiSchemaAcc => {

                switch(acc.kind)
                {
                    case 'array' : {
                      
                        let typeParentAcc : Joi.ArraySchema = parentAcc as any as Joi.ArraySchema;

                        if (key == undefined)
                            typeParentAcc = JoiX.array();
                        
                        typeParentAcc.items(acc.items);

                        return typeParentAcc as any as JoiX.ParentAcc;
                    }
                    break;

                    case 'alter' : {

                        let typeParentAcc : Joi.AlternativesSchema = parentAcc as any as Joi.AlternativesSchema;

                        if (key == undefined)
                            typeParentAcc = JoiX.alternatives();
                        
                        typeParentAcc.try(acc.matches);
                    }
                    break;

                    case 'object' : {

                    }
                    break;
                }
                
                else if (JoiX.isXObjectAndHasChildren(schema))
                {
                    const keyObject : Record<string, Joi.AnySchema> = {};
                    keyObject[key] = acc;

                    return (<Joi.ObjectSchema>parentAcc).keys(keyObject);
                }
            }

            // await JoiX.OperateOnXObjectKeys(children, async (key : string, schema : any, acc : {ref:JoiX.XObjectSchema}, config : any) => {
                
            //     let object : Record<string,JoiX.AnySchema> = {};
            //     object[key] = (schema as Joi.AnySchema).optional();

            //     acc.ref = acc.ref.keys(object);

            // }, (key : string, acc : {ref : JoiX.XObjectSchema}) => {

            //     let object = JoiX.object();

            //     let keysObject : Record<string, JoiX.AnySchema> = {};
            //     keysObject[key] = object;

            //     // has to be delayed.
            //     acc.ref = acc.ref.keys(keysObject);
                
            //     return {ref : object};
            // }, (key : string, parentAcc, acc ) => {

            //     return parentAcc
            // },
            // {ref:optionalConfigSchema});

            await JoiX.OperateOnXObjectKeys<{ref:JoiX.XObjectSchema}>(children, async (key : string, schema : any, acc : {ref : JoiX.XObjectSchema}, config : any) => {
                
                let keysObject : Record<string,JoiX.AnySchema> = {};
                keysObject[key] = (schema as Joi.AnySchema).optional();

                acc.ref = acc.ref.keys(keysObject);

            }, (key : string, schema, acc) => {

                return {ref:_.dep};

            }, (key : string, parentAcc, acc ) => {

                let keysObject : Record<string, JoiX.AnySchema> = {};
                keysObject[key] = acc.ref;

                return {ref: parentAcc.ref.keys(keysObject)};
            },
            optionalConfigSchema);
        }
        catch(e)
        {
            console.log(JSON.stringify(e));
        }

        (configSchema as JoiX.XObjectSchema) = optionalConfigSchema.ref;
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


