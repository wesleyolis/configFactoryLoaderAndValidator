import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "InMemory";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject<{
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
