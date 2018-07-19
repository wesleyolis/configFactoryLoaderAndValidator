import { Joi, JoiX, Factories, JoiV } from '../index';
import { ISftpSettings } from '../factories/sftp';
export declare const bundleName: string;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsTypeO: {
        pendingNc: JoiX.XPrimitive<boolean> & Joi.BooleanSchema & {
            __isRequired: "T";
        };
        hyphenPaymentDocumentType: JoiX.XPrimitive<"PT" | "RC"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        bankingSystem: JoiX.XPrimitive<"redblade-hyphen-banking"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenFacsUrl: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenPaymentUserProfile: JoiX.XPrimitive<"FACRedbladeTest" | "FACDirectAxis" | "FACDirectAxisTest"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenPaymentKey: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        paymentRetries: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenDebitOrderOutputFileName: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenTrackingDays: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        useRuleBasedTrackingDays: JoiX.XPrimitive<boolean> & Joi.BooleanSchema & {
            __isRequired: "T";
        };
        ptpTrackingDays: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        hyphenLoadReportPrefix: JoiX.XPrimitive<"LD"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpOutPath: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpHost: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpPort: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        hyphenSftpUser: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpPassword: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpPrivateKey: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenSftpInPath: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        hyphenAccountValidationUrl: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenAccountVerificationUserProfile: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hyphenKey: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
        sftp: JoiX.XAlternatives & Joi.AlternativesSchema & {
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
    };
} & {
    __isRequired: "T";
};
