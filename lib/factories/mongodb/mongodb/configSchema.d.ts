import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "Network";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & Joi.StringSchema & {
            __isRequired: "T";
        };
        provider: JoiX.XStringSchema<string>;
        hosts: JoiX.XArray & Joi.ArraySchema & {
            __tsType: JoiX._ExtractFromObject<{
                hostname: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                port: JoiV.Port & {
                    __isRequired: "T";
                };
            }>[];
        } & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & Joi.ObjectSchema & any & {
            __isRequired: "T";
        };
        database: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        options: JoiX.XObject & Joi.ObjectSchema & {
            __tsType: Record<string, string>;
        } & {
            __isRequired: "T";
        };
    }>;
} & {
    __isRequired: "T";
};
