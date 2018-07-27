import * as CS from './config-schema';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import * as Joi from 'joi';
import * as JoiX from '../../../joi-x';
import * as JoiV from '../../../joi-x-validators';
import { SftpClient } from '../client/index';
import * as Ssh2 from 'ssh2';
export { Ssh2 };
export { CS };
export declare class SftpInMemoryClientWrapper<T extends CS.ConfigSchema> extends SftpClient<T> {
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
    } & {
        class: JoiX.XPrimitive<ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema;
    private server?;
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
    } & {
        class: JoiX.XPrimitive<ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(config: JoiX.XJSchemaMap): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}
