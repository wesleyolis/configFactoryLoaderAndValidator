import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "InMemory";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiV.Port & {
            __isRequired: "T";
        };
    }>;
} & {
    __isRequired: "T";
};
