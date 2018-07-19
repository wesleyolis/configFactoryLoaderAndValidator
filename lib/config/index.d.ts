import { ConfigSchema, configSchema } from './global';
import { LoadedConfig } from '../index';
export { ConfigSchema as ConfigSchema };
export declare function configAsync(): Promise<LoadedConfig<typeof configSchema>>;
