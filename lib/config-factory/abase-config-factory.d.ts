import { ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import { ConfigSettings } from '../config-options/config-settings-types';
import * as JoiX from '../joi-x';
export declare enum ErrorFactory {
    NotCreated = "FactoryNotCreated",
}
export declare abstract class ABaseConfigFactory implements IConfigFactory {
    readonly abstract configFactoryName: string;
    factoryClass: ConfigFactoryClass;
    type: ConfigFactoryTypes;
    abstract configSettings?: JoiX.JoiXSchemaTypes;
    readonly abstract configSchema: JoiX.Schema;
    private _created;
    factoryName(): string;
    createAsync(settings: IConfigFactoryDef): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    validateAsync(configSettings: ConfigSettings): Promise<JoiX.ValidationErrorItem[]>;
    describe(): string;
}
