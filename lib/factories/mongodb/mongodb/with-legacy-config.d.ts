import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { MongoDBConfigFactory, CS } from './index';
import * as CFT from '../../../config-factory/config-factory-types';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export declare function NewInstance(injectKey: string): MongoDBConfigFactoryWithLegacy<JoiX.ExtractFromSchema<{
    __tsType: JoiX._ExtractFromObject<{
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & Joi.StringSchema & {
            __isRequired: "T";
        };
        provider: JoiX.XPrimitive<"mongodb"> & Joi.StringSchema & {
            __isRequired: "T";
        };
        hosts: JoiX.XArray & Joi.ArraySchema & {
            __tsType: JoiX._ExtractFromObject<{
                hostname: JoiX.XPrimitive<string> & Joi.StringSchema & {
                    __isRequired: "T";
                };
                port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
                    __isRequired: "T";
                };
            }>[];
        } & {
            __isRequired: "T";
        };
        credentials: any & JoiX.XObject & Joi.ObjectSchema;
        database: JoiX.XStringSchema<string>;
        options: JoiX.XObject & Joi.ObjectSchema & {
            __tsType: Record<string, string>;
        };
    }>;
} & JoiX.XObject & Joi.ObjectSchema & {
    __isRequired: "T";
}>>;
export declare class MongoDBConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoDBConfigFactory<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
