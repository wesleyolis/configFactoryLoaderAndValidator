export type InjectConfig = (rawConfig : any) => void;

export interface ILegacyConfig
{
    injectConfig : InjectConfig
}