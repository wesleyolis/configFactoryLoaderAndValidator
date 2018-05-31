import * as Joi from 'joi';
import {If, ObjectHasKey} from 'typelevel-ts';

export interface XBase {
  __tsType: any;
  required: () => this & {__isRequired: 'T'};
  allow: (allow: null) => this & {__isNullable: 'T'};
}

export interface XPrimitive<T> extends XBase {
  __tsType: T;
}

export interface XObject extends XBase {
  __tsType: Record<string, any>
  
  keys<T extends Record<string, JoiXSchema>>(keys: T): this & {__tsType: ExtractFromObject<T>}
  keys(schema?: Joi.SchemaMap): this & {__tsType: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.'}
}

export interface XArray extends XBase {
  __tsType: any[]

  items<T extends JoiXSchema>(items: T):  this & {__tsType: ExtractFromSchema<T>[]}
  items(...types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
  items(types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
}

export type XAnySchema = XPrimitive<any> & Joi.AnySchema;
export type XBooleanSchema = XPrimitive<boolean> & Joi.BooleanSchema;
export type XNumberSchema = XPrimitive<number> & Joi.NumberSchema;
export type XStringSchema = XPrimitive<string> & Joi.StringSchema;
export type XDateSchema = XPrimitive<number | Date | string> & Joi.DateSchema;
export type XBinarySchema = XPrimitive<Buffer | string> & Joi.BinarySchema;
export type XFunctionSchema = XPrimitive<Function> & Joi.FunctionSchema;
export type XDateSchemaUTC = XPrimitive<number> & Joi.DateSchema;
export type XDateSchemaSString = XPrimitive<string> & Joi.DateSchema;
export type XArraySchema = XArray & Joi.ArraySchema ;//& ObjectOmit<Joi.ArraySchema, 'items'>;
export type XObjectSchema = XObject & Joi.ObjectSchema;

export const JoiX = {
  any: () => Joi.any() as XAnySchema,
  bool: () => Joi.bool() as XBooleanSchema,
  boolean: () => Joi.boolean() as XBooleanSchema,
  number: () => Joi.number() as XNumberSchema,
  string: () => Joi.string() as XStringSchema,
  date: () => Joi.date() as XDateSchema,
  binary: () => Joi.binary() as XBinarySchema,
  func: () => Joi.func() as XFunctionSchema,
  lazy: <T extends JoiXSchema>(cb: () => T) => Joi.lazy(cb) as T,
// alternatives:(...types : SchemaLike[] | SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
  // alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
  //alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
  object: () => Joi.object() as XObjectSchema,
  array: () => Joi.array() as XArraySchema
}

export type JoiXSchema = {__tsType: any, __isRequired?: 'T', __isNullable?: 'T'} & Joi.Schema;

export type ExtractRequired<S, T> = If<ObjectHasKey<S,'__isRequired'>, T, T | undefined>; 
export type ExtractNull<S, T> = If<ObjectHasKey<S,'__isNullable'>, T | null, T>; 


export type ExtractFromSchema<T extends JoiXSchema> = ExtractRequired<T, ExtractNull<T, T['__tsType']>>
export type ExtractFromObject<T extends Record<string, JoiXSchema>> = {
  [P in keyof T]: ExtractFromSchema<T[P]>
};

//export type GodFunction<T> = T extends JoiXSchema ? ExtractFromSchema<T> : T extends Record<string, JoiXSchema> ? ExtractFromObject<T> : never


const objectSchema = {
  numberRequired: JoiX.number().required().min(100).max(200),
  numberNotRequired: JoiX.number().min(100).allow(null),
  myString: JoiX.string().regex(/sdfsfd/).required(),
  myObj: JoiX.object().keys({
    a: JoiX.string().required(),
    b: JoiX.object().keys({
      c: JoiX.number().required()
    }).required()
  }).required(),
  myArray: JoiX.array().items(JoiX.object().keys({
    a1: JoiX.number().required()
  }).required()).required()
};

const instance: ExtractFromObject<typeof objectSchema> = {
  numberRequired: 42,
  numberNotRequired: undefined,
  myString: '',
  myObj: {
    a: 'sdsa',
    b: {
      c: 1
    }
  },
  myArray: [{
    a1: 2
  }]
};

const schema = JoiX.object().keys({
  a: JoiX.string().required(),
  b: JoiX.object().keys({
    c: JoiX.number().required()
  }).required()
});

const subInstance: ExtractFromSchema<typeof schema> = {
  a: 'sdsa',
  b: {
    c: 1
  }
};