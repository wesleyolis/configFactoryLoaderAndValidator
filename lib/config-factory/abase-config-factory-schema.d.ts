import * as JoiX from '../joi-x';
import * as Joi from 'joi';
import { ConfigFactoryClass, ConfigFactoryTypes } from './config-factory-types';
export * from './config-factory-types';
export declare type BaseConfigSchema = JoiX.ExtractFromObject<typeof baseConfigSchema>;
export declare const baseConfigSchema: {
    class: JoiX.XPrimitive<ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
};
