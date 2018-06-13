import * as Joi from 'joi';
import {If, ObjectHasKey, ObjectOverwrite} from 'typelevel-ts';
export * from 'joi';

export interface XBase {
  required: () => this & {__isRequired: 'T'};
  allow: (allow: null) => this & {__isNullable: 'T'};
}

export interface XPrimitive<T> extends XBase {
  __tsType: T;
}

export type HasKey = 
{
  __tsType: any
}

export interface XObject extends XBase {
  pattern<S extends XSchema>(regex: RegExp, schema : S) : this & {__tsType: Record<string, _ExtractFromSchema<S>>}
  keys<T extends XSchemaMap>(keys: T): this & {__tsType: _ExtractFromObject<T>}
  keys(schema?: Joi.SchemaMap): this & {__tsType: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.'}
}

export interface XArray extends XBase {
  items<T extends XSchema>(items: T):  this & {__tsType: _ExtractFromSchema<T>[]}
  items(...types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
  items(types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
}

export interface XAlternatives extends XBase {
  //__tsType: Record<never, any>
  
  // try needs to generate a union of the extracted types.
  try<T extends XSchema>(types: T[]): this & {__tsType: _ExtractFromSchema<T>}
  //try(types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.alternatives().try(). Do not use Joi types - use JoiX instead.'}
  //try(...types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.alternatives().try(). Do not use Joi types - use JoiX instead.'}
}
export type XAnySchema = XPrimitive<any> & Joi.AnySchema;
export type XBooleanSchema<T extends boolean = boolean> = XPrimitive<boolean> & Joi.BooleanSchema;
export type XNumberSchema<T extends number = number> = XPrimitive<T> & Joi.NumberSchema;
export type XStringSchema<T extends string = string> = XPrimitive<T> & Joi.StringSchema;
export type XDateSchema = XPrimitive<number | Date | string> & Joi.DateSchema;
export type XBinarySchema = XPrimitive<Buffer | string> & Joi.BinarySchema;
export type XFunctionSchema = XPrimitive<Function> & Joi.FunctionSchema;
export type XDateSchemaUTC = XPrimitive<number> & Joi.DateSchema;
export type XDateSchemaSString = XPrimitive<string> & Joi.DateSchema;
export type XArraySchema = XArray & Joi.ArraySchema ;//& ObjectOmit<Joi.ArraySchema, 'items'>;
export type XObjectSchema = XObject & Joi.ObjectSchema;
export type XAlternativesSchema = XAlternatives & Joi.AlternativesSchema;
export type XKindSchema<T extends string> =  XStringSchema<T>;

export const any = () => Joi.any() as XAnySchema;
export const bool = () => Joi.bool() as XBooleanSchema;
export const boolean = () => Joi.boolean() as XBooleanSchema;
export const number = () => Joi.number() as XNumberSchema;
export const string = () => Joi.string() as XStringSchema;
export const date = () => Joi.date() as XDateSchema;
export const binary = () => Joi.binary() as XBinarySchema;
export const func = () => Joi.func() as XFunctionSchema;
export const lazy =  <T extends XSchema>(cb: () => T) => Joi.lazy(cb) as T;
// alternatives:(...types : SchemaLike[] | SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
  // alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
  //alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
export const object = () => Joi.object() as XObjectSchema;
export const array = () => Joi.array() as XArraySchema;
export const alternatives = () => Joi.alternatives() as XAlternativesSchema;
export const kind = <T extends string>(value : T) => Joi.string().allow(value) as XStringSchema<T> & {__isRequired: 'T'}
export const LiteralString = <T extends string>(value : T[]) => Joi.string().allow(value) as XStringSchema<T>
export const LiteralNumber = <T extends number>(value : T[]) => Joi.number().allow(value) as XNumberSchema<T>
export const LiteralBoolean = <T extends boolean>(value : T[]) => Joi.boolean().allow(value) as XBooleanSchema<T>
export const enumString = <T extends string>(values : T []) => Joi.string().allow(values) as XStringSchema<T>

export function isJoiError(err: any): err is Joi.ValidationError {
  return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}

// export const validate = <T>(value: T, schema: Joi.SchemaLike) => Joi.validate(value, schema);

// export const validate = <T, R>(value: T, schema: Joi.SchemaLike, callback: (err: Joi.ValidationError, value: T) => R): R;

// export const validate<T>(value: T, schema: SchemaLike, options: ValidationOptions): ValidationResult<T>;
// export const validate<T, R>(value: T, schema: SchemaLike, options: ValidationOptions, callback: (err: ValidationError, value: T) => R): R;

export interface XJSchemaMap {
}

export interface XSchemaMap {
  [key: string]: XSchema;
}
export interface XTSchema  extends XJSchemaMap {

}

export type XSchema = {__tsType: any, __isRequired?: 'T', __isNullable?: 'T'} & _XSchema;

export type _XSchema = (XAnySchema
    | XArraySchema
    | XAlternativesSchema
    | XBinarySchema
    | XBooleanSchema
    | XDateSchema
    | XFunctionSchema
    | XNumberSchema
    | XObjectSchema
    | XStringSchema);

export type XPrimativeSchema = 
  | XBooleanSchema
  | XNumberSchema
  | XStringSchema

export type ExtractRequired<S, T> = If<ObjectHasKey<S,'__isRequired'>, T, T | undefined>; 
export type ExtractNull<S, T> = If<ObjectHasKey<S,'__isNullable'>, T | null, T>; 
export type ExtractTSType<S, T extends HasKey> = If<ObjectHasKey<S,'__tsType'>, T['__tsType'], T>; 

/*
export type ApplyOptional<O> = MakeOptional<O, KeysIfHasKey<O,'__isRequired','T'>, KeysIfHasKey<O,'__isRequired','F'>>

export type KeysIfHasKey<O, P extends string, IfHas extends 'T' | 'F'> =
{
   [K in keyof O] : If<ObjectHasKey<O[K],P>, If<IfHas, K, never>, If<IfHas, never, K>>
}[keyof O]

export type MakeOptional<O, OKeys extends keyof O, NKeys extends keyof O> =
{[K in OKeys]? : O[K] } & 
{[K2 in NKeys] : O[K2]}

//export type ExtractFromSchema<T extends JoiXSchema> = ExtractRequired<T, ExtractNull<T, T['__tsType']>>
export type ExtractFromSchema<T extends JoiXSchema> = ExtractNull<T, T['__tsType']>
export type ExtractFromObject<T extends Record<string, JoiXSchema>> = ApplyOptional<ExtractObject<T>>
export type ExtractObject<T extends Record<string, JoiXSchema>> = 
{
  [P in keyof T]: ExtractFromSchema<T[P]>
};

export type GodFunction<T> = T extends JoiXSchema ? ExtractFromSchema<T> : T extends Record<string, JoiXSchema> ? ExtractFromObject<T> : never
*/


export type _ExtractFromSchema<T extends XSchema> = ExtractRequired<T, ExtractNull<T, ExtractTSType<T,T>>>
export type _ExtractFromObject<T extends XSchemaMap> = {
  [P in keyof T]: _ExtractFromSchema<T[P]>
}

export type ExtractFromSchema<T extends XSchema> = _ExtractFromSchema<T> & XTSchema
export type ExtractFromObject<T extends XSchemaMap> = _ExtractFromObject<T> & XTSchema

/*
export type OptionalKeys<T extends Record<string, JoiXSchema>> = ({
  [P in keyof T]: If<IsRequired<T[P]>, never, P>
})[keyof T];
export type RequiredKeys<T extends Record<string, JoiXSchema>> = StringOmit<keyof T, OptionalKeys<T>>;


export type ExtractFromObject<T extends Record<string, JoiXSchema>> = Clean<{ 
  [P in RequiredKeys<T>]: ExtractFromSchema<T[P]>
} & {
  [P in OptionalKeys<T>]?: ExtractFromSchema<T[P]>
}>;
*/

//export type GodFunction<T> = T extends JoiXSchema ? ExtractFromSchema<T> : T extends Record<string, JoiXSchema> ? ExtractFromObject<T> : never

const objectSchema = {
  numberRequired: number().required().min(100).max(200),
  numberNotRequired: number().min(100).allow(null),
  myString: string().regex(/sdfsfd/).required(),
  myObj: object().keys({
    a: string().required(),
    b: object().keys({
      c: number().required()
    }).required()
  }).required(),
  myArray: array().items(object().keys({
    a1: number().required()
  }).required()).required()
};

/*
const instance: ExtractFromObject<typeof objectSchema>= {
  numberRequired: 42,

  numberNotRequired : undefined,
  myString: '',
  myObj: {
    a: 'sdsa',
    b: {
      c: 234
    }
  },
  myArray: [{
    a1: 2
  }]
};*/

const schema = object().keys({
  a: string().required(),
  b: object().keys({
    c: number().required(),
    d: object().keys({
      f : number().allow(null)
    })
  }).required()
});
/*
const subInstance: ExtractFromSchema<typeof schema> = {
  a: 'sdsa',
  b: {
    c: 1,
     d: {
      
     }
  }
};
*/