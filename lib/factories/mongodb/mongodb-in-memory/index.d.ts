import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { IMongoSettings } from '.././amongodb-config-factory';
import * as CS from './configSchema';
export { CS as CS };
export declare class MongoInMemoryConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    readonly configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: typeof CS.configSchema;
    private connectionHost?;
    private connectionPort?;
    private mongoServerInstance;
    static NewInstance(): MongoInMemoryConfigFactory<CS.ExtractFromSchema<CS.XObject & CS.ObjectSchema & {
        __tsTypeO: {
            class: CS.XPrimitive<ConfigFactoryClass.service> & CS.StringSchema & {
                __isRequired: "T";
            };
            type: CS.XPrimitive<ConfigFactoryTypes.mock> & CS.StringSchema & {
                __isRequired: "T";
            };
            port: CS.XPrimitive<number> & CS.NumberSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    }>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<any>;
    stopAsync(): Promise<any>;
    getConnectionString(): string;
}
