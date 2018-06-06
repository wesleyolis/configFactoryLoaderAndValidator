/// <reference types="node" />
import * as Joi from 'joi';
import { If, ObjectHasKey } from 'typelevel-ts';
export * from 'joi';
export interface XBase {
    __tsType: any;
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
export interface XObject extends XBase {
    __tsType: Record<string, any>;
    keys<T extends Record<string, JoiXSchema>>(keys: T): this & {
        __tsType: ExtractFromObject<T>;
    };
    keys(schema?: Joi.SchemaMap): this & {
        __tsType: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.';
    };
}
export interface XArray extends XBase {
    __tsType: any[];
    items<T extends JoiXSchema>(items: T): this & {
        __tsType: ExtractFromSchema<T>[];
    };
    items(...types: Joi.SchemaLike[]): this & {
        __tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
    items(types: Joi.SchemaLike[]): this & {
        __tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.';
    };
}
export declare type XAnySchema = XPrimitive<any> & Joi.AnySchema;
export declare type XBooleanSchema = XPrimitive<boolean> & Joi.BooleanSchema;
export declare type XNumberSchema = XPrimitive<number> & Joi.NumberSchema;
export declare type XStringSchema = XPrimitive<string> & Joi.StringSchema;
export declare type XDateSchema = XPrimitive<number | Date | string> & Joi.DateSchema;
export declare type XBinarySchema = XPrimitive<Buffer | string> & Joi.BinarySchema;
export declare type XFunctionSchema = XPrimitive<Function> & Joi.FunctionSchema;
export declare type XDateSchemaUTC = XPrimitive<number> & Joi.DateSchema;
export declare type XDateSchemaSString = XPrimitive<string> & Joi.DateSchema;
export declare type XArraySchema = XArray & Joi.ArraySchema;
export declare type XObjectSchema = XObject & Joi.ObjectSchema;
export declare const any: () => XAnySchema;
export declare const bool: () => XBooleanSchema;
export declare const boolean: () => XBooleanSchema;
export declare const number: () => XNumberSchema;
export declare const string: () => XStringSchema;
export declare const date: () => XDateSchema;
export declare const binary: () => XBinarySchema;
export declare const func: () => XFunctionSchema;
export declare const lazy: <T extends JoiXSchema>(cb: () => T) => T;
export declare const object: () => XObjectSchema;
export declare const array: () => XArraySchema;
export declare function isJoiError(err: any): err is Joi.ValidationError;
export declare type JoiXSchema = {
    __tsType: any;
    __isRequired?: 'T';
    __isNullable?: 'T';
} & Joi.Schema;
export declare type ExtractRequired<S, T> = If<ObjectHasKey<S, '__isRequired'>, T, T | undefined>;
export declare type ExtractNull<S, T> = If<ObjectHasKey<S, '__isNullable'>, T | null, T>;
export declare type ExtractFromSchema<T extends JoiXSchema> = ExtractRequired<T, ExtractNull<T, T['__tsType']>>;
export declare type ExtractFromObject<T extends Record<string, JoiXSchema>> = {
    [P in keyof T]: ExtractFromSchema<T[P]>;
};
