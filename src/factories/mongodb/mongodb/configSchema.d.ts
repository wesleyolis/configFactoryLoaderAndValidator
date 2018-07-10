import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "Network";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare type Password = JoiX.ExtractFromSchema<typeof password>;
export declare const password: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<JoiV.PassType>;
    };
} & {
    __isRequired: "T";
};
export declare type Credentials = JoiX.ExtractFromSchema<typeof credentials>;
export declare const credentials: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        password: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                type: JoiX.XStringSchema<JoiV.PassType>;
            };
        } & {
            __isRequired: "T";
        };
    };
};
export declare type Hosts = JoiX.ExtractFromSchema<typeof hosts>;
export declare const hosts: JoiX.XArray & JoiX.ArraySchema & {
    __tsTypeAr: JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            hostname: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
            port: JoiX.XPrimitive<number> & JoiX.NumberSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    };
} & {
    __isRequired: "T";
};
export declare const configSchema: JoiX.XObject & JoiX.ObjectSchema & {
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
            __tsTypeAr: JoiX.XObject & JoiX.ObjectSchema & {
                __tsTypeO: {
                    hostname: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                        __isRequired: "T";
                    };
                    port: JoiX.XPrimitive<number> & JoiX.NumberSchema & {
                        __isRequired: "T";
                    };
                };
            } & {
                __isRequired: "T";
            };
        } & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeO: {
                username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                    __isRequired: "T";
                };
                password: JoiX.XObject & JoiX.ObjectSchema & {
                    __tsTypeO: {
                        phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                            __isRequired: "T";
                        };
                        type: JoiX.XStringSchema<JoiV.PassType>;
                    };
                } & {
                    __isRequired: "T";
                };
            };
        };
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeOP: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
        };
    };
} & {
    __isRequired: "T";
};
