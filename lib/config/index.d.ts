import { ConfigSchema, configSchema } from './global';
import { LoadedConfig } from '../index';
export { ConfigSchema };
export declare function configAsync(): Promise<LoadedConfig<typeof configSchema>>;
