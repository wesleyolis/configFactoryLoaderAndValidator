import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';

export interface IMongoSettings extends ABaseConfigFactory
{
    getConnectionString : () => string;
}