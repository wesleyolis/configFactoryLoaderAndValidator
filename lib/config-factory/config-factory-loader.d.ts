import { ConfigSettings } from '../config-options/config-settings-types';
import { IConfigFactory } from './iconfig-factory';
export declare class ErrorNoFactoryConfigFound extends Error {
    constructor();
}
export declare class ErrorAmbiguousFactoryConfig extends Error {
    constructor();
}
export declare class ConfigFactoryLoader {
    static fromConfigGetJson<T extends IConfigFactory>(config: ConfigSettings): T;
}
