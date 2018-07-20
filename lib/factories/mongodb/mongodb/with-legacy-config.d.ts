import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoDBConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export declare function NewInstance(injectKey: string): MongoDBConfigFactoryWithLegacy<JoiX.ExtractFromSchema<JoiX.XObject<{
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
            type: JoiX.XStringSchema<JoiX.PassType>;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    database: JoiX.XStringSchema<string>;
    options: JoiX.XObject<{
        'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
export declare class MongoDBConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoDBConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
