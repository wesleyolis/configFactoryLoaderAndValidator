import * as JoiX from './joi-x';
import * as Joi from 'joi';
export interface Port extends JoiX.XNumberSchema {
}
export declare enum DPorts {
    undefined = -1,
    mongo = 27017,
    sftp = 22,
}
export declare const port: (port?: JoiX.DPorts) => JoiX.XNumberSchema<number>;
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
export declare const password: (passType?: JoiX.PassType) => JoiX.XObject<{
    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XStringSchema<JoiX.PassType>;
}, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare const authPassword: JoiX.XObject<{
    type: JoiX.XPrimitive<JoiX.AuthType.password, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare const authPublicKey: JoiX.XObject<{
    type: JoiX.XPrimitive<JoiX.AuthType.publicKey, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare const authAny: JoiX.XObject<{
    type: JoiX.XPrimitive<JoiX.AuthType.any, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare function isAuthPassword(x: AuthTypes): x is AuthPassword;
export declare function isAuthPublicKey(x: AuthTypes): x is AuthPublicKey;
export declare function isAuthAny(x: AuthTypes): x is AuthAny;
export declare const authPasswordOnly: () => JoiX.XObject<{
    type: JoiX.XPrimitive<JoiX.AuthType.password, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare const authentication: () => JoiX.XAlternatives<{
    w: (JoiX.XObject<{
        type: JoiX.XPrimitive<JoiX.AuthType.password, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
        type: JoiX.XPrimitive<JoiX.AuthType.publicKey, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
        type: JoiX.XPrimitive<JoiX.AuthType.any, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
}, "Required", "NotNullable", "L", "W"> & Joi.AlternativesSchema;
export declare const credentials: () => JoiX.XObject<{
    username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    auth: JoiX.XAlternatives<{
        w: (JoiX.XObject<{
            type: JoiX.XPrimitive<JoiX.AuthType.password, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
            type: JoiX.XPrimitive<JoiX.AuthType.publicKey, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
            type: JoiX.XPrimitive<JoiX.AuthType.any, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
    }, "Required", "NotNullable", "L", "W"> & Joi.AlternativesSchema;
}, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
export declare const mongoConnectionString: () => JoiX.XStringSchema<string>;
export declare const postgress: () => JoiX.XStringSchema<string>;
export declare const Url: () => JoiX.XStringSchema<string>;
