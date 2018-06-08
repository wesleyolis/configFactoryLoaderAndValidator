import { ConfigFactoryClass, ConfigFactoryTypes } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import { ConfigSettings } from '../config-options/config-settings-types';
import * as CSE from '../config-options/config-settings-errors';
import * as JoiX from '../joi-x';
import * as VError from 'verror';
import { SchemaLike, ValidationError } from '../joi-x';

export enum ErrorFactory
{
    NotCreated = "FactoryNotCreated"
}

export abstract class ABaseConfigFactory implements IConfigFactory
{
    abstract readonly FactoryName : string;
    factoryClass : ConfigFactoryClass = ConfigFactoryClass.Factory;
    type : ConfigFactoryTypes = ConfigFactoryTypes.Production;
    abstract readonly configSchema : JoiX.XObjectSchema;

    abstract configSettings? : JoiX.XTSchema

    readonly configSchemaWithClassification : JoiX.SchemaMap = {
        class : JoiX.string().allow().required(),
        type : JoiX.string().required()
    };

    private _created : boolean = false;

    async createAsync(config : JoiX.XJSchemaMap) : Promise<void>
    {
        try
        {
            const configSchema = this.configSchema.keys(this.configSchemaWithClassification);
            this.configSettings = await JoiX.validate(config, configSchema, {abortEarly: false});
        }
        catch(e)
        {
            if (JoiX.isJoiError(e)){
                throw new VError(e, this.FactoryName);
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

    async validateAsync(configSettings : ConfigSettings ) : Promise<JoiX.ValidationErrorItem[]>
    {
        try {
            await JoiX.validate(this.configSettings, this.configSchema);
        }
        catch(e)
        {
            if (JoiX.isJoiError(e)) {
                return Promise.resolve(e.details);
            }

            throw e;
        }

        return Promise.resolve([]);
    }

    describe() : string
    {
        return JSON.stringify(JoiX.describe(this.configSchema));
    }
}