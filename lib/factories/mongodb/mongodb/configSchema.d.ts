import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "Network";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare type Password = JoiX.ExtractFromSchema<typeof password>;
export declare const password: JoiX.XObject<{
    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XStringSchema<JoiV.PassType>;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type Credentials = JoiX.ExtractFromSchema<typeof credentials>;
export declare const credentials: JoiX.XObject<{
    username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    password: JoiX.XObject<{
        phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XStringSchema<JoiV.PassType>;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
}, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare type Hosts = JoiX.ExtractFromSchema<typeof hosts>;
export declare const hosts: JoiX.XArray<{
    'w': JoiX.XObject<{
        hostname: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
}, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
export declare const configSchema: JoiX.XObject<{
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
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
