import { ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef, ConfigFactoryTypesPrefix, ConfigFactoryTypesPrefixStr, ConfigFactoryClassStem, ConfigFactoryClassStemStr } from './config-factory-types';
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
    abstract readonly configFactoryName : string;
    factoryClass : ConfigFactoryClass = ConfigFactoryClass.Factory;
    type : ConfigFactoryTypes = ConfigFactoryTypes.Vanilla;
    abstract configSettings? : JoiX.JoiXSchemaTypes;
    abstract readonly configSchema : JoiX.Schema;

    private _created : boolean = false;

    factoryName() : string {
        return ConfigFactoryTypesPrefixStr[this.factoryClass] + ConfigFactoryClassStemStr[this.type] + this.configFactoryName;
    }

    async createAsync(settings : IConfigFactoryDef) : Promise<void>
    {
        this.factoryClass = settings.factoryClass;
        this.type = settings.type;

        let results : JoiX.ValidationResult<ConfigSettings>;

        try
        {
            this.configSettings = JoiX.validate(settings.configSettings, this.configSchema, {abortEarly: false});
        }
        catch(e)
        {
            if (JoiX.isJoiError(e)){
                throw new VError(e, this.factoryName());
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

    async validateAsync(configSettings : ConfigSettings = this.configSettings) : Promise<JoiX.ValidationErrorItem[]>
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