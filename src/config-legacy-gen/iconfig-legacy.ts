import { IConfigBundle } from "..";
import { injectConfig } from "./inject-legacy-config";
import { IConfigFactory } from "../joi-x";

export type InjectConfig = (rawConfig : any) => void;

export interface ILegacyConfig
{
    injectConfig : InjectConfig
}

export function IsLegacyConfig(config : any) : config is IConfigFactory
{
    return injectConfig !== undefined;
}