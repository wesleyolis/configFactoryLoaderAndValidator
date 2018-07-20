import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { IMongoSettings } from './../amongodb-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export { CS as CS };
export declare class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: JoiX.XObject<{
        class: JoiX.XPrimitive<ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
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
                type: JoiX.XStringSchema<JoiX.PassType>;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject<{
            'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    static NewInstance(): MongoDBConfigFactory<JoiX.ExtractFromSchema<JoiX.XObject<{
        class: JoiX.XPrimitive<ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
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
                type: JoiX.XStringSchema<JoiX.PassType>;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject<{
            'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getConnectionString(): string;
    private makeMongoDBConnString(settings);
}
