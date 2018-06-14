import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "Network";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare type Credentials = JoiX.ExtractFromSchema<typeof credentials>;
export declare type Password = JoiX.ExtractFromSchema<typeof password>;
export declare const password: {
    __tsType: JoiX._ExtractFromObject<{
        phrase: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<JoiV.PassType>;
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
export declare const credentials: {
    __tsType: JoiX._ExtractFromObject<{
        username: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        password: {
            __tsType: JoiX._ExtractFromObject<{
                phrase: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                type: JoiX.XStringSchema<JoiV.PassType>;
            }>;
        } & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
export declare const configSchema: {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & Joi.StringSchema & {
            __isRequired: "T";
        };
        provider: JoiX.XPrimitive<"mongodb"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hosts: JoiX.XArray & Joi.ArraySchema & {
            __tsType: JoiX._ExtractFromObject<{
                hostname: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
                    __isRequired: "T";
                };
            }>[];
        } & {
            __isRequired: "T";
        };
        credentials: {
            __tsType: JoiX._ExtractFromObject<{
                username: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                password: {
                    __tsType: JoiX._ExtractFromObject<{
                        phrase: JoiX.XPrimitive<string> & Joi.StringSchema & {
                            __isRequired: "T";
                        };
                        type: JoiX.XStringSchema<JoiV.PassType>;
                    }>;
                } & JoiX.XObject & Joi.ObjectSchema & {
                    __isRequired: "T";
                };
            }>;
        } & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        },
        database: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        options: JoiX.XObject & Joi.ObjectSchema & {
            __tsType: Record<string, string>;
        } & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
