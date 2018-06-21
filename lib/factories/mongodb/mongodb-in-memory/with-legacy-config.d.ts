import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoInMemoryConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
export declare function NewInstance(injectKey: string): MongoInMemoryConfigFactoryWithLegacy<CS.ExtractFromSchema<CS.XObject & CS.ObjectSchema & {
    __tsTypeO: {
        class: CS.XPrimitive<CFT.ConfigFactoryClass.service> & CS.StringSchema & {
            __isRequired: "T";
        };
        type: CS.XPrimitive<CFT.ConfigFactoryTypes.mock> & CS.StringSchema & {
            __isRequired: "T";
        };
        port: CS.XPrimitive<number> & CS.NumberSchema & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
}>>;
export declare class MongoInMemoryConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoInMemoryConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
