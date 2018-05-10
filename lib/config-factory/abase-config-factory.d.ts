import { ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef } from './config-factory-types';
import { IConfigFactory } from './iconfig-factory';
import { ConfigSettings } from '../config-options/config-settings-types';
export declare abstract class ABaseConfigFactory implements IConfigFactory {
    FactoryClass: ConfigFactoryClass;
    Type: ConfigFactoryTypes;
    ConfigSettings: ConfigSettings;
    private _created;
    create(settings: IConfigFactoryDef): void;
    start(): void;
    stop(): void;
    abstract validate(): void;
    abstract describe(): string;
}
