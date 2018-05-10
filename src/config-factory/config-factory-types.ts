import {ConfigSettings} from '../config-options/config-settings-types'
export enum ConfigFactoryClass {
    Factory,
    Module,
    Service
}

export enum ConfigFactoryTypes
{
    Vanilla,
    Mock
}

export const ConfigFactoryTypesPrefix : {[prefix : string] : ConfigFactoryTypes} = {
    "" : ConfigFactoryTypes.Vanilla,
    "Mock" : ConfigFactoryTypes.Mock
}

export const ConfigFactoryTypesPrefixKeys : string [] = Object.keys(ConfigFactoryTypesPrefix);

export const ConfigFactoryClassStem : {[prefix : string] : ConfigFactoryClass} = {
    "Factory" : ConfigFactoryClass.Factory,
    "Module" : ConfigFactoryClass.Module,
    "Service" : ConfigFactoryClass.Service
}

export const ConfigFactoryClassStemKeys : string [] = Object.keys(ConfigFactoryClassStem);

export interface IConfigFactoryDef 
{
    FactoryClass: ConfigFactoryClass,
    Type: ConfigFactoryTypes,
    ConfigSettings: ConfigSettings,
}

export interface IConfigFactoryRes extends IConfigFactoryDef {
    Resouce: string,
}

