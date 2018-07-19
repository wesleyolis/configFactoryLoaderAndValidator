import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators'
import { ISftpSettings } from './isftp-config-factory';
export { ISftpSettings };
export declare type SftpClientSchema = JoiX.ExtractFromSchema<typeof sftpClientSchema>;
export declare const sftpClientSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsTypeO: {
        host: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                auth: JoiX.XAlternatives & JoiX.AlternativesSchema & {
                    __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.password> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    }) | (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.publicKey> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    }) | (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.any> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    });
                } & {
                    __isRequired: "T";
                };
            };
        };
    };
} & {
    __isRequired: "T";
} & {
    __tsTypeO: {
        factory: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
    };
};
export declare type SftpInMemSchema = JoiX.ExtractFromSchema<typeof sftpInMemSchema>;
export declare const sftpInMemSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsTypeO: {
        host: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                auth: JoiX.XAlternatives & JoiX.AlternativesSchema & {
                    __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.password> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    }) | (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.publicKey> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    }) | (JoiX.XObject & JoiX.ObjectSchema & {
                        __tsTypeO: {
                            type: JoiX.XPrimitive<JoiV.AuthType.any> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                            passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                __isRequired: "T";
                            };
                        };
                    } & {
                        __isRequired: "T";
                    });
                } & {
                    __isRequired: "T";
                };
            };
        };
    };
} & {
    __isRequired: "T";
} & {
    __tsTypeO: {
        factory: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
    };
};
export declare type ConfigFactories = SftpClientSchema | SftpInMemSchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XAlternatives & Joi.AlternativesSchema & {
    __factoryType: ISftpSettings;
} & {
    __tsTypeAl: JoiX.XObject & Joi.ObjectSchema & {
        __tsTypeO: {
            host: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
                __isRequired: "T";
            };
            credentials: JoiX.XObject & JoiX.ObjectSchema & {
                __tsTypeO: {
                    username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                        __isRequired: "T";
                    };
                    auth: JoiX.XAlternatives & JoiX.AlternativesSchema & {
                        __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.password> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        }) | (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.publicKey> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        }) | (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.any> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        });
                    } & {
                        __isRequired: "T";
                    };
                };
            };
        };
    } & {
        __isRequired: "T";
    } & {
        __tsTypeO: {
            factory: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
        };
    };
} & {
    __isRequired: "T";
};
export declare function NewFactory(settings: ConfigFactories): ISftpSettings;
export declare const configSchemaInjectLegacy: JoiX.XAlternatives & Joi.AlternativesSchema & {
    __factoryType: ISftpSettings;
} & {
    __tsTypeAl: JoiX.XObject & Joi.ObjectSchema & {
        __tsTypeO: {
            host: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
                __isRequired: "T";
            };
            credentials: JoiX.XObject & JoiX.ObjectSchema & {
                __tsTypeO: {
                    username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                        __isRequired: "T";
                    };
                    auth: JoiX.XAlternatives & JoiX.AlternativesSchema & {
                        __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.password> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        }) | (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.publicKey> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        }) | (JoiX.XObject & JoiX.ObjectSchema & {
                            __tsTypeO: {
                                type: JoiX.XPrimitive<JoiV.AuthType.any> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                                passKey: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                                    __isRequired: "T";
                                };
                            };
                        } & {
                            __isRequired: "T";
                        });
                    } & {
                        __isRequired: "T";
                    };
                };
            };
        };
    } & {
        __isRequired: "T";
    } & {
        __tsTypeO: {
            factory: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
        };
    };
} & {
    __isRequired: "T";
};
export declare function NewFactoryWithLegacy(settings: ConfigFactories): ISftpSettings;
