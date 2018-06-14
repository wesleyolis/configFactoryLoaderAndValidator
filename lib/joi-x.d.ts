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
};
export interface XObject extends XBase {
    pattern<S extends XSchema>(regex: RegExp, schema: S): this & {
        __tsType: Record<string, _ExtractFromSchema<S>>;
    };
    keys<T extends XSchemaMap>(keys: T): {
        __tsType: _ExtractFromObject<T>;
    } & this;
    keys(schema?: Joi.SchemaMap): this & {
        __tsType: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.';
    };
}
export interface XArray extends XBase {
    items<T extends XSchema>(items: T): this & {
        __tsType: _ExtractFromSchema<T>[];
    };
    items(...types: Joi.SchemaLike[]): this & {
        __tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
    items(types: Joi.SchemaLike[]): this & {
        __tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
}
export interface XAlternatives extends XBase {
    try<T extends XSchema>(types: T[]): this & {
        __tsType: _ExtractFromSchema<T>;
    };
}
export declare type XAnySchema = XPrimitive<any> & Joi.AnySchema;
export declare type XBooleanSchema<T extends boolean = boolean> = XPrimitive<T> & Joi.BooleanSchema;
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
export declare const any: () => XAnySchema;
export declare const bool: () => XBooleanSchema<boolean>;
export declare const boolean: () => XBooleanSchema<boolean>;
export declare const number: () => XNumberSchema<number>;
export declare const string: () => XStringSchema<string>;
export declare const date: () => XDateSchema;
export declare const binary: () => XBinarySchema;
export declare const func: () => XFunctionSchema;
export declare const lazy: <T extends XSchema>(cb: () => T) => T;
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
export declare function isJoiError(err: any): err is Joi.ValidationError;
export interface XJSchemaMap {
}
export interface XSchemaMap {
    [key: string]: XSchema;
}
export interface XTSchema extends XJSchemaMap {
}
export declare type XSchema = {
    __tsType: any;
    __isRequired?: 'T';
    __isNullable?: 'T';
} & _XSchema;
export declare type _XSchema = (XAnySchema | XArraySchema | XAlternativesSchema | XBinarySchema | XBooleanSchema | XDateSchema | XFunctionSchema | XNumberSchema | XObjectSchema | XStringSchema);
export declare type XPrimativeSchema = XBooleanSchema | XNumberSchema | XStringSchema;
export declare type ExtractRequired<S, T> = If<ObjectHasKey<S, '__isRequired'>, T, T | undefined>;
export declare type ExtractNull<S, T> = If<ObjectHasKey<S, '__isNullable'>, T | null, T>;
export declare type ExtractTSType<S, T extends HasKey> = If<ObjectHasKey<S, '__tsType'>, T['__tsType'], T>;
export declare type _ExtractFromSchema<T extends XSchema> = ExtractRequired<T, ExtractNull<T, ExtractTSType<T, T>>>;
export declare type _ExtractFromObject<T extends XSchemaMap> = {
    [P in keyof T]: _ExtractFromSchema<T[P]>;
};
export declare type ExtractFromSchema<T extends XSchema> = _ExtractFromSchema<T> & XTSchema;
export declare type ExtractFromObject<T extends XSchemaMap> = _ExtractFromObject<T> & XTSchema;
