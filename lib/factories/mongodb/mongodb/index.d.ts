import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { IMongoSettings } from './../amongodb-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import * as CS from './configSchema';
import * as JoiX from '../../../joi-x';
export { CS as CS };
export declare class MongoDBConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            class: JoiX.XPrimitive<ConfigFactoryClass.netService> & JoiX.StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<ConfigFactoryTypes.production> & JoiX.StringSchema & {
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
    };
    static NewInstance(): MongoDBConfigFactory<JoiX.ExtractFromSchema<JoiX.XObject & JoiX.ObjectSchema & {
        __tsTypeO: {
            class: JoiX.XPrimitive<ConfigFactoryClass.netService> & JoiX.StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<ConfigFactoryTypes.production> & JoiX.StringSchema & {
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
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getConnectionString(): string;
    private makeMongoDBConnString(settings);
}
