import { Joi, JoiX } from '../index';
export declare const bundleName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __bundleName: "T";
} & {
    __tsTypeO: {
        pendingNc: JoiX.XPrimitive<boolean> & Joi.BooleanSchema & {
            __isRequired: "T";
        };
        banking: JoiX.XObject & Joi.ObjectSchema & any & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
