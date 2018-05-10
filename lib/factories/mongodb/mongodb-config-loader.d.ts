import { ConfigSettings } from '../../config-options/config-settings-types';
import { IMongoSettings } from './amongodb-config-factory';
export declare class MongoDbConfigFactoryLoader {
    static fromJsonConfig(configSettings: ConfigSettings): IMongoSettings;
}
