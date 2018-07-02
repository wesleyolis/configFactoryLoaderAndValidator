/// <reference types="node" />
import * as Joi from 'joi';
import { If, ObjectHasKey } from 'typelevel-ts';
export * from 'joi';
export interface XBase {
    required: () => this & {
        __isRequired: 'T';
    };
    allow: (allow: null) => this & {
        __isNullable: 'T';
    };
}
export interface XPrimitive<T> extends XBase {
    __tsType: T;
}
export declare type HasKey = {
    __tsType: any;
    __factoryType?: any;
};
export interface XObject extends XBase {
    pattern<S extends XSchema>(regex: RegExp, schema: S): this & {
        __tsTypeOP: S;
    };
    keys<T extends XSchemaMap>(keys: T): this & {
        __tsTypeO: T;
    };
    keys(schema?: Joi.SchemaMap): this & {
        __tsTypeO: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.';
    };
}
export interface XArray extends XBase {
    items<T extends XSchema>(items: T): this & {
        __tsTypeAr: T;
    };
    items(...types: Joi.SchemaLike[]): this & {
        __tsTypeAr: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
    items(types: Joi.SchemaLike[]): this & {
        __tsTypeAr: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
}
export interface XAlternatives extends XBase {
    try<T extends XSchema>(types: T[]): this & {
        __tsTypeAl: T;
    };
}
export declare type XFactory<T> = XAlternativesSchema & {
    __factoryType: T;
};
export declare type ObjectChildren = {
    key: string;
    schema: Joi.AnySchema;
};
export declare type ObjectSchemaHidden = Joi.ObjectSchema & {
    _inner: {
        children: ObjectChildren[];
    };
};
export declare type XAnySchema = XPrimitive<any> & Joi.AnySchema;
export declare type XBooleanSchema<T extends boolean = boolean> = XPrimitive<boolean> & Joi.BooleanSchema;
export declare type XNumberSchema<T extends number = number> = XPrimitive<T> & Joi.NumberSchema;
export declare type XStringSchema<T extends string = string> = XPrimitive<T> & Joi.StringSchema;
export declare type XDateSchema = XPrimitive<number | Date | string> & Joi.DateSchema;
export declare type XBinarySchema = XPrimitive<Buffer | string> & Joi.BinarySchema;
export declare type XFunctionSchema = XPrimitive<Function> & Joi.FunctionSchema;
export declare type XDateSchemaUTC = XPrimitive<number> & Joi.DateSchema;
export declare type XDateSchemaSString = XPrimitive<string> & Joi.DateSchema;
export declare type XArraySchema = XArray & Joi.ArraySchema;
export declare type XObjectSchema = XObject & Joi.ObjectSchema;
export declare type XAlternativesSchema = XAlternatives & Joi.AlternativesSchema;
export declare type XKindSchema<T extends string> = XStringSchema<T>;
export declare type XObjectBundleSchema = XObject & Joi.ObjectSchema & {
    __bundleName: 'T';
};
export declare const any: () => XAnySchema;
export declare const bool: () => XBooleanSchema<T>;
export declare const boolean: () => XBooleanSchema<T>;
export declare const number: () => XNumberSchema<number>;
export declare const string: () => XStringSchema<string>;
export declare const date: () => XDateSchema;
export declare const binary: () => XBinarySchema;
export declare const func: () => XFunctionSchema;
export declare const object: () => XObjectSchema;
export declare const array: () => XArraySchema;
export declare const alternatives: () => XAlternativesSchema;
export declare const kind: <T extends string>(value: T) => XPrimitive<T> & Joi.StringSchema & {
    __isRequired: "T";
};
export declare const LiteralString: <T extends string>(value: T[]) => XStringSchema<T>;
export declare const LiteralNumber: <T extends number>(value: T[]) => XNumberSchema<T>;
export declare const LiteralBoolean: <T extends boolean>(value: T[]) => XBooleanSchema<T>;
export declare const enumString: <T extends string>(values: T[]) => XStringSchema<T>;
export declare enum FactoryType {
    issolated = 0,
    dependent = 1,
    manual = 2,
}
export declare const Factory: <FInteface>(type: FactoryType) => XFactory<FInteface>;
export declare const objectBundle: (unqiueBundleName: string) => XObjectBundleSchema;
export declare function getXObjectChildrens(obj: XObjectSchema): ObjectChildren[] | undefined;
export declare function getXObjectChildren(obj: Joi.ObjectSchema): ObjectChildren[] | undefined;
export declare function isChildrenAnArray(children: ObjectChildren[] | (ObjectChildren | undefined)): children is ObjectChildren[];
export declare function isXObjectAndHasChildren(obj: Joi.AnySchema): obj is ObjectSchemaHidden;
export declare type acc = any;
export declare function OperateOnXObjectKeys(children: any, operate: (key: string, schema: Joi.AnySchema, acc: acc) => void, newObject: (key: string, acc: acc) => any, acc: acc): void;
export declare function isJoiError(err: any): err is Joi.ValidationError;
export declare type IXSchema = _XSchema | IXSchemaMap;
export interface IXSchemaMap {
    [key: string]: IXSchema;
}
export interface XJSchemaMap {
}
export interface XSchemaMap {
    [key: string]: XSchema;
}
export interface XTSchema extends XJSchemaMap {
}
export declare type XSchema = _XSchema | XSchemaMap;
export declare type _XSchema = (XAnySchema | XArraySchema | XAlternativesSchema | XBinarySchema | XBooleanSchema | XDateSchema | XFunctionSchema | XNumberSchema | XObjectSchema | XStringSchema | XFactory<any>);
export declare type ExtractRequired<S, T> = If<ObjectHasKey<S, '__isRequired'>, T, T | undefined>;
export declare type ExtractNull<S, T> = If<ObjectHasKey<S, '__isNullable'>, T | null, T>;
export declare type ExtractTSType<T extends HasKey, F> = If<ObjectHasKey<T, '__tsType'>, T['__tsType'], F>;
export declare type ExtractFactory<S extends HasKey, T> = If<ObjectHasKey<S, '__factoryType'>, S['__factoryType'], undefined>;
export declare type ExtractPrimative<T> = T extends XPrimitive<any> ? ExtractRequired<T, ExtractNull<T, ExtractTSType<T, T>>> : 'Unkown Type' & T;
export declare type ExtractFromSchema<T extends XSchema> = _ExtractFromSchema<T> & XTSchema;
export declare type ExtractFromObject<T extends XSchemaMap> = _ExtractFromObject<T> & XTSchema;
export declare type _ExtractFromSchema<T> = _ExtractFromObject<{
    __tsTypeO: T;
}>['__tsTypeO'];
export declare type _ExtractFromObject<T> = {
    [P in keyof T]: T[P] extends {
        __tsType: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> : T[P] extends {
        __tsTypeAr: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAr']>>[] : T[P] extends {
        __tsTypeO: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeO']>> : T[P] extends {
        __tsTypeOP: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], Record<string, _ExtractFromObject<T[P]>['__tsTypeOP']>>> : T[P] extends {
        __tsTypeAl: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAl']>> : T[P] extends {} ? _ExtractFromObject<T[P]> : never;
};
export declare type ExtractWithFactoriesFromSchema<T extends XSchema> = _ExtractWithFactoriesFromSchema<T> & XTSchema;
export declare type ExtractWithFactoriesFromObject<T extends XSchemaMap> = _ExtractWithFactoriesFromObject<T> & XTSchema;
export declare type _ExtractWithFactoriesFromSchema<T> = _ExtractFromObject<{
    __tsTypeO: T;
}>['__tsTypeO'];
export declare type _ExtractWithFactoriesFromObject<T> = {
    [P in keyof T]: T[P] extends {
        __factoryType: any;
    } ? T[P]['__factoryType'] : T[P] extends {
        __tsType: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> : T[P] extends {
        __tsTypeAr: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAr']>>[] : T[P] extends {
        __tsTypeO: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeO']>> : T[P] extends {
        __tsTypeOP: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], Record<string, _ExtractFromObject<T[P]>['__tsTypeOP']>>> : T[P] extends {
        __tsTypeAl: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAl']>> : T[P] extends {} ? _ExtractFromObject<T[P]> : never;
};
export declare type _ExtractFactoriesFromSchema<T> = _ExtractFromObject<{
    __tsTypeO: T;
}>['__tsTypeO'];
export declare type _ExtractFactoriesFromObject<T> = {
    [P in keyof T]: T[P] extends {
        __factoryType: any;
    } ? T[P]['__factoryType'] : T[P] extends {
        __tsType: any;
    } ? never : T[P] extends {
        __tsTypeAr: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAr']>>[] : T[P] extends {
        __tsTypeO: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeO']>> : T[P] extends {
        __tsTypeOP: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], Record<string, _ExtractFromObject<T[P]>['__tsTypeOP']>>> : T[P] extends {
        __tsTypeAl: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAl']>> : T[P] extends {} ? _ExtractFromObject<T[P]> : never;
};
