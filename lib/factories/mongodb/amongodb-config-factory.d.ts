import { IConfigFactory } from '../../config-factory';
export interface IMongoSettings extends IConfigFactory {
    getConnectionString: () => string;
}
