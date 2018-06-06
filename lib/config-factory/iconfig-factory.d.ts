import * as CFT from './config-factory-types';
import * as JoiX from '../joi-x';
import { ConfigSettings } from '../config-options/config-settings-types';
export declare function CreateConfigFactoryInstance<A extends IConfigFactory>(ctor: new () => A): A;
export interface IConfigFactoryConstructor<T extends IConfigFactory> {
    new (): T;
}
export interface IConfigFactory extends CFT.IConfigFactoryDef {
    ConfigFactoryName: String;
    FactoryClass: CFT.ConfigFactoryClass;
    Type: CFT.ConfigFactoryTypes;
    create(config: CFT.IConfigFactoryDef): Promise<void>;
    start(): Promise<void>;
    stopAsync(): Promise<void>;
    validateAsync(configSettings: ConfigSettings): Promise<JoiX.ValidationErrorItem[]>;
    describe(): string;
}
