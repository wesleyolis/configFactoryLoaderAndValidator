import { JoiXSchemaTypes } from '../joi-x';
export declare enum ConfigFactoryClass {
    Factory = 0,
    Module = 1,
    Service = 2,
}
export declare enum ConfigFactoryTypes {
    Vanilla = 0,
    Mock = 1,
}
export declare const ConfigFactoryTypesPrefix: {
    [prefix: string]: ConfigFactoryTypes;
};
export declare const ConfigFactoryTypesPrefixStr: {
    [prefix: number]: string;
};
export declare const ConfigFactoryTypesPrefixKeys: string[];
export declare const ConfigFactoryClassStem: {
    [prefix: string]: ConfigFactoryClass;
};
export declare const ConfigFactoryClassStemKeys: string[];
export declare const ConfigFactoryClassStemStr: {
    [prefix: number]: string;
};
export interface IConfigFactoryDef {
    factoryClass: ConfigFactoryClass;
    type: ConfigFactoryTypes;
    configSettings?: JoiXSchemaTypes;
}
export interface IConfigFactoryRes extends IConfigFactoryDef {
    resouce: string;
}
