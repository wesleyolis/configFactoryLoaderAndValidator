import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types';
export declare type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;
export declare const mongoDBSchema: {
    __tsType: JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"Network"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>;
} & {
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
        credentials: any & JoiX.XObject & Joi.ObjectSchema & {
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
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
export declare type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;
export declare const inMemorySchema: {
    __tsType: JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"InMemory"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }>;
} & {
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
};
export declare type ConfigFactories = MongoDBSchema | InMemorySchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XAlternatives & Joi.AlternativesSchema & {
    __tsType: (JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"Network"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }> & JoiX._ExtractFromObject<{
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
                password: any & JoiX.XObject & Joi.ObjectSchema & {
                    __isRequired: "T";
                };
            }>;
        } & JoiX.XObject & Joi.ObjectSchema & {
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
    }>) | (JoiX._ExtractFromObject<{
        factory: JoiX.XPrimitive<"InMemory"> & Joi.StringSchema & {
            __isRequired: "T";
        };
    }> & JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
    }>);
} & {
    __isRequired: "T";
};
export declare function NewFactory(settings: ConfigFactories): IConfigFactory;
