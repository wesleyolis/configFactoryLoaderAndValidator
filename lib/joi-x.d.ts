/// <reference types="node" />
import { IConfigFactory } from './config-factory';
export { IConfigFactory as IConfigFactory };
import { ValidationErrorItem, validate, describe, AlternativesSchema } from 'joi';
export { ValidationErrorItem as ValidationErrorItem, validate as validate, describe as describe };
import * as Joi from 'joi';
import { If, StringEq } from 'typelevel-ts';
export declare type ID = 'T' | 'A' | 'P' | 'K' | 'L' | 'F';
export declare type InputForm = 'P' | 'W';
export declare type IsRequired = 'Required' | 'NotRequired';
export declare type IsNullable = 'Nullable' | 'NotNullable';
export interface X<T, R extends IsRequired, N extends IsNullable, I extends ID, F extends InputForm> {
    __tsType: T;
    __isRequired: R;
    __isNullable: N;
    __ID: I;
    __InputForm: F;
}
export declare type Merge<O1, O2> = O1 & O2;
export interface XPrimitive<T, J extends Joi.Schema, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'T', F extends InputForm = 'P'> extends X<T, R, N, I, F> {
    required: () => XPrimitive<T, J, 'Required', N, I, F> & J;
    allow: (allow: null) => XPrimitive<T, J, R, 'Nullable', I, F> & J;
}
export interface XObject<T = Record<string, any>, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'T', F extends InputForm = 'P'> extends X<T, R, N, I, F> {
    required: () => XObject<T, 'Required', N, I, F> & Joi.ObjectSchema;
    allow: (allow: null) => XObject<T, R, 'Nullable', I, F> & Joi.ObjectSchema;
    pattern<S extends JoiXSchema>(regex: RegExp, schema: S): XObject<{
        'w': S;
    }, R, N, 'P', 'W'> & Joi.ObjectSchema;
    keys<K extends Record<string, JoiXSchema>>(keys: K): XObject<If<StringEq<this['__ID'], 'K'>, this['__tsType'] & K, K>, R, N, 'K', 'P'> & Joi.ObjectSchema;
    pattern(...args: any[]): XObject<'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.', R, N, 'P', 'P'> & Joi.ObjectSchema;
    keys(...args: any[]): XObject<'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.', R, N, 'K', 'P'>;
}
export interface XArray<T = any[], R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'A', F extends InputForm = 'P'> extends X<T, R, N, I, F> {
    required: () => XArray<T, 'Required', N, I, F> & Joi.ArraySchema;
    allow: (allow: null) => XArray<T, R, 'Nullable', I, F> & Joi.ArraySchema;
    items<S extends JoiXSchema, B extends Record<string, S>>(items: B): XArray<B, R, N, I, 'P'> & Joi.ArraySchema;
    items<S extends JoiXSchema>(items: S): XArray<{
        'w': S;
    }, R, N, I, 'W'> & Joi.ArraySchema;
    items<S extends JoiXSchema>(items: S[]): XArray<{
        'w': S;
    }, R, N, I, 'W'> & Joi.ArraySchema;
    items(...args: any[]): XArray<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, 'P'> & Joi.ArraySchema;
}
export interface XAlternatives<T = undefined, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'L', F extends InputForm = 'P'> extends X<T, R, N, I, F> {
    required: () => XAlternatives<T, 'Required', N, I, F> & Joi.AlternativesSchema;
    allow: (allow: null) => XAlternatives<T, R, 'Nullable', I, F> & Joi.AlternativesSchema;
    try<A extends JoiXSchema>(types: A[]): XAlternatives<{
        w: A;
    }, R, N, I, 'W'> & Joi.AlternativesSchema;
    try(...args: any[]): X<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, F> & Joi.AlternativesSchema;
}
export interface XFactAlternatives<A = undefined, T = undefined, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'F', F extends InputForm = 'P'> extends X<T, R, N, I, F> {
    required: () => XFactAlternatives<A, T, 'Required', N, I, F> & XFactory<A> & Joi.AlternativesSchema;
    allow: (allow: null) => XFactAlternatives<A, T, R, 'Nullable', I, F> & XFactory<A> & Joi.AlternativesSchema;
    try<S extends JoiXSchema>(types: S[]): XFactAlternatives<A, {
        w: S;
    }, R, N, I, 'W'> & XFactory<A> & Joi.AlternativesSchema;
    try(...args: any[]): X<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, F> & Joi.AlternativesSchema;
}
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
export declare type XAnySchema = XPrimitive<any, Joi.AnySchema> & Joi.AnySchema;
export declare type XBooleanSchema = XPrimitive<boolean, Joi.BooleanSchema> & Joi.BooleanSchema;
export declare type XNumberSchema<T extends number = number> = XPrimitive<T, Joi.NumberSchema> & Joi.NumberSchema;
export declare type XStringSchema<T extends string = string> = XPrimitive<T, Joi.StringSchema> & Joi.StringSchema;
export declare type XEnumSchema<S> = XPrimitive<S, Joi.StringSchema> & Joi.StringSchema;
export declare type XDateSchema = XPrimitive<number | Date | string, Joi.DateSchema> & Joi.DateSchema;
export declare type XBinarySchema = XPrimitive<Buffer | string, Joi.BinarySchema> & Joi.BinarySchema;
export declare type XFunctionSchema = XPrimitive<Function, Joi.FunctionSchema> & Joi.FunctionSchema;
export declare type XDateSchemaUTC = XPrimitive<number, Joi.DateSchema> & Joi.DateSchema;
export declare type XDateSchemaSString = XPrimitive<string, Joi.DateSchema> & Joi.DateSchema;
export declare type XArraySchema = XArray & Joi.ArraySchema;
export declare type XObjectSchema = XObject & Joi.ObjectSchema;
export declare type XAlternativesSchema = XAlternatives & Joi.AlternativesSchema;
export declare type XKindSchema<T extends string> = XStringSchema<T>;
export declare type XFactory<T> = {
    __factoryType: T;
};
export declare type XObjectBundleSchema = XObject & Joi.ObjectSchema & {
    __bundleName: 'T';
};
export declare const any: () => XAnySchema;
export declare const bool: () => XBooleanSchema;
export declare const boolean: () => XBooleanSchema;
export declare const number: () => XNumberSchema<number>;
export declare const string: () => XStringSchema<string>;
export declare const stringValue: <T extends string>(value: T) => XEnumSchema<T>;
export declare const date: () => XDateSchema;
export declare const binary: () => XBinarySchema;
export declare const func: () => XFunctionSchema;
export declare const alternatives: () => XAlternativesSchema;
export declare const array: () => XArraySchema;
export declare const kind: <T extends string>(value: T) => XPrimitive<T, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
export declare const LiteralString: <T extends string>(value: T[]) => XStringSchema<T>;
export declare const LiteralNumber: <T extends number>(value: T[]) => XNumberSchema<T>;
export declare const enumString: <T extends string>(values: T[]) => XStringSchema<T>;
export declare function object(): XObjectSchema;
export declare const findFactory: (x: any) => FactoryMeta | undefined;
export declare enum FactoryType {
    issolated = 1,
    dependent = 2,
    manual = 3,
}
export declare type FactoryMeta = {
    __factoryType: FactoryType;
    __newFactory: <T extends ({
        factory: string;
    } & XTSchema)>(settings: T) => IConfigFactory;
};
export declare type FactoryMetaContainer = {
    __factory: FactoryMeta;
};
export declare type XFactoryMeta = {
    _meta: (FactoryMetaContainer)[];
    meta: (meta: FactoryMetaContainer) => XFactoryMeta;
};
export declare const Factory: <FInteface>(type: FactoryType, newFactory: (settings: any) => IConfigFactory) => XFactAlternatives<FInteface, undefined, "NotRequired", "NotNullable", "F", "P"> & AlternativesSchema;
export declare type XAnyObjectSchema = XObject<any, any, any, any, any> & Joi.ObjectSchema;
export declare type JoiXSchema<T = any, R extends IsRequired = any, N extends IsNullable = any, I extends ID = any, F extends InputForm = any> = X<T, R, N, I, F>;
export declare type ExtractRequired<S extends any, T> = If<StringEq<S['__isRequired'], 'Required'>, T, T | undefined>;
export declare type ExtractNull<S extends any, T> = If<StringEq<S['__isNullable'], 'Nullable'>, T | null, T>;
export declare type ExtractRequiredAndNull<S extends any, T> = ExtractRequired<S, ExtractNull<S, T>>;
export declare type JSON = Record<string, JoiXSchema<any, any, any, any, any>>;
export declare type ExtractFromSchema<T extends any> = _ExtractFromSchema<T> & XTSchema;
export declare type ExtractFromObject<T extends any> = _ExtractFromObject<T> & XTSchema;
export declare type ExtractWithFactoriesFromSchema<T extends any> = _ExtractWithFactoriesFromSchema<T> & XTSchema;
export declare type ExtractWithFactoriesFromObject<T extends any> = _ExtractWithFactoriesFromObject<T> & XTSchema;
export declare type XAny = X<any, any, any, any, any>;
export declare type ExtractFormat<C extends any, T extends any> = {
    'P': T;
    'W': T['w'];
}[C['__InputForm']];
export declare type ExtractType<T extends any> = T['__tsType'];
export declare type _ExtractFromSchema<T extends any> = _ExtractFromObject<{
    w: T;
}>['w'];
export declare type _ExtractFromObject<T extends Record<any, any>> = {
    [P in keyof T]: ({
        'T': ExtractRequiredAndNull<T[P], ExtractType<T[P]>>;
        'K': ExtractRequiredAndNull<T[P], _ExtractFromObject<ExtractType<T[P]>>>;
        'P': ExtractRequiredAndNull<T[P], Record<string, (ExtractFormat<T[P], _ExtractFromObject<ExtractType<T[P]>>>)>>;
        'A': ExtractRequiredAndNull<T[P], ExtractFormat<T[P], _ExtractFromObject<ExtractType<T[P]>>>[]>;
        'L': ExtractRequiredAndNull<T[P], ExtractFormat<T[P], _ExtractFromObject<ExtractType<T[P]>>>>;
        'F': ExtractRequiredAndNull<T[P], ExtractFormat<T[P], _ExtractFromObject<ExtractType<T[P]>>>>;
    })[T[P]['__ID']];
};
export declare type _ExtractWithFactoriesFromSchema<T extends any> = _ExtractWithFactoriesFromObject<{
    w: T;
}>['w'];
export declare type _ExtractWithFactoriesFromObject<T extends Record<any, any>> = {
    [P in keyof T]: ({
        'T': ExtractRequiredAndNull<T[P], ExtractType<T[P]>>;
        'K': ExtractRequiredAndNull<T[P], _ExtractWithFactoriesFromObject<ExtractType<T[P]>>>;
        'P': ExtractRequiredAndNull<T[P], Record<string, (ExtractFormat<T[P], _ExtractWithFactoriesFromObject<ExtractType<T[P]>>>)>>;
        'A': ExtractRequiredAndNull<T[P], ExtractFormat<T[P], _ExtractWithFactoriesFromObject<ExtractType<T[P]>>>[]>;
        'L': ExtractRequiredAndNull<T[P], ExtractFormat<T[P], _ExtractWithFactoriesFromObject<ExtractType<T[P]>>>>;
        'F': T[P]['__factoryType'];
    })[T[P]['__ID']];
};
export declare type XBundle = (XObjectBundleSchema & {
    unqiueBundleName: string;
});
export declare function isObjectBundle(x: XObjectBundleSchema): x is XBundle;
export declare const objectBundle: (unqiueBundleName: string) => XObjectBundleSchema;
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
export declare type JoiSchemaTypes = 'object' | 'array' | 'alter';
export declare type SchemaTypes<T extends string> = JoiSchemaTypes | T;
export declare type Keys = string[];
export declare type HasKeysIsKind = {
    keys: Keys;
    kind: JoiSchemaTypes;
    childrenKey: string | undefined;
};
export declare function OperateOnJoiSchema<ACC, ACC_KIND extends string, KIND extends SchemaTypes<ACC_KIND> = SchemaTypes<ACC_KIND>>(object: Joi.AnySchema, operate: (schema: Joi.AnySchema, acc: ACC, pos: number, key: string | undefined, configValue: ConfigValue) => Promise<void>, initAcc: (kind: KIND) => ACC, updateParentAcc: (key: string | undefined, schema: Joi.AnySchema, parentAcc: ACC, acc: ACC) => ACC, acc: ACC, pos?: number, key?: string | undefined, config?: Config): Promise<ACC>;
export declare function isJoiError(err: any): err is Joi.ValidationError;
