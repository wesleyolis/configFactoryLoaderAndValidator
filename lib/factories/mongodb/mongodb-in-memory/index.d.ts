import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { IConfigFactoryDef, ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { IMongoSettings } from '.././amongodb-config-factory';
import * as CS from './configSchema';
export declare class MongoInMemoryConfigFactory extends ABaseConfigFactory implements IMongoSettings {
    configFactoryName: string;
    factoryClass: ConfigFactoryClass;
    type: ConfigFactoryTypes;
    configSchema: typeof CS.configSchema;
    readonly configSettings?: CS.ConfigSchema;
    private mongoServerInstance;
    createAsync(options: IConfigFactoryDef): Promise<void>;
    startAsync(): Promise<any>;
    stopAsync(): any;
    describe(): string;
    validate(): Error[];
    getConnectionString(): string;
}
