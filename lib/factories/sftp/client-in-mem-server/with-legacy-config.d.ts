import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { SftpInMemoryClientWrapper, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import * as JoiV from '../../../joi-x-validators';
export declare function NewInstance(injectKey: string): SftpInMemoryClientWrapper<JoiX.ExtractFromSchema<JoiX.XObject<{
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
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
export declare class SftpInMemoryClientWrapperWithLegacy<T extends CS.ConfigSchema> extends SftpInMemoryClientWrapper<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
