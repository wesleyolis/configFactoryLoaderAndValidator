import * as JoiX from '../../../joi-x';
import * as CS from './config-schema';
import { ABaseConfigFactory } from '.././../../../src/config-factory/abase-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { ISftpSettings, ILegacyConfig } from '../isftp-config-factory';
import { Joi, JoiV } from '../../../index';
export { CS as CS };
export declare class SftpClient<T extends CS.ConfigSchema> extends ABaseConfigFactory implements ISftpSettings {
    configSettings: T;
    factoryName: string;
    factoryClass: ConfigFactoryClass;
    type: ConfigFactoryTypes;
    configSchema: JoiX.XObject<{
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
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    static NewInstance(): SftpClient<JoiX.ExtractFromSchema<JoiX.XObject<{
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
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(config: JoiX.XJSchemaMap): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getLegacyConfig(): ILegacyConfig;
}
