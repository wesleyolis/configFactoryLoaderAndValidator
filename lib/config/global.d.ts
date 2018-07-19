import { IMongoSettings, ISftpSettings, CFT, JoiX, JoiV, Joi } from '../index';
export declare type GlobalConfigSchema = JoiX.ExtractFromObject<typeof globalConfigSchema>;
export declare const globalConfigSchema: {
    mongodb: JoiX.XFactAlternatives<IMongoSettings, {
        w: (JoiX.XObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            provider: JoiX.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            hosts: JoiX.XArray<{
                'w': JoiX.XObject<{
                    hostname: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
                }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
            credentials: JoiX.XObject<{
                username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                password: JoiX.XObject<{
                    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                    type: JoiX.XStringSchema<JoiV.PassType>;
                }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            database: JoiX.XStringSchema<string>;
            options: JoiX.XObject<{
                'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
        } & {
            factory: JoiX.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
        } & {
            factory: JoiX.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
    }, "Required", "NotNullable", "F", "W"> & JoiX.XFactory<IMongoSettings> & Joi.AlternativesSchema;
    mongoConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    agenda: JoiX.XObject<{
        mongoConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    mongoRemoteConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoRemoteAuditConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoAuditConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoLocalIpAddress: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    postgresReadonlyConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongo: JoiX.XObject<{
        mms_group_id: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        mss_api_key: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    oplog: JoiX.XObject<{
        db: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        host: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
};
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject<{
    banking: JoiX.XObject<{
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
        sftp: JoiX.XFactAlternatives<ISftpSettings, {
            w: JoiX.XObject<{
                host: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
                credentials: JoiX.XObject<{
                    username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                    auth: JoiX.XAlternatives<{
                        w: (JoiX.XObject<{
                            type: JoiX.XPrimitive<JoiV.AuthType.password, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
                            type: JoiX.XPrimitive<JoiV.AuthType.publicKey, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
                            type: JoiX.XPrimitive<JoiV.AuthType.any, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            password: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                            passKey: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
                    }, "Required", "NotNullable", "L", "W"> & Joi.AlternativesSchema;
                }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            } & {
                factory: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
        }, "Required", "NotNullable", "F", "W"> & JoiX.XFactory<ISftpSettings> & Joi.AlternativesSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
} & {
    mongodb: JoiX.XFactAlternatives<IMongoSettings, {
        w: (JoiX.XObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            provider: JoiX.XPrimitive<"mongodb", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            hosts: JoiX.XArray<{
                'w': JoiX.XObject<{
                    hostname: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
                }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            }, "Required", "NotNullable", "A", "W"> & Joi.ArraySchema;
            credentials: JoiX.XObject<{
                username: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                password: JoiX.XObject<{
                    phrase: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
                    type: JoiX.XStringSchema<JoiV.PassType>;
                }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            }, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
            database: JoiX.XStringSchema<string>;
            options: JoiX.XObject<{
                'w': JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            }, "NotRequired", "NotNullable", "P", "W"> & Joi.ObjectSchema;
        } & {
            factory: JoiX.XPrimitive<"Network", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema) | (JoiX.XObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
            port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
        } & {
            factory: JoiX.XPrimitive<"InMemory", Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema);
    }, "Required", "NotNullable", "F", "W"> & JoiX.XFactory<IMongoSettings> & Joi.AlternativesSchema;
    mongoConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    agenda: JoiX.XObject<{
        mongoConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    mongoRemoteConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoRemoteAuditConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoAuditConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongoLocalIpAddress: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    postgresReadonlyConnectionString: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    mongo: JoiX.XObject<{
        mms_group_id: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        mss_api_key: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    oplog: JoiX.XObject<{
        db: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        host: JoiX.XPrimitive<string, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
}, "NotRequired", "NotNullable", "K", "P"> & Joi.ObjectSchema;
