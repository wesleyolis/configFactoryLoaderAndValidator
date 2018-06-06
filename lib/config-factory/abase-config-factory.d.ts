import { ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import { ConfigSettings } from '../config-options/config-settings-types';
import * as JoiX from '../joi-x';
export declare abstract class ABaseConfigFactory implements IConfigFactory {
    FactoryClass: ConfigFactoryClass;
    Type: ConfigFactoryTypes;
    ConfigSettings: ConfigSettings;
    abstract configSchema: JoiX.Schema;
    abstract ConfigFactoryName: string;
    private _created;
    FactoryName(): string;
    create(settings: IConfigFactoryDef): Promise<void>;
    start(): Promise<void>;
    stopAsync(): Promise<void>;
    validateAsync(configSettings?: ConfigSettings): Promise<JoiX.ValidationErrorItem[]>;
    describe(): string;
}
