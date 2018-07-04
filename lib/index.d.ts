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
import { IConfigFactory } from './config-factory';
export { JoiV as JoiV };
export { describe as describeConfigSchema, validateAsync as validatConfigSchemaAsync } from './config-factory/config';
export declare abstract class IConfigBundle {
    static newBundleAndResolveConfigAsync(settings: JoiX.XJSchemaMap | undefined, configSchema: JoiX.XObjectSchema, requireConfig?: (file: string) => any): Promise<any>;
    abstract newBundleAndResolveConfigAsync(settings: JoiX.XJSchemaMap | undefined): Promise<IConfigFactoriesInstances>;
}
export interface IConfigFactoriesInstances {
    startAsync(): Promise<void[]>;
    stopAsync(): Promise<void[]>;
}
export interface IConfigFactoriesInstancesResolver extends IConfigFactoriesInstances {
    startAsync(): Promise<void[]>;
    stopAsync(): Promise<void[]>;
}
export declare class FactoriesInstancesResolver<L extends JoiX.XObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>> implements IConfigFactoriesInstances {
    config: LF;
    private factoryInstances;
    constructor(config: LF, factoryInstances: (() => IConfigFactory)[]);
    startAsync(): Promise<void[]>;
    stopAsync(): Promise<void[]>;
}
export declare function LoadConfig<L extends JoiX.XObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>>(configSettings: any, configSchema: L, lazyLoad?: boolean, configOptional?: Error | null): Promise<FactoriesInstancesResolver<L, LF>>;
