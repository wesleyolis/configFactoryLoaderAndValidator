import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';
import { IConfigFactory } from '../../config-factory';

export interface IMongoSettings extends IConfigFactory
{
    getConnectionString : () => string;
}