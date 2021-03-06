import { Promisify, PromisifyReturn } from './util/bluebird-promisify';
export { Promisify as BluebirdPromisify, PromisifyReturn };
import * as CFT from './config-factory/config-factory-types';
export { CFT as CFT };
import * as factories from './factories';
export { factories as Factories };
export { IMongoSettings, ISftpSettings } from './factories';
import * as Joi from 'joi';
export { Joi as Joi };
import * as JoiX from './joi-x';
export { JoiX as JoiX };
import * as JoiV from './joi-x-validators';
import { IConfigFactory } from './config-factory';
export { JoiV as JoiV };
export { describe as describeConfigSchema, validateAsync as validatConfigSchemaAsync } from './config-factory/config';
export { configAsync, ConfigSchema, loadConfig } from './config/index';
export declare function requiredConfig(file: string): any;
export declare abstract class IConfigBundle {
    static newBundleAndResolveConfigAsync(settings: number | JoiX.XJSchemaMap | undefined, configSchema: JoiX.XAnyObjectSchema, requireConfig?: (file: string) => any): Promise<any>;
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
    settings: LF;
    private factoryInstances;
    constructor(settings: LF, factoryInstances: (() => Promise<IConfigFactory>)[]);
    startAsync(): Promise<void[]>;
    stopAsync(): Promise<void[]>;
}
export declare class LoadConfigErrors {
    static readonly configurationMissing: string;
    static readonly failedToNewFactory: string;
}
export declare type AccSchemaTypes = JoiX.SchemaTypes<'accumulator'>;
export interface AccBase<T extends Joi.AnySchema | undefined> {
    kind: AccSchemaTypes;
    newContainerObject: () => T;
}
export interface ChildObjectAcc extends AccBase<Joi.ObjectSchema> {
    kind: 'object';
    keys: Record<string, Joi.AnySchema>;
}
export interface ChildArrayAcc extends AccBase<Joi.ArraySchema> {
    kind: 'array';
    items: Joi.AnySchema[];
}
export interface ChildAlterAcc extends AccBase<Joi.AlternativesSchema> {
    kind: 'alter';
    matches: Joi.AnySchema[];
}
export interface Accumulator extends Joi.AnySchema, AccBase<undefined> {
    kind: 'accumulator';
    accumulator: Joi.AnySchema | null;
}
export declare type LoadedConfig<L extends JoiX.XAnyObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>> = FactoriesInstancesResolver<L, LF>;
export declare function genericLoadConfig<L extends JoiX.XAnyObjectSchema, LF = JoiX.ExtractWithFactoriesFromSchema<L>>(configSettings: any, configSchema: L, lazyLoad?: boolean, configOptional?: boolean, skipValidation?: boolean): Promise<FactoriesInstancesResolver<L, LF>>;
