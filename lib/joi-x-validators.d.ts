import * as JoiX from './joi-x';
export interface Port extends JoiX.XNumberSchema {
}
export declare enum DPorts {
    undefined = -1,
    mongo = 27017,
    sftp = 22,
}
export declare const port: (port?: DPorts) => JoiX.XNumberSchema<number>;
export declare enum AuthType {
    password = "password",
    publicKey = "publicKey",
    any = "any",
}
export declare enum PassType {
    plainText = "plainText",
    encrypt = "encrypt",
}
export declare type AuthTypes = AuthPassword | AuthPublicKey | AuthAny;
export declare type AuthPassword = JoiX.ExtractFromSchema<typeof authPassword>;
export declare type AuthPublicKey = JoiX.ExtractFromSchema<typeof authPublicKey>;
export declare type AuthAny = JoiX.ExtractFromSchema<typeof authAny>;
export declare const password: (passType?: PassType) => JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<PassType>;
    };
};
export declare const authPassword: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        type: JoiX.XPrimitive<AuthType.password> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
export declare const authPublicKey: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        type: JoiX.XPrimitive<AuthType.publicKey> & JoiX.StringSchema & {
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
};
export declare const authAny: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        type: JoiX.XPrimitive<AuthType.any> & JoiX.StringSchema & {
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
};
export declare function isAuthPassword(x: AuthTypes): x is AuthPassword;
export declare function isAuthPublicKey(x: AuthTypes): x is AuthPublicKey;
export declare function isAuthAny(x: AuthTypes): x is AuthAny;
export declare const authPasswordOnly: () => JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        type: JoiX.XPrimitive<AuthType.password> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        password: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
export declare const authentication: () => JoiX.XAlternatives & JoiX.AlternativesSchema & {
    __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            type: JoiX.XPrimitive<AuthType.password> & JoiX.StringSchema & {
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
            type: JoiX.XPrimitive<AuthType.publicKey> & JoiX.StringSchema & {
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
            type: JoiX.XPrimitive<AuthType.any> & JoiX.StringSchema & {
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
export declare const credentials: () => JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        username: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        auth: JoiX.XAlternatives & JoiX.AlternativesSchema & {
            __tsTypeAl: (JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            }) | (JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            }) | (JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            });
        } & {
            __isRequired: "T";
        };
    };
};
export declare const mongoConnectionString: () => JoiX.XStringSchema<string>;
export declare const postgress: () => JoiX.XStringSchema<string>;
export declare const Url: () => JoiX.XStringSchema<string>;
