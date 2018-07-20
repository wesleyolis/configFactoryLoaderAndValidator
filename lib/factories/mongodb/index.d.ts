import * as InMemory from '../mongodb/mongodb-in-memory';
import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as CFT from '../../config-factory/config-factory-types';
import { IMongoSettings } from './amongodb-config-factory';
export { IMongoSettings as IMongoSettings };
export declare type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;
export declare const mongoDBSchema: InMemory.CS.XObject<{
    class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    provider: InMemory.CS.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hosts: InMemory.CS.XArray<{
        'w': InMemory.CS.XObject<{
            hostname: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            port: InMemory.CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
    credentials: InMemory.CS.XObject<{
        username: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        password: InMemory.CS.XObject<{
            phrase: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            type: InMemory.CS.XStringSchema<InMemory.CS.PassType>;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    database: InMemory.CS.XStringSchema<string>;
    options: InMemory.CS.XObject<{
        'w': InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
} & {
    factory: InMemory.CS.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;
export declare const inMemorySchema: InMemory.CS.XObject<{
    class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: InMemory.CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
} & {
    factory: InMemory.CS.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type ConfigFactories = MongoDBSchema | InMemorySchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: InMemory.CS.XFactAlternatives<IMongoSettings, {
    w: (InMemory.CS.XObject<{
        class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        provider: InMemory.CS.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        hosts: InMemory.CS.XArray<{
            'w': InMemory.CS.XObject<{
                hostname: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                port: InMemory.CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
        credentials: InMemory.CS.XObject<{
            username: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            password: InMemory.CS.XObject<{
                phrase: InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                type: InMemory.CS.XStringSchema<InMemory.CS.PassType>;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        database: InMemory.CS.XStringSchema<string>;
        options: InMemory.CS.XObject<{
            'w': InMemory.CS.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
    } & {
        factory: InMemory.CS.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (InMemory.CS.XObject<{
        class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        port: InMemory.CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    } & {
        factory: InMemory.CS.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
}, "Required", "NotNullable", "F", "W"> & Joi.AlternativesSchema;
export declare function NewFactory(settings: ConfigFactories): IMongoSettings;
