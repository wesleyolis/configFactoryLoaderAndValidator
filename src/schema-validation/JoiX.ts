import {If, Not, ObjectHasKey, ObjectClean} from 'typelevel-ts';
import * as Joi from 'Joi';
import { HasType } from './_example';

export interface XBase {
  required: () => this & {isRequired: 'T'};
  exist: () => this & {isRequired: 'T'};
  allow: (allow: null) => this & {isNullable: 'T'}
}

export interface XPrimitive<T> extends XBase {
    tsType: T
}


type JoiObject = {
    [index : string] : AnySchema
}

// export interface XObject extends XBase {
//      tsType: Record<string, any>
//     // This ts type is going to short cricuit things, 
//     // we actually required the full recrusive definition here which will be extracted from
//     // keys. If the record is XObject or XArray, then we extract the objects type
//     // definitino from the keys and union it with the parent definition.

//     // Required to hosit this information out of the function into the definition..
//     // That or I am required to redefine how joi iterates are defined to use a key, that I
//     // can check for, then we have to post wrap things.
//     // I would be required to stack up all the keys for each XBase
    
//     // {a : XBase. b: XBase}
//     // keys, requires and accumulator, and can't impose the SchemaMap, because that makes things worse as turn off type inferance.

//     keys: <T extends Record<string, HasTsType>>(keys: T) => this & {tsType : boolean};//TypeSchemaFrom<T>}//this & SchemaMap
// }
  
export type SchemaLike = string | number | boolean | object | null | Schema | SchemaMap

export type SchemaMapType = SchemaMap & HasTsType

export interface SchemaMap {
    [key: string]: (SchemaLike | SchemaLike[]) & HasTsType
} 

export type Schema = (AnySchema
    | ArraySchema
    | AlternativesSchema
    | BinarySchema
    | BooleanSchema
    | DateSchema
    | FunctionSchema
    | NumberSchema
    | ObjectSchema
    | StringSchema
    | LazySchema);

export type BooleanSchema = XPrimitive<boolean> & Joi.BooleanSchema;
export type NumberSchema = XPrimitive<number> & Joi.NumberSchema;
export type StringSchema = XPrimitive<string> & Joi.StringSchema;
export type DateSchema<C extends (number | Date | string) = (number | Date | string)> = XPrimitive<C> & Joi.DateSchema;
export type BinarySchema = XPrimitive<string> & Joi.BinarySchema;
// Complex ts types, as the will be recusive.
export type FunctionSchema = XPrimitive<string> & Joi.FunctionSchema;
export type LazySchema = XPrimitive<string> & Joi.LazySchema
export type AlternativesSchema = XPrimitive<string> & Joi.AlternativesSchema
export type AnySchema = XPrimitive<string> & Joi.AnySchema

export type ObjectSchema = XObject & Joi.ObjectSchema
export type ArraySchema = XArray & Joi.ArraySchema

const JoiX = {
    any: () => Joi.any() as AnySchema,
    bool: () => Joi.bool() as BooleanSchema,
    boolean: () => Joi.boolean() as BooleanSchema,
    number: () => Joi.number() as NumberSchema,
    string: () => Joi.string() as StringSchema,
    date: () => Joi.date() as DateSchema,
    binary: () => Joi.binary() as BinarySchema,
    func: () => Joi.func() as FunctionSchema,
    lazy: (cb: () => Schema) => Joi.lazy(cb) as LazySchema,
   // alternatives:(...types : SchemaLike[] | SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
    alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
    //alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
    object: (schema?:SchemaMap | undefined) => Joi.object(schema) as ObjectSchema,
    array: () => Joi.array() as ArraySchema
}

export type HasTsType = {tsType?: any};

export type ExtractTsType<T extends HasTsType> = If<ObjectHasKey<T,'isRequired'>, T['tsType'], T['tsType'] | undefined>;


export type ExtractTsTypeOnly<T extends HasTsType> = T['tsType'];

export type ModTSTypeIfRequired<T extends HasTsType, Type> = If<ObjectHasKey<T,'isRequired'>, Type, Type | undefined>;

export type ModTSTypeIfNullable<T extends HasTsType, Type> = If<ObjectHasKey<T,'isNullable'>, Type | null, Type>;

