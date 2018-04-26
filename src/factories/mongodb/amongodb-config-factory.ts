import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';

export interface MongoSettings extends ABaseConfigFactory
{
    getConnectionString : () => string;
}