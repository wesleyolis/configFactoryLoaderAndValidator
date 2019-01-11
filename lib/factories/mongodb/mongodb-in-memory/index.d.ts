import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { IMongoSettings } from '.././amongodb-config-factory';
import * as CS from './configSchema';
import * as Joi from 'joi';
export { CS as CS };
export declare class MongoInMemoryConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    readonly configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: typeof CS.configSchema;
    private connectionHost?;
    private connectionPort?;
    private mongoServerInstance;
    static NewInstance(): MongoInMemoryConfigFactory<CS.ExtractFromSchema<CS.XObject<{
        class: CS.XPrimitive<ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: CS.XPrimitive<ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        port: CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getConnectionString(): string;
}
