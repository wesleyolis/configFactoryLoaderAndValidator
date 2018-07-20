import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoInMemoryConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as Joi from 'joi';
export declare function NewInstance(injectKey: string): MongoInMemoryConfigFactoryWithLegacy<CS.ExtractFromSchema<CS.XObject<{
    class: CS.XPrimitive<CFT.ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    type: CS.XPrimitive<CFT.ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
    port: CS.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
}, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
export declare class MongoInMemoryConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoInMemoryConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