const schema = {
  numberRequiredAndNotNullable: JoiX.number().required().min(100).max(200),
  numberNotRequiredUndefined: JoiX.number().min(100),
  numberRequiredAllowNull: JoiX.string().regex(/sdfsfd/).required().allow(null),
  numberNotRequiredAllowNull: JoiX.string().regex(/sdfsfd/).allow(null),
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

export type TypeSchemaFrom<S extends SchemaMap> =
{
    [P in keyof S] : S[P] extends XPrimitive<any> ? ModTSTypeIfNullable<S[P], ExtractTsType<S[P]>>:// S[P]
    //S[P] extends XObject ?  TypeSchemaFromObject<S[P]> : boolean
    S[P] extends XObject ?  TypeSchemaFromObject<S[P]> : boolean
   // TypeSchemaFrom<S[P]> :  
   // S[P]extends XArray ? TypeSchemaFrom<S[P]> : S[P]*/
}

export interface XObject extends XBase {
   // tsType: Record<string, any>
    //keys: <T extends Record<string, HasTsType>>(keys: T) => this & {tsType : TypeSchemaFrom<T>}//this & SchemaMap
    keys: <T extends SchemaMap>(keys: T) => this & {tsType : T}//this & SchemaMap
}


export interface XArray extends XBase {
    // tsType: any[]
     items: <T extends SchemaMap>(items: T) => this & {tsType: TypeSchemaType<T>[]}
}
 

export type TypeSchemaFromObject<S extends HasTsType> = 
S extends XObject ? ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, TypeSchemaFrom<ExtractTsTypeOnly<S>>>> : boolean

export type TypeSchemaFromObject_<S extends HasTsType> = 
S extends XObject ? ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, TypeSchemaFromPrimative<ExtractTsTypeOnly<S>>>> : 
TypeSchemaFromPrimative<S>

export type TypeSchemaFromPrimative<S extends SchemaMap> =
{
    [P in keyof S] : S[P] extends XObject ? TypeSchemaFromObject_<S[P]> :
    S[P] extends XPrimitive<any> ? ModTSTypeIfNullable<S[P], ExtractTsType<S[P]>>: false
    // S[P]
}

export type TypeSchemaType<S extends HasTsType> = 
S extends XObject ? ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, TypeSchemaFromPrimative<ExtractTsTypeOnly<S>>>> : 
S extends XArray ? ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, ExtractTsTypeOnly<S>>> : 
TypeSchemaFromPrimative_<S>

export type TypeSchemaFromPrimative_<S extends SchemaMap> =
{
    [P in keyof S] : S[P] extends XObject ? TypeSchemaType<S[P]> :
    S[P] extends XArray ? TypeSchemaType<S[P]> :
    S[P] extends XPrimitive<any> ? ModTSTypeIfNullable<S[P], ExtractTsType<S[P]>>: TypeSchemaFromRecusionFailed
    // S[P]
}

export type TypeSchemaFromRecusionFailed = 'Type Schema from infered types failed';
// export type TypeSchemaFrom2<S extends SchemaMapType> = 
// S extends XObject ? 
// ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, ExtractTsTypeOnly<S>>>
// :
// S extends XArray ? 
// ModTSTypeIfNullable<S, ModTSTypeIfRequired<S, ExtractTsTypeOnly<S>>>
// :
// S extends XPrimitive<any> ?
// {
//     [P in keyof S] : S extends XPrimitive<any> ? ModTSTypeIfNullable<S, ExtractTsType<S>> : TypeSchemaFrom2<S[P]>
// }
// : S

// {
//     [P in keyof S] : S[P] extends XPrimitive<any> ? ModTSTypeIfNullable<S[P], ExtractTsType<S[P]>>:// S[P]
//     S[P] extends XObject ?  ModTSTypeIfNullable<S[P], ExtractTsType<S[P]>> : undefined
//    // TypeSchemaFrom<S[P]> :  
//    // S[P]extends XArray ? TypeSchemaFrom<S[P]> : S[P]*/
// }

type uuu = TypeSchemaType<typeof schema>;

export type TypeObjectFrom<S extends HasTsType> = ModTSTypeIfNullable<S, ExtractTsType<S>>;
//export type TypeObjectFrom<S extends SchemaMap> = TypeSchemaFrom<S>;

const keys = {
    a: JoiX.string().required(),
    // b: JoiX.object().keys({
    //   c: JoiX.number().required()
    // }).required()
}
 
// Optional is the next level up...
const object = JoiX.object().keys({
    a: JoiX.string().required().allow(null),
     b: JoiX.object().keys({
       c: JoiX.number().required().allow(null)
     }).allow(null).required()
}).allow(null)

type Tobject = TypeSchemaType<typeof object>;//TypeSchemaFromObject<typeof object>
// object, array, primatives, because way object works.
const test : Tobject = {
    a: 'sdsa',
    b: {
        c : null
    }
}

// Optional is the next level up...
const objectUndefined = JoiX.object().keys(keys)
type TobjectUndefined = TypeObjectFrom<typeof objectUndefined>

const objectRequired = JoiX.object().keys(keys).required()
type TobjectRequired = TypeObjectFrom<typeof objectRequired>

const objectRequiredAllowNull = JoiX.object().keys(keys).required().allow(null)
type TobjectRequiredAllowNull = TypeObjectFrom<typeof objectRequiredAllowNull>

const objectAllowNull = JoiX.object().keys(keys).allow(null)
type TobjectAllowNull = TypeObjectFrom<typeof objectAllowNull>


const obj: TypeSchemaType<typeof schema> = {
numberRequiredAndNotNullable: 42,
numberNotRequiredUndefined: undefined,
numberRequiredAllowNull: null,
numberNotRequiredAllowNull: null,
  myString: '',
  myObj: {
    a: 'sdsa',
    b: {
      c: 42
    }
  },
  myArray: [{
    a1: 2
  }]
};
