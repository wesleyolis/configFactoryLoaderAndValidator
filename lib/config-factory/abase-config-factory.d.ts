import { ConfigFactoryClass, ConfigFactoryTypes } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import * as JoiX from '../joi-x';
import { Config } from './config';
export declare enum ErrorFactory {
    NotCreated = "FactoryNotCreated",
}
export declare abstract class ABaseConfigFactory extends Config implements IConfigFactory {
    abstract factoryName: string;
    abstract factoryClass: ConfigFactoryClass;
    abstract type: ConfigFactoryTypes;
    readonly abstract configSchema: JoiX.XObjectSchema;
    abstract configSettings?: JoiX.XTSchema;
    private _created;
    createAsync(config: JoiX.XJSchemaMap): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}
