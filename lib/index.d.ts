import * as configFactories from './config-factory';
export { configFactories as ConfigFactories };
import * as CFT from './config-factory/config-factory-types';
export { CFT as CFT };
import * as factories from './factories';
export { factories as Factories };
import * as Joi from 'Joi';
export { Joi as Joi };
import * as JoiX from './joi-x';
export { JoiX as JoiX };
import * as JoiV from './joi-x-validators';
export { JoiV as JoiV };
export { describe as describeConfigSchema, validateAsync as validatConfigSchemaAsync } from './config-factory/config';
export declare abstract class IConfigBundle {
    static newBundleAndResolveConfigAsync(settings: JoiX.XJSchemaMap | undefined, configSchema: JoiX.XObjectSchema, requireConfig?: (file: string) => any): Promise<any>;
    abstract newBundleAndResolveConfigAsync(settings: JoiX.XJSchemaMap | undefined): Promise<IConfigFactoriesInstances>;
}
export interface IConfigFactoriesInstances {
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}
