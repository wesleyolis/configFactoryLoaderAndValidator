import * as Joi from 'joi';
import * as JoiX from '../../../joi-x';
export declare const factoryName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: {
    __tsType: JoiX._ExtractFromObject<{
        host: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        credentials: any & JoiX.XObject & Joi.ObjectSchema;
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
