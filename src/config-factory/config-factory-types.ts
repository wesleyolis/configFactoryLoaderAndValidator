import {ConfigSettings} from '../config-options/config-settings-types'
import { JoiXSchemaTypes } from '../joi-x';

export enum ConfigFactoryClass {
    Factory = 0,
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

export const ConfigFactoryTypesPrefixStr : {[prefix : number] : string} = [{key: ConfigFactoryTypes.Vanilla, value : ""},
{key: ConfigFactoryTypes.Mock, value : "Mock"}
].reduce((acc : {[index:number]: string}, item) => acc[item.key] = item.value, {});

export const ConfigFactoryTypesPrefixKeys : string [] = Object.keys(ConfigFactoryTypesPrefix);

export const ConfigFactoryClassStem : {[prefix : string] : ConfigFactoryClass} = {
    "Factory" : ConfigFactoryClass.Factory,
    "Module" : ConfigFactoryClass.Module,
    "Service" : ConfigFactoryClass.Service
}

export const ConfigFactoryClassStemKeys : string [] = Object.keys(ConfigFactoryClassStem);

export const ConfigFactoryClassStemStr : {[prefix : number] : string} = [{key: ConfigFactoryClass.Factory, value : "Factory"},
{key: ConfigFactoryClass.Module, value : "Module"},
{key: ConfigFactoryClass.Service, value : "Service"}
]
.reduce((acc : {[index:number]: string}, item) => acc[item.key] = item.value, {});

export interface IConfigFactoryDef 
{
    factoryClass: ConfigFactoryClass,
    type: ConfigFactoryTypes,
    configSettings?: JoiXSchemaTypes,
}

export interface IConfigFactoryRes extends IConfigFactoryDef {
    Resouce: string,
}

