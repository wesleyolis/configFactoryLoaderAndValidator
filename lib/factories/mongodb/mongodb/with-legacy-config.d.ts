import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoDBConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as JoiV from '../../../joi-x-validators';
export declare function NewInstance(injectKey: string): MongoDBConfigFactoryWithLegacy<JoiX.ExtractFromSchema<JoiX.XObject<{
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
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
export declare class MongoDBConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoDBConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
