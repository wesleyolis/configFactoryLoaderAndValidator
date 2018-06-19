import { CFT, JoiX, Joi } from '../index';
export declare type GlobalConfigSchema = JoiX.ExtractFromObject<typeof globalConfigSchema>;
export declare const globalConfigSchema: {
    mongodb: JoiX.XAlternatives & Joi.AlternativesSchema & {
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
            } & JoiX.XObject & Joi.ObjectSchema;
            database: JoiX.XStringSchema<string>;
            options: JoiX.XObject & Joi.ObjectSchema & {
                __tsType: Record<string, string>;
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
    mongoConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    agenda: {
        __tsType: JoiX._ExtractFromObject<{
            mongoConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
        }>;
    } & JoiX.XObject & Joi.ObjectSchema & {
        __isRequired: "T";
    };
    mongoRemoteConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    mongoRemoteAuditConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    mongoAuditConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    mongoLocalIpAddress: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    postgresReadonlyConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
        __isRequired: "T";
    };
    mongo: {
        __tsType: JoiX._ExtractFromObject<{
            mms_group_id: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            mss_api_key: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
        }>;
    } & JoiX.XObject & Joi.ObjectSchema & {
        __isRequired: "T";
    };
    oplog: {
        __tsType: JoiX._ExtractFromObject<{
            db: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            host: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
        }>;
    } & JoiX.XObject & Joi.ObjectSchema & {
        __isRequired: "T";
    };
};
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: {
    __tsType: JoiX._ExtractFromObject<{
        mongodb: JoiX.XAlternatives & Joi.AlternativesSchema & {
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
                credentials: any & JoiX.XObject & Joi.ObjectSchema;
                database: JoiX.XStringSchema<string>;
                options: JoiX.XObject & Joi.ObjectSchema & {
                    __tsType: Record<string, string>;
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
        mongoConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        agenda: any & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        };
        mongoRemoteConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        mongoRemoteAuditConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        mongoAuditConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        mongoLocalIpAddress: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        postgresReadonlyConnectionString: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        mongo: any & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        };
        oplog: any & JoiX.XObject & Joi.ObjectSchema & {
            __isRequired: "T";
        };
    }>;
} & {
    __tsType: JoiX._ExtractFromObject<{
        banking: any & JoiX.XObject & Joi.ObjectSchema & {
            __bundleName: "T";
        } & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema;
