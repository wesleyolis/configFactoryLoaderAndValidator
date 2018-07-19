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
    readonly abstract configSchema: JoiX.XAnyObjectSchema;
    abstract configSettings?: JoiX.XTSchema;
    protected _created: boolean;
    createFactoryAsync<T extends ({
        factory: string;
    } & JoiX.XTSchema)>(settings: T): Promise<void>;
    createAsync(config: JoiX.XJSchemaMap): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
}
