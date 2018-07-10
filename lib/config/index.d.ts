import { configSchema } from './global';
import { LoadedConfig } from '../index';
export declare function configAsync(): Promise<LoadedConfig<typeof configSchema>>;
