import { ConfigOptions } from '../config-options/config-types';

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

export type JsonOptions = { [index : string] : object | string | number};

export interface IConfigFactoryDef 
{
    FactoryClass: ConfigFactoryClass,
    Type: ConfigFactoryTypes,
    Options: ConfigOptions
}

export interface IConfigFactoryRes extends IConfigFactoryDef {
    Resouce: string,
}

