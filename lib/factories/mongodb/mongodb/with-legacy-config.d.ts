import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoDBConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
export declare function NewInstance(injectKey: string): MongoDBConfigFactoryWithLegacy<JoiX.ExtractFromSchema<JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        provider: JoiX.XPrimitive<"mongodb"> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        hosts: JoiX.XArray & JoiX.ArraySchema & {
            __tsTypeAr: JoiX.XObject & JoiX.ObjectSchema & any & {
                __isRequired: "T";
            };
        } & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & JoiX.ObjectSchema & any;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject & JoiX.ObjectSchema & {
            __tsTypeOP: JoiX.XPrimitive<string> & JoiX.StringSchema & {
                __isRequired: "T";
            };
        };
    };
} & {
    __isRequired: "T";
}>>;
export declare class MongoDBConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoDBConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
