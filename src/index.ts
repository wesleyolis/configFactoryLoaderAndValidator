import {Promisify, PromisifyReturn} from './util/bluebird-promisify';
export {Promisify as BluebirdPromisify, PromisifyReturn};

import * as CFT from './config-factory/config-factory-types'
export {CFT as CFT}


import * as factories from './factories'
export {factories as Factories}
export {IMongoSettings, ISftpSettings} from './factories'

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

export {configAsync, ConfigSchema, loadConfig} from './config/index';




export abstract class IConfigBundle
{
    static async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined | number = undefined, configSchema : JoiX.XAnyObjectSchema, requireConfig : (file:string) => any = require('config')) : Promise<any>
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

IConfigBundle.newBundleAndResolveConfigAsync(undefined, null as any as JoiX.XObjectSchema);

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
    constructor (public settings : LF, private factoryInstances : (() => Promise<IConfigFactory>)[])
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
    // This is an error message is used to resolve all existing test that require special configuration
    // to run. this will allow us to simple see a test failing, were the config is just missing.
    static readonly configurationMissing : string = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
    static readonly failedToNewFactory : string = "FailedToLoadFactory";
}

export type AccSchemaTypes = JoiX.SchemaTypes<'accumulator'>

// I must see If I am able of striping away the undefined, behaveour, so not their as option
// by creating another layer.
export interface AccBase<T extends Joi.AnySchema | undefined>
{
  kind : AccSchemaTypes
  newContainerObject : () => T
}

export interface ChildObjectAcc extends AccBase<Joi.ObjectSchema>
{
  kind : 'object'
  keys : Record<string, Joi.AnySchema>
}

export interface ChildArrayAcc extends AccBase<Joi.ArraySchema>
{
  kind : 'array'
  items : Joi.AnySchema [];
}


export interface ChildAlterAcc extends AccBase<Joi.AlternativesSchema>
{
  kind : 'alter'
  matches : Joi.AnySchema [];
}

export interface Accumulator extends Joi.AnySchema, AccBase<undefined>
{
  kind : 'accumulator'
  accumulator : Joi.AnySchema | null;
}

type JoiXSchemaAcc = Accumulator | ChildObjectAcc | ChildArrayAcc | ChildAlterAcc;


//export type LoadedConfig<L extends JoiX.XObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>> = FactoriesInstancesResolver<L, LF>;

export type LoadedConfig<L extends JoiX.XAnyObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>> = FactoriesInstancesResolver<L, LF>;

export async function genericLoadConfig<L extends JoiX.XAnyObjectSchema, 
LF = JoiX.ExtractWithFactoriesFromSchema<L>>
(configSettings : any, configSchema : L, lazyLoad : boolean = false, configOptional : boolean = false, skipValidation : boolean = false) : Promise<FactoriesInstancesResolver<L, LF>>
{
    const originalConfigSchema = _.cloneDeep(configSchema);

    if (configOptional && !skipValidation)
    {
        // I would like to be able to define common genrics in which I then basically type this call back function
        // back in.
        // The next step, would be to create and abstraction for the accumulator, which one then need to spesify one operator.
        // then from, what makes things simpler is and any type accumulator, because then we don't care object distingishing the object types.
        // that and look at migrating OperateOnXObjectKeys onto this method, which is more genric and actually handles all the cases.
        const optionalConfigSchema = await JoiX.OperateOnJoiSchema<JoiXSchemaAcc, JoiXSchemaAcc['kind']>(configSchema,
        async (schema : Joi.AnySchema, acc : JoiXSchemaAcc, pos : number, key : string | undefined, configValue : JoiX.ConfigValue) : Promise<void> => {
            
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
                case 'accumulator': {
                    acc.accumulator = newSchema;    // Could actually jsut give the accumulator a single joi value here, it shouldn't actually matter.
                
                break;
                }
            }

        },
        (kind : JoiXSchemaAcc['kind']) : JoiXSchemaAcc => {
            switch(kind)
            {
                case 'array':
                {
                    return {
                        kind : 'array',
                        items : [],
                        newContainerObject: () => Joi.array().optional()
                    };
                }
                
                case 'alter' :
                {
                    return {
                        kind : 'alter',
                        matches : [],
                        newContainerObject: () => Joi.alternatives().optional()
                    };
                }

                case 'object' : 
                {
                    return {
                        kind : 'object',
                        keys : {},
                        newContainerObject: () => Joi.object().optional()
                    }
                }
                default :
                    throw Error('Why the hell do I need default type'); // This is clearly another bug, in which we need to report, we starting to bleed a little.
                    // at least we can start to improve the ecosystem.
            }
        },
        (key : string | undefined, schema : Joi.AnySchema, parentAcc : JoiXSchemaAcc, acc : JoiXSchemaAcc) : JoiXSchemaAcc => {

            // would just be nice here to use a read only type, which means has to be assign before ususage.
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
                case 'accumulator': {
                    parentAcc.accumulator = typeContainer;
                }

                break;
            }

            return parentAcc;
        }, {kind:'accumulator', accumulator : null} as Accumulator);
        // this could be simplified and we can get away from casting.

        configSchema = (optionalConfigSchema as Accumulator).accumulator as L;
                
    }

    const children = JoiX.getXObjectChildrens(originalConfigSchema);

    let configValidationSettingsResult : any = undefined;

    if (skipValidation)
    {
        configValidationSettingsResult = configSettings;
    }
    else
    {
        configValidationSettingsResult  = await JoiX.validate(configSettings, configSchema);
    }

    const validateConfigSettings = configValidationSettingsResult;

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

                        if ((factoryInstance as any) ['injectConfig'] != undefined)
                            (factoryInstance as any).injectConfig(configSettings)

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
