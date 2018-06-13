import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { IMongoSettings } from './../amongodb-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export { CS as CS };
export declare class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: JoiX.XObject & Joi.ObjectSchema & {
        __tsType: JoiX._ExtractFromObject<{
            class: JoiX.XPrimitive<ConfigFactoryClass.netService> & Joi.StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<ConfigFactoryTypes.production> & Joi.StringSchema & {
                __isRequired: "T";
            };
            provider: JoiX.XStringSchema<string>;
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
            credentials: JoiX.XObject & Joi.ObjectSchema & any & {
                __isRequired: "T";
            };
            database: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            options: JoiX.XObject & Joi.ObjectSchema & {
                __tsType: Record<string, string>;
            } & {
                __isRequired: "T";
            };
        }>;
    } & {
        __isRequired: "T";
    };
    static NewInstance(): MongoDBConfigFactory<JoiX.ExtractFromSchema<JoiX.XObject & Joi.ObjectSchema & {
        __tsType: JoiX._ExtractFromObject<{
            class: JoiX.XPrimitive<ConfigFactoryClass.netService> & Joi.StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<ConfigFactoryTypes.production> & Joi.StringSchema & {
                __isRequired: "T";
            };
            provider: JoiX.XStringSchema<string>;
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
            credentials: JoiX.XObject & Joi.ObjectSchema & any & {
                __isRequired: "T";
            };
            database: JoiX.XPrimitive<string> & Joi.StringSchema & {
                __isRequired: "T";
            };
            options: JoiX.XObject & Joi.ObjectSchema & {
                __tsType: Record<string, string>;
            } & {
                __isRequired: "T";
            };
        }>;
    } & {
        __isRequired: "T";
    }>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getConnectionString(): string;
    private makeMongoDBConnString(settings);
}
