import { ConfigFactoryClass, ConfigFactoryTypes } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import * as JoiX from '../joi-x';
import * as VError from 'verror';
import { SchemaLike, ValidationError } from '../joi-x';
import { Config } from './config';
import { baseConfigSchema } from './abase-config-factory-schema'

export enum ErrorFactory
{
    NotCreated = "FactoryNotCreated"
}

export abstract class ABaseConfigFactory extends Config implements IConfigFactory
{
    abstract factoryName : string;
    abstract factoryClass : ConfigFactoryClass;
    abstract type : ConfigFactoryTypes;
    abstract readonly configSchema : JoiX.XObjectSchema;

    abstract configSettings? : JoiX.XTSchema

    protected _created : boolean = false;

    async createFactoryAsync<T extends ({factory: string} & JoiX.XTSchema)>(settings : T) : Promise<void>{

        delete settings.factory;

        return this.createAsync(settings);
    }

    async createAsync(config : JoiX.XJSchemaMap) : Promise<void>
    {
        try
        {
            const configSchema = this.configSchema.keys(baseConfigSchema);
            this.configSettings = JSON.parse(JSON.stringify(await JoiX.validate(config, configSchema, {abortEarly: false})));
        }
        catch(e)
        {
            if (JoiX.isJoiError(e)){
                throw new VError(e, this.factoryName);
            }
            throw e;
        }
        
        this._created = true;

        return Promise.resolve();
    }

    startAsync () : Promise<void>
    {
        if (!this._created)
            throw new VError({name: ErrorFactory.NotCreated}, "Must first call factory create once method, before start.");

        return Promise.resolve();
    }

    stopAsync () : Promise<void>
    {
        return Promise.resolve();
    }
}