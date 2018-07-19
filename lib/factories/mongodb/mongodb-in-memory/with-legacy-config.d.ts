import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoInMemoryConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export declare function NewInstance(injectKey: string): MongoInMemoryConfigFactoryWithLegacy<JoiX.ExtractFromSchema<JoiX.XObject<{
    class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
export declare class MongoInMemoryConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoInMemoryConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
