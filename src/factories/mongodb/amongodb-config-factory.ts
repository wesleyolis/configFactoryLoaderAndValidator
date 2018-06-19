import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';

export interface IMongoSettings
{
    getConnectionString : () => string;
}