import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { IMongoSettings } from './../amongodb-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as JoiV from '../../../joi-x-validators';
export { CS as CS };
export declare class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    configSettings: T;
    readonly factoryName = "Network";
    readonly factoryClass = ConfigFactoryClass.service;
    readonly type = ConfigFactoryTypes.production;
    readonly configSchema: JoiX.XObject<{
        provider: JoiX.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        hosts: JoiX.XArray<{
            'w': JoiX.XObject<{
                hostname: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
        credentials: JoiX.XObject<{
            username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            password: JoiX.XObject<{
                phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                type: JoiX.XStringSchema<JoiV.PassType>;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject<{
            'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
    } & {
        class: JoiX.XPrimitive<ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    static NewInstance(): MongoDBConfigFactory<JoiX.ExtractFromSchema<JoiX.XObject<{
        provider: JoiX.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        hosts: JoiX.XArray<{
            'w': JoiX.XObject<{
                hostname: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
        credentials: JoiX.XObject<{
            username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            password: JoiX.XObject<{
                phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                type: JoiX.XStringSchema<JoiV.PassType>;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject<{
            'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
    } & {
        class: JoiX.XPrimitive<ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getConnectionString(): string;
    private makeMongoDBConnString;
}
