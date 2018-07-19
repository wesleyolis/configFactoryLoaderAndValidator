import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators';
import * as CFT from '../../config-factory/config-factory-types';
import { IMongoSettings } from './amongodb-config-factory';
export { IMongoSettings as IMongoSettings };
export declare type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;
export declare const mongoDBSchema: JoiX.XObject<{
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
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
    factory: JoiX.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;
export declare const inMemorySchema: JoiX.XObject<{
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
} & {
    factory: JoiX.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type ConfigFactories = MongoDBSchema | InMemorySchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XFactAlternatives<IMongoSettings, {
    w: (JoiX.XObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
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
        factory: JoiX.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    } & {
        factory: JoiX.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
}, "Required", "NotNullable", "F", "W"> & JoiX.XFactory<IMongoSettings> & Joi.AlternativesSchema;
export declare function NewFactory(settings: ConfigFactories): IMongoSettings;
