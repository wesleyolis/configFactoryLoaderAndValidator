import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';
import { IConfigFactoryDef } from '../../config-factory/config-factory-types';
import { IMongoSettings } from './amongodb-config-factory';
export declare const ConnectionStringConst: string;
export declare type ConfigSettingsTypes = {};
export declare class MongoInMemoryConfigFactory extends ABaseConfigFactory implements IMongoSettings {
    ConfigOptionsTypes: ConfigSettingsTypes;
    private port;
    private mongoServerInstance;
    create(options: IConfigFactoryDef): void;
    start(): Promise<any>;
    stop(): any;
    describe(): string;
    validate(): Error[];
    getConnectionString(): string;
}
