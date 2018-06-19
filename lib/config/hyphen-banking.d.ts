import { Joi, JoiX } from '../index';
export declare const bundleName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: {
    __tsType: JoiX._ExtractFromObject<{
        pendingNc: JoiX.XPrimitive<boolean> & Joi.BooleanSchema & {
            __isRequired: "T";
        };
        banking: any & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __bundleName: "T";
} & {
    __isRequired: "T";
};
