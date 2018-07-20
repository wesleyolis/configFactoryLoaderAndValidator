import { Joi, JoiX, Factories } from '../index';
export declare const bundleName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject<{
    pendingNc: JoiX.XPrimitive<boolean, Joi.BooleanSchema, "Required", "NotNullable", "T", "P"> & Joi.BooleanSchema;
    hyphenPaymentDocumentType: JoiX.XPrimitive<"PT" | "RC", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    bankingSystem: JoiX.XPrimitive<"redblade-hyphen-banking", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenFacsUrl: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenPaymentUserProfile: JoiX.XPrimitive<"FACRedbladeTest" | "FACDirectAxis" | "FACDirectAxisTest", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenPaymentKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    paymentRetries: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenDebitOrderOutputFileName: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenTrackingDays: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    useRuleBasedTrackingDays: JoiX.XPrimitive<boolean, Joi.BooleanSchema, "Required", "NotNullable", "T", "P"> & Joi.BooleanSchema;
    ptpTrackingDays: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    hyphenLoadReportPrefix: JoiX.XPrimitive<"LD", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpOutPath: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpHost: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpPort: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    hyphenSftpUser: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpPassword: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpPrivateKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenSftpInPath: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    hyphenAccountValidationUrl: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenAccountVerificationUserProfile: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    hyphenKey: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    sftp: JoiX.XFactAlternatives<Factories.SFTP.ISftpSettings, {
        w: JoiX.XObject<{
            host: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
            credentials: JoiX.XObject<{
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
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        } & {
            factory: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    }, "Required", "NotNullable", "F", "W"> & Joi.AlternativesSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
