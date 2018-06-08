import * as JoiX from '../joi-x';
import * as Joi from 'joi';
export declare type ConfigFactorySchema = JoiX.ExtractFromSchema<typeof factoryConfigSchema>;
export declare const factoryConfigSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: "Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.";
};
