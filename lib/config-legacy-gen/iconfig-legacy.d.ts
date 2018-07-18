import { IConfigFactory } from "../joi-x";
export declare type InjectConfig = (rawConfig: any) => void;
export interface ILegacyConfig {
    injectConfig: InjectConfig;
}
export declare function IsLegacyConfig(config: any): config is IConfigFactory;
