import * as Joi from 'joi';
import * as JoiX from '../../../joi-x';
export declare const factoryName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsTypeO: {
        host: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & Joi.ObjectSchema & any & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
