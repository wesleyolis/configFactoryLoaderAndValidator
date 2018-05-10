import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';
import { IConfigFactoryDef } from '../../config-factory/config-factory-types';
import { IMongoSettings } from './amongodb-config-factory';
export declare type ConfigOptionsTypes = {
    type?: (string | 'mongodb');
    hosts: {
        hostname: string;
        port: number;
    }[];
    database: string;
    options: {
        replicaSet: string;
    };
};
export declare class MongoDBConfigFactory extends ABaseConfigFactory implements IMongoSettings {
    create(conf: IConfigFactoryDef): Promise<this>;
    start(): Promise<any>;
    stop(): Promise<any>;
    describe(): string;
    validate(): void;
    getConnectionString(): string;
    private makeMongoDBConnString(settings);
}
