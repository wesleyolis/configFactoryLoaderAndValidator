import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoInMemoryConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export declare function NewInstance(injectKey: string): MongoInMemoryConfigFactoryWithLegacy<JoiX.ExtractFromSchema<{
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & Joi.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
            __isRequired: "T";
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
}>>;
export declare class MongoInMemoryConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoInMemoryConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
