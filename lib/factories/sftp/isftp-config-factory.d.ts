import { ABaseConfigFactory } from '../../config-factory/abase-config-factory';
import * as Ssh2 from 'ssh2';
export { Ssh2 };
export interface ILegacyConfig {
    host: string;
    port: number;
    username: string;
    password: string | null;
    phrase: string | null;
    privateKey: string | null;
}
export interface ISftpSettings extends ABaseConfigFactory {
    getLegacyConfig: () => ILegacyConfig;
}
