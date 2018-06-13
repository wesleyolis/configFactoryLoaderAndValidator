import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
export declare const factoryName = "InMemory";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        port: JoiV.Port & {
            __isRequired: "T";
        };
    }>;
} & {
    __isRequired: "T";
};
