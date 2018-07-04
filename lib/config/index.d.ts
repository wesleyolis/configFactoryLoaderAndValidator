import { Factories, CFT, JoiX } from '../index';
export declare type GlobalConfigSchema = JoiX.ExtractFromObject<typeof globalConfigSchema>;
export declare const globalConfigSchema: {
    mongodb: JoiX.XAlternatives & JoiX.AlternativesSchema & {
        __factoryType: Factories.MongoDB.IMongoSettings;
        __NewFactory: <T extends {
            factory: string;
        } & JoiX.XTSchema>(settings: T) => JoiX.IConfigFactory;
        configSchema: JoiX.XObjectSchema;
        configSettings: JoiX.XTSchema;
    } & {
        __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                provider: JoiX.XPrimitive<"mongodb"> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                hosts: JoiX.XArray & JoiX.ArraySchema & {
                    __tsTypeAr: JoiX.XObject & JoiX.ObjectSchema & any & {
                        __isRequired: "T";
                    };
                } & {
                    __isRequired: "T";
                };
                credentials: JoiX.XObject & JoiX.ObjectSchema & any;
                database: JoiX.XStringSchema<string>;
                options: JoiX.XObject & JoiX.ObjectSchema & {
                    __tsTypeOP: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                        __isRequired: "T";
                    };
                };
            };
        } & {
            __isRequired: "T";
        } & {
            __tsTypeO: {
                factory: JoiX.XPrimitive<"Network"> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
            };
        }) | (JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                port: JoiX.XPrimitive<number> & JoiX.NumberSchema & {
                    __isRequired: "T";
                };
            };
        } & {
            __isRequired: "T";
        } & {
            __tsTypeO: {
                factory: JoiX.XPrimitive<"InMemory"> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
            };
        });
    } & {
        __isRequired: "T";
    };
    mongoConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    agenda: JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            mongoConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    };
    mongoRemoteConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    mongoRemoteAuditConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    mongoAuditConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    mongoLocalIpAddress: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    postgresReadonlyConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    mongo: JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            mms_group_id: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
            mss_api_key: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    };
    oplog: JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            db: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
            host: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    };
};
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        banking: JoiX.XObject & JoiX.ObjectSchema & {
            __bundleName: "T";
        } & any & {
            __isRequired: "T";
        };
    };
} & {
    __tsTypeO: {
        mongodb: JoiX.XAlternatives & JoiX.AlternativesSchema & {
            __factoryType: Factories.MongoDB.IMongoSettings;
            __NewFactory: <T extends {
                factory: string;
            } & JoiX.XTSchema>(settings: T) => JoiX.IConfigFactory;
            configSchema: JoiX.XObjectSchema;
            configSettings: JoiX.XTSchema;
        } & {
            __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            } & any) | (JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            } & any);
        } & {
            __isRequired: "T";
        };
        mongoConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        agenda: JoiX.XObject & JoiX.ObjectSchema & any & {
            __isRequired: "T";
        };
        mongoRemoteConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        mongoRemoteAuditConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        mongoAuditConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        mongoLocalIpAddress: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        postgresReadonlyConnectionString: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        mongo: JoiX.XObject & JoiX.ObjectSchema & any & {
            __isRequired: "T";
        };
        oplog: JoiX.XObject & JoiX.ObjectSchema & any & {
            __isRequired: "T";
        };
    };
};
