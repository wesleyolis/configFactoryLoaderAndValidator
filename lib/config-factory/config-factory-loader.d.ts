import { ConfigSettings } from '../config-options/config-settings-types';
import { IConfigFactory } from './iconfig-factory';
export declare class ConfigFactoryLoader {
    static fromConfigGetJson<T extends IConfigFactory>(config: ConfigSettings): T;
}
