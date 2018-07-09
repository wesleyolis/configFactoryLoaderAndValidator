/// <reference types="node" />
import * as Joi from 'joi';
import { If, ObjectHasKey } from 'typelevel-ts';
import { JoiX } from '.';
import { IConfigFactory } from './config-factory';
export * from 'joi';
export { IConfigFactory };
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
export declare type ArraySchemaHidden = Joi.ArraySchema & {
    _inner: {
        items: Joi.AnySchema[];
    };
};
export declare type AlternativesSchemaHidden = Joi.AlternativesSchema & {
    _inner: {
        matches: {
            schema: Joi.AnySchema;
        }[];
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
export declare const any: () => JoiX.XAnySchema;
export declare const bool: () => JoiX.XBooleanSchema<T>;
export declare const boolean: () => JoiX.XBooleanSchema<T>;
export declare const number: () => JoiX.XNumberSchema<number>;
export declare const string: () => JoiX.XStringSchema<string>;
export declare const date: () => JoiX.XDateSchema;
export declare const binary: () => JoiX.XBinarySchema;
export declare const func: () => JoiX.XFunctionSchema;
export declare const object: () => JoiX.XObjectSchema;
export declare const array: () => JoiX.XArraySchema;
export declare const alternatives: () => JoiX.XAlternativesSchema;
export declare const kind: <T extends string>(value: T) => JoiX.XPrimitive<T> & Joi.StringSchema & {
    __isRequired: "T";
};
export declare const LiteralString: <T extends string>(value: T[]) => JoiX.XStringSchema<T>;
export declare const LiteralNumber: <T extends number>(value: T[]) => JoiX.XNumberSchema<T>;
export declare const LiteralBoolean: <T extends boolean>(value: T[]) => JoiX.XBooleanSchema<T>;
export declare const enumString: <T extends string>(values: T[]) => JoiX.XStringSchema<T>;
export declare const findFactory: (x: any) => JoiX.FactoryMeta | undefined;
export declare enum FactoryType {
    issolated = 1,
    dependent = 2,
    manual = 3,
}
export declare type FactoryMeta = {
    __factoryType: FactoryType;
    __newFactory: <T extends ({
        factory: string;
    } & JoiX.XTSchema)>(settings: T) => IConfigFactory;
};
export declare type FactoryMetaContainer = {
    __factory: FactoryMeta;
};
export declare type XFactoryMeta = {
    _meta: (FactoryMetaContainer)[];
    meta: (meta: FactoryMetaContainer) => XFactoryMeta;
};
export declare const Factory: <FInteface>(type: JoiX.FactoryType, newFactory: (settings: any) => JoiX.IConfigFactory) => JoiX.XFactory<FInteface>;
export declare type XBundle = (XObjectBundleSchema & {
    unqiueBundleName: string;
});
export declare function isObjectBundle(x: XObjectBundleSchema): x is XBundle;
export declare const objectBundle: (unqiueBundleName: string) => JoiX.XObjectBundleSchema;
export declare function getXObjectChildrens(obj: XObjectSchema): ObjectChildren[] | undefined;
export declare function getXObjectChildren(obj: Joi.ObjectSchema): ObjectChildren[] | undefined;
export declare function isChildrenAnArray(children: ObjectChildren[] | (ObjectChildren | undefined)): children is ObjectChildren[];
export declare function isXObjectAndHasChildren(obj: Joi.AnySchema): obj is ObjectSchemaHidden;
export declare type ConfigValue = any;
export declare type Config = Record<string, ConfigValue> | undefined;
export declare function OperateOnXObjectKeys<ACC>(children: ObjectChildren[] | (ObjectChildren | undefined), operate: (key: string, schema: Joi.AnySchema, acc: ACC, configValue: ConfigValue) => Promise<void>, initAcc: (key: string, schema: Joi.AnySchema, acc: ACC) => ACC, updateParentAcc: (key: string, parentAcc: ACC, acc: ACC) => ACC, acc: ACC, config?: Config): Promise<void>;
export declare function isXArrayHasChildren(schema: Joi.AnySchema): schema is ArraySchemaHidden;
export declare function isXAlternativesHasChildren(schema: Joi.AnySchema): schema is AlternativesSchemaHidden;
export declare type ArrayHiddenAcc = _ArrayHiddenAcc & Joi.Schema;
export interface _ArrayHiddenAcc {
    __acc: Joi.AnySchema[];
}
export interface AccBase<T extends Joi.AnySchema | undefined> {
    newContainerObject: () => T;
}
export interface ChildObjectAcc extends AccBase<Joi.ObjectSchema> {
    kind: 'object';
    keys: Record<string, Joi.AnySchema>;
}
export interface ChildArrayAcc extends AccBase<Joi.ArraySchema> {
    kind: 'array';
    items: Joi.AnySchema[];
}
export interface ChildAlterAcc extends AccBase<Joi.AlternativesSchema> {
    kind: 'alter';
    matches: Joi.AnySchema[];
}
export interface UndefinedAcc extends Joi.AnySchema, AccBase<undefined> {
    kind: 'undefined';
}
export declare type OperateOnJoiSchemaAcc = ChildObjectAcc | ChildArrayAcc | ChildAlterAcc | UndefinedAcc;
export declare function OperateOnJoiSchema<ACC>(object: Joi.AnySchema, operate: (schema: Joi.AnySchema, acc: ACC, key: string | undefined, configValue: ConfigValue) => Promise<void>, initAcc: (schema: Joi.AnySchema) => ACC, updateParentAcc: (key: string | undefined, schema: Joi.AnySchema, parentAcc: ACC, acc: ACC) => ACC, acc: ACC, key?: string | undefined, config?: Config): Promise<ACC>;
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
export declare type _ExtractWithFactoriesFromSchema<T> = _ExtractWithFactoriesFromObject<{
    __tsTypeO: T;
}>['__tsTypeO'];
export declare type _ExtractWithFactoriesFromObject<T> = {
    [P in keyof T]: T[P] extends {
        __factoryType: any;
    } ? Promise<T[P]['__factoryType']> : T[P] extends {
        __tsType: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> : T[P] extends {
        __tsTypeAr: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractWithFactoriesFromObject<T[P]>['__tsTypeAr']>>[] : T[P] extends {
        __tsTypeO: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractWithFactoriesFromObject<T[P]>['__tsTypeO']>> : T[P] extends {
        __tsTypeOP: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], Record<string, _ExtractWithFactoriesFromObject<T[P]>['__tsTypeOP']>>> : T[P] extends {
        __tsTypeAl: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractWithFactoriesFromObject<T[P]>['__tsTypeAl']>> : T[P] extends {} ? _ExtractWithFactoriesFromObject<T[P]> : never;
};
export declare type _ExtractFactoriesFromSchema<T> = _ExtractFactoriesFromObject<{
    __tsTypeO: T;
}>['__tsTypeO'];
export declare type _ExtractFactoriesFromObject<T> = {
    [P in keyof T]: T[P] extends {
        __factoryType: any;
    } ? T[P]['__factoryType'] : T[P] extends {
        __tsType: any;
    } ? never : T[P] extends {
        __tsTypeAr: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFactoriesFromObject<T[P]>['__tsTypeAr']>>[] : T[P] extends {
        __tsTypeO: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFactoriesFromObject<T[P]>['__tsTypeO']>> : T[P] extends {
        __tsTypeOP: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], Record<string, _ExtractFactoriesFromObject<T[P]>['__tsTypeOP']>>> : T[P] extends {
        __tsTypeAl: any;
    } ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFactoriesFromObject<T[P]>['__tsTypeAl']>> : T[P] extends {} ? _ExtractFactoriesFromObject<T[P]> : never;
};
