import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types';
export declare type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;
export declare const mongoDBSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XStringSchema<CFT.ConfigFactoryClass.netService>;
        type: JoiX.XStringSchema<CFT.ConfigFactoryTypes.production>;
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
} & {
    __tsType: JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"Network"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>;
};
export declare type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;
export declare const inMemorySchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XStringSchema<CFT.ConfigFactoryClass.service>;
        type: JoiX.XStringSchema<CFT.ConfigFactoryTypes.mock>;
        port: JoiV.Port & {
            __isRequired: "T";
        };
    }>;
} & {
    __isRequired: "T";
} & {
    __tsType: JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"InMemory"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>;
};
export declare type ConfigFactories = MongoDBSchema | InMemorySchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XAlternatives & Joi.AlternativesSchema & {
    __tsType: (JoiX._ExtractFromObject<{
        class: JoiX.XStringSchema<CFT.ConfigFactoryClass.netService>;
        type: JoiX.XStringSchema<CFT.ConfigFactoryTypes.production>;
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
        credentials: JoiX.XObject & Joi.ObjectSchema & {
            __tsType: JoiX._ExtractFromObject<{
                username: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                password: JoiX.XObject & Joi.ObjectSchema & any & {
                    __isRequired: "T";
                };
            }>;
        } & {
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
    }> & JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"Network"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>) | (JoiX._ExtractFromObject<{
        class: JoiX.XStringSchema<CFT.ConfigFactoryClass.service>;
        type: JoiX.XStringSchema<CFT.ConfigFactoryTypes.mock>;
        port: JoiV.Port & {
            __isRequired: "T";
        };
    }> & JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"InMemory"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>);
};
export declare function NewFactory(settings: ConfigFactories): IConfigFactory;
