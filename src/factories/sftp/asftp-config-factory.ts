import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';
import * as Ssh2 from 'ssh2';

export {Ssh2}

export interface ISftpSettings extends ABaseConfigFactory
{
    getClient : () => Ssh2.Client;
}