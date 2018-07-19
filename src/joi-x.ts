import { IConfigFactory } from './config-factory';
export { IConfigFactory as IConfigFactory }
export * from './joi-x-validators' 

export {Joi as Joi}
import {ValidationErrorItem, validate, describe, AlternativesSchema} from 'joi'
export {ValidationErrorItem as ValidationErrorItem, validate as validate, describe as describe}

import * as Joi from 'joi';
import {If, ObjectHasKey, ObjectOptional, ObjectOmit, ObjectClean, Bool, StringOmit, StringEq, ObjectOverwrite} from 'typelevel-ts';
import { JoiV } from './index';

export type ID = 'T' | 'A' | 'P' | 'K' | 'L' | 'F'
export type InputForm = 'P' | 'W'

export type IsRequired = 'Required' | 'NotRequired';
export type IsNullable = 'Nullable' | 'NotNullable';

export interface X<T, R extends IsRequired, N extends IsNullable, I extends ID, F extends InputForm> {
  __tsType: T;
  __isRequired: R;
  __isNullable: N;
  __ID : I;
  __InputForm : F
}

export type Merge<O1, O2> = O1 & O2

export interface XPrimitive<T, J extends Joi.Schema, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'T', F extends InputForm = 'P'>
 extends X<T, R, N, I, F> {
  required: () => XPrimitive<T, J, 'Required', N, I, F> & J;
  allow: (allow: null) => XPrimitive<T, J, R, 'Nullable', I, F> & J;
}

export interface XObject<T = Record<string, any>, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'T', F extends InputForm = 'P'>
 extends X<T, R, N, I, F> {
  required: () => XObject<T, 'Required', N, I, F> & Joi.ObjectSchema;
  allow: (allow: null) => XObject<T, R, 'Nullable', I, F> & Joi.ObjectSchema;

  // This is actually not support by joi inthe first place so we shouldn't support it here.
  //pattern<S extends JoiXSchema, B extends Record<string, S>>(regex: RegExp, schema : B) : XObject<B, R, N, 'P', 'J'> & Joi.ObjectSchema

  pattern<S extends JoiXSchema>(regex: RegExp, schema : S) : XObject<{'w': S}, R, N, 'P', 'W'> & Joi.ObjectSchema

  // if statment also needs to handle other cases.
  keys<K extends Record<string, JoiXSchema>>(keys: K): XObject<If<StringEq<this['__ID'],'K'>, this['__tsType'] & K ,K>, R, N, 'K','P'> & Joi.ObjectSchema

  // This is actually not supported by joi in the first place, so we shouldn't support it here.
  //keys<K extends JoiXSchema>(keys: K):  XObject<If<StringEq<this['__ID'],'K'>, this['__tsType'] & K , K>, R, N, 'K', 'O'> & Joi.ObjectSchema
  
  pattern(... args : any []) : XObject<'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.', R, N, 'P', 'P'> & Joi.ObjectSchema
  keys(... args : any []): XObject<'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.' ,R, N, 'K','P'>
}

export interface XArray<T = any[], R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'A', F extends InputForm = 'P'>
 extends X<T, R, N, I, F> {
  required: () => XArray<T, 'Required', N, I, F> & Joi.ArraySchema;
  allow: (allow: null) => XArray<T, R, 'Nullable', I, F> & Joi.ArraySchema;

  items<S extends JoiXSchema, B extends Record<string, S>>(items: B): XArray<B, R, N, I, 'P'> & Joi.ArraySchema;
  items<S extends JoiXSchema>(items: S): XArray<{'w':S}, R, N, I, 'W'> & Joi.ArraySchema;
  items<S extends JoiXSchema>(items: S []): XArray<{'w':S}, R, N, I, 'W'> & Joi.ArraySchema;

  items(... args : any []): XArray<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, 'P'>  & Joi.ArraySchema;
}

export interface XAlternatives<T = undefined, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'L', F extends InputForm = 'P'>
 extends X<T, R, N, I, F> {
  required: () => XAlternatives<T, 'Required', N, I, F> & Joi.AlternativesSchema;
  allow: (allow: null) => XAlternatives<T, R, 'Nullable', I, F> & Joi.AlternativesSchema;


  //try<S extends JoiXSchema, B extends Record<string, S>>(types: B): XAlternatives<B, R, N, I, 'O'> & Joi.AlternativesSchema
  try<A extends JoiXSchema>(types: A[]): XAlternatives<{w:A}, R, N, I, 'W'> & Joi.AlternativesSchema

  try(... args : any []): X<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, F> & Joi.AlternativesSchema;

  // try(types: Joi.SchemaLike[]): this;
  // try(...types: Joi.SchemaLike[]): this;
  // when(ref: string, options: Joi.WhenOptions): this;
  // when(ref: Joi.Reference, options: Joi.WhenOptions): this;
  // when(ref: Joi.Schema, options: Joi.WhenSchemaOptions): this;
}

export interface XFactAlternatives<A = undefined, T = undefined, R extends IsRequired = 'NotRequired', N extends IsNullable = 'NotNullable', I extends ID = 'F', F extends InputForm = 'P'>
 extends X<T, R, N, I, F> {

  required: () => XFactAlternatives<A, T, 'Required', N, I, F> & XFactory<A> & Joi.AlternativesSchema;
  allow: (allow: null) => XFactAlternatives<A, T, R, 'Nullable', I,  F> & XFactory<A> & Joi.AlternativesSchema;

  try<S extends JoiXSchema>(types: S[]): XFactAlternatives<A, {w:S}, R, N, I, 'W'> & XFactory<A> & Joi.AlternativesSchema;

  try(... args : any []): X<'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.', R, N, I, F> & Joi.AlternativesSchema;
}

export type ObjectChildren = {
  key: string,
  schema : Joi.AnySchema
};

export type ObjectSchemaHidden = Joi.ObjectSchema & {_inner : {
  children : ObjectChildren []
}};

export type ArraySchemaHidden = Joi.ArraySchema & {_inner : {
  items : Joi.AnySchema []
}};

export type AlternativesSchemaHidden = Joi.AlternativesSchema & {_inner : {
  matches : {schema:Joi.AnySchema} []
}};



export type IXSchema = _XSchema | IXSchemaMap;

export interface IXSchemaMap {
  [key: string]: IXSchema;
}

export interface XJSchemaMap {
}

export interface XSchemaMap {
  [key: string]: XSchema;
}
export interface XTSchema  extends XJSchemaMap {

}

export type XSchema = _XSchema | XSchemaMap;

export type _XSchema = (XAnySchema
    | XArraySchema
    | XAlternativesSchema
    | XBinarySchema
    | XBooleanSchema
    | XDateSchema
    | XFunctionSchema
    | XNumberSchema
    | XObjectSchema
    | XStringSchema
    | XFactory<any>);

export type XAnySchema = XPrimitive<any, Joi.AnySchema> & Joi.AnySchema;
export type XBooleanSchema = XPrimitive<boolean, Joi.BooleanSchema> & Joi.BooleanSchema;
export type XNumberSchema<T extends number = number> = XPrimitive<T, Joi.NumberSchema> & Joi.NumberSchema;
export type XStringSchema<T extends string = string> = XPrimitive<T, Joi.StringSchema> & Joi.StringSchema;
export type XEnumSchema<S> = XPrimitive<S, Joi.StringSchema> & Joi.StringSchema;
export type XDateSchema = XPrimitive<number | Date | string, Joi.DateSchema> & Joi.DateSchema;
export type XBinarySchema = XPrimitive<Buffer | string, Joi.BinarySchema> & Joi.BinarySchema;
export type XFunctionSchema = XPrimitive<Function, Joi.FunctionSchema> & Joi.FunctionSchema;
export type XDateSchemaUTC = XPrimitive<number, Joi.DateSchema> & Joi.DateSchema;
export type XDateSchemaSString = XPrimitive<string, Joi.DateSchema> & Joi.DateSchema;
export type XArraySchema = XArray & Joi.ArraySchema ;//& ObjectOmit<Joi.ArraySchema, 'items'>;
export type XObjectSchema = XObject & Joi.ObjectSchema;
export type XAlternativesSchema = XAlternatives & Joi.AlternativesSchema;
export type XKindSchema<T extends string> =  XStringSchema<T>;

export type XFactory<T> = {
  __factoryType : T
}

// To be depricated.
export type XObjectBundleSchema = XObject & Joi.ObjectSchema & {__bundleName :'T'};

export const any = () => Joi.any() as XAnySchema;
export const bool = () => Joi.bool() as XBooleanSchema;
export const boolean = () => Joi.boolean() as XBooleanSchema;
export const number = () => Joi.number() as XNumberSchema;
export const string = () => Joi.string() as XStringSchema;
//export const enum = <T extends string>(options: T[]) => Joi.string().allow(options) as XEnumSchema<T>;
export const stringValue = <T extends string>(value: T) => Joi.string().allow(value) as XEnumSchema<T>;
export const date = () => Joi.date() as XDateSchema;
export const binary = () => Joi.binary() as XBinarySchema;
export const func = () => Joi.func() as XFunctionSchema;
//export const lazy = <T extends JoiXSchema>(cb: () => T) => Joi.lazy(cb) as T;
export const alternatives = () => Joi.alternatives() as XAlternativesSchema;  
// alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
//alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
export const object = () => Joi.object() as XObjectSchema;
export const array = () => Joi.array() as XArraySchema;
export const kind = <T extends string>(value : T) => (Joi.string().allow(value).required() as XKindSchema<T>).required();
export const LiteralString = <T extends string>(value : T[]) => Joi.string().allow(value) as XStringSchema<T>;
export const LiteralNumber = <T extends number>(value : T[]) => Joi.number().allow(value) as XNumberSchema<T>;
export const enumString = <T extends string>(values : T []) => Joi.string().allow(values) as XStringSchema<T>;

export const findFactory = (x : any) : FactoryMeta | undefined=>
{
  let factory : FactoryMetaContainer [] | undefined = undefined;
  
  if ((x as any as XFactoryMeta)._meta)
  {
    factory = (x as any as XFactoryMeta)._meta.filter(m => (m && m['__factory'] !== undefined));
  }

  if (factory == undefined || factory.length === 0)
    return undefined;
  else
    return factory[0].__factory;
}


export enum FactoryType
{
  issolated = 1,
  dependent = 2,
  manual = 3
}


export type FactoryMeta = {
  __factoryType : FactoryType,
  __newFactory : <T extends ({factory: string} & XTSchema)>(settings : T) => IConfigFactory
}

export type FactoryMetaContainer = {
  __factory : FactoryMeta
}

export type XFactoryMeta =
{
  _meta : (FactoryMetaContainer)[] 
  meta : (meta : FactoryMetaContainer) => XFactoryMeta // this is an internal hack so I don't really care, what it returns, shouldb't be chaning with this hack.
} 


export const Factory = <FInteface>(type : FactoryType, newFactory : (settings : any) => IConfigFactory) => {
  
  let factory = (Joi.alternatives() as any) as XFactoryMeta;

  factory = factory.meta({
    __factory: {
      __factoryType : type,
      __newFactory : newFactory
    }});
  
  return (factory as any) as XFactAlternatives<FInteface> & Joi.AlternativesSchema;
}

export type XAnyObjectSchema = XObject<any,any, any, any, any> & Joi.ObjectSchema;

// Should use this constraint everywhere...
export type JoiXSchema<T = any, R extends IsRequired = any, N extends IsNullable = any, I extends ID = any, F extends InputForm = any> = 
X<T, R, N, I, F> //& Joi.Schema;

export type ExtractRequired<S extends JoiXSchema, T> = If<StringEq<S['__isRequired'], 'Required'>, T, T | undefined>; 
export type ExtractNull<S extends JoiXSchema, T> = If<StringEq<S['__isNullable'], 'Nullable'>, T | null, T>; 
export type ExtractRequiredAndNull<S extends JoiXSchema, T> = ExtractRequired<S,ExtractNull<S, T>> 

export type JSON = Record<string, JoiXSchema<any, any, any, any, any>>

//export type ExtractFromSchema<T extends XSchema> = _ExtractFromSchema<T> & XTSchema
// export type ExtractFromObject<T extends XSchemaMap> = _ExtractFromObject<T> & XTSchema

// should just make this the base class constraint.
export type ExtractFromSchema<T extends any> = _ExtractFromSchema<T> & XTSchema
export type ExtractFromObject<T extends any> = _ExtractFromObject<T> & XTSchema



export type ExtractWithFactoriesFromSchema<T extends any> = _ExtractWithFactoriesFromSchema<T> & XTSchema
export type ExtractWithFactoriesFromObject<T extends any> = _ExtractWithFactoriesFromObject<T> & XTSchema


export type ExtractFormat<C extends any, T extends any > = 
{
  'P' : T
  'W' : T['w']
}[C['__InputForm']]

export type ExtractType<T extends any> = T['__tsType']


export type _ExtractFromSchema<T extends any> = _ExtractFromObject<{w: T}>['w']

export type _ExtractFromObject<T extends any> = {
  [P in keyof T] : ({
    'T' : ExtractRequiredAndNull<T[P],ExtractType<T[P]>>
    'K' : ExtractRequiredAndNull<T[P],_ExtractFromObject<ExtractType<T[P]>>>
    'P' : ExtractRequiredAndNull<T[P],Record<string,(ExtractFormat<T[P],_ExtractFromObject<ExtractType<T[P]>>>)>>
    
    'A' : ExtractRequiredAndNull<T[P], ExtractFormat<T[P],_ExtractFromObject<ExtractType<T[P]>>> []>
    'L' : ExtractRequiredAndNull<T[P], ExtractFormat<T[P],_ExtractFromObject<ExtractType<T[P]>>>>
    'F' : ExtractRequiredAndNull<T[P], ExtractFormat<T[P],_ExtractFromObject<ExtractType<T[P]>>>>
  }
)[T[P]['__ID']]
}

export type _ExtractWithFactoriesFromSchema<T extends any> = _ExtractWithFactoriesFromObject<{w: T}>['w']

export type _ExtractWithFactoriesFromObject<T extends any> = {
  [P in keyof T] : ({
    'T' : ExtractRequiredAndNull<T[P],ExtractType<T[P]>>
    'K' : ExtractRequiredAndNull<T[P],_ExtractWithFactoriesFromObject<ExtractType<T[P]>>>
    'P' : ExtractRequiredAndNull<T[P],Record<string,(ExtractFormat<T[P],_ExtractWithFactoriesFromObject<ExtractType<T[P]>>>)>>
    'A' : ExtractRequiredAndNull<T[P], ExtractFormat<T[P],_ExtractWithFactoriesFromObject<ExtractType<T[P]>>> []>
    'L' : ExtractRequiredAndNull<T[P], ExtractFormat<T[P],_ExtractWithFactoriesFromObject<ExtractType<T[P]>>>>
    'F' : T[P]['__factoryType']
  }
)[T[P]['__ID']]
}



export type XBundle = (XObjectBundleSchema & {unqiueBundleName : string});

export function isObjectBundle(x : XObjectBundleSchema) : x is XBundle
{
  const bundle = <XBundle>(x);

  return bundle.unqiueBundleName !== undefined;
}

// figure out weather I can check for ducplicates..
// typically need to count the has keys and also
// need to then compute the unique set of keys.
export const objectBundle = (unqiueBundleName : string) =>
{
  const object = Joi.object() as any;
  object['unqiueBundleName'] = unqiueBundleName; 

  return object as XObjectBundleSchema
}

export function getXObjectChildrens(obj : XObjectSchema) : ObjectChildren [] | undefined
{
  return getXObjectChildren(obj);
}

export function getXObjectChildren(obj : Joi.ObjectSchema) : ObjectChildren [] | undefined
{
  const objHidden = (<ObjectSchemaHidden>obj);

  if (obj)
    return obj && objHidden._inner && objHidden._inner.children;
  else
    return undefined;
}

export function isChildrenAnArray(children : ObjectChildren [] | (ObjectChildren | undefined)) : children is ObjectChildren []
{
  return Array.isArray(children);
}

export function isXObjectAndHasChildren(obj : Joi.AnySchema) : obj is ObjectSchemaHidden
{
  const objHidden = (<ObjectSchemaHidden>obj);

  return objHidden && objHidden._inner && isChildrenAnArray(objHidden._inner.children);
}

export type ConfigValue = any;
export type Config = Record<string, ConfigValue> | undefined;

export async function OperateOnXObjectKeys<ACC>(
children : ObjectChildren [] | (ObjectChildren | undefined),
operate : (key : string, schema : Joi.AnySchema, acc : ACC, configValue : ConfigValue) => Promise<void>,
initAcc : (key : string, schema : Joi.AnySchema, acc : ACC) => ACC,
updateParentAcc : (key : string, parentAcc : ACC, acc : ACC) => ACC,
acc : ACC, config : Config = undefined) : Promise<void>
{
  if (isChildrenAnArray(children))
  {
      for (let i = 0; i < children.length; i++)
      {
        const child = children[i];

        if (isXObjectAndHasChildren(child.schema))
        {
          const newAcc = initAcc(child.key, child.schema, acc);
          await OperateOnXObjectKeys(child.schema._inner.children, operate, initAcc, updateParentAcc, newAcc, config && config[child.key]);
          acc = updateParentAcc(child.key, acc, newAcc);
        }
        else if (child !== undefined)
        {
          await operate(child.key, child.schema, acc, config && config[child.key]);
        }
      }
  }
  else if (children !== undefined)
  {
    await operate(children.key, children.schema, acc, config && config[children.key]);
  }
}

export function isXArrayHasChildren(schema : Joi.AnySchema) : schema is ArraySchemaHidden
{
  const arrayChidlren = (<ArraySchemaHidden>schema);
  
  return arrayChidlren && arrayChidlren._inner && arrayChidlren._inner.items != undefined;
}

export function isXAlternativesHasChildren(schema : Joi.AnySchema) : schema is AlternativesSchemaHidden
{
  const arrayChildren = (<AlternativesSchemaHidden>schema);

  return arrayChildren && arrayChildren._inner && arrayChildren._inner.matches != undefined;
}

export type ArrayHiddenAcc = _ArrayHiddenAcc & Joi.Schema

export interface _ArrayHiddenAcc {
  __acc : Joi.AnySchema []
}

export type JoiSchemaTypes = 'object' | 'array' | 'alter'

export type SchemaTypes<T extends string> = JoiSchemaTypes | T;

export type Keys = string [];

export type HasKeysIsKind = {keys : Keys, kind : JoiSchemaTypes, childrenKey : string | undefined};

// export type isType<B, T extends B> = (schema : B) => schema is T

// export type isTypeKind = {isType : isType<any, any>, kind : JoiSchemaTypes };

// function isType<B extends Joi.AnySchema, T extends B>(schema : B) : schema is T
// {
//   return schema. required to know the property here, which is a problem.
// }

// Need to things of a way in which I can improve this with more stricter type constaints,
// I will think of something and the suggested it to the technical commity.
function isTypeIfPropertyGetAnySchema<B extends Joi.AnySchema>(schema : B, keys : string []) : (Joi.AnySchema []) | undefined
{
  let item : any = schema;

  keys.forEach((key) => {

    item = item[key];

    if(item == undefined)
      return undefined; 
  });

  return item as Joi.AnySchema [];
}

// What would be nice here is to be able to say I expect and implmentation for each item of type
// JoiSchemaTypes at least, don't have any obvious idears on how to do that just yet.
// mabye somthing like this [property extends/implements : keys], which would a 
// it would also be nice, to be able to constaint the keys, ref to keys, need this else were to, selection of exesting set of
// interface, that implement a common base with kind, were it has to meet keys constaint above.
// ref type should be and array of string, that have an index type.
// I have need this before as well.
const joiSchemaType : HasKeysIsKind [] = [
{
  keys : ['_inner','children'],
  kind : 'object',
  childrenKey : 'schema'
},
{
  keys : ['_inner','items'],
  kind : 'object',
  childrenKey : undefined
},
{
  keys : ['_inner','matches'],
  kind : 'alter',
  childrenKey : 'schema'
}
];






// export type OperateOnJoiSchemaAcc<T extends {}> = ChildObjectAcc | ChildArrayAcc | ChildAlterAcc | T;

// export type OperateOnJoiSchemaAccBase<T extends {} > = ChildAlterAcc | ChildArrayAcc | ChildAlterAcc | T;

// export type ParentOperateOnJoiSchemaAcc = OperateOnJoiSchemaAccBase<UndefinedAcc>

// export type BaseKinds<T extends string> = 'A1' | 'A2' | 'A3' | T

// export  interface Base<T> {
//   kind : BaseKinds<T>
// }

// export type ParentKinds = 'P1' | 'P2'

// export interface Parentd extends Base<ParentKinds>
// {
//   kind : 
// }

// export type Parent = BaseKinds<'Parent'>;

// function test()
// {
//   const param = ({kind:'undefined'} as UndefinedAcc);

//   OperateOnJoiSchema2<ParentKinds>('P2');
// }

// export function OperateOnJoiSchema2<T extends string, ACC extends BaseKinds<T> = BaseKinds<T>>(acc : ACC)
// {

// }


// can also implement a context, which can be used to build up decission matching logic.
// pos is used for context, when their are no keys.
// I also require a keys referance here.
// but this will enfore the constaints proabbly too much by using typeof, because not accumulator,
// can't just be some random joi, thing..mm, how to go about this from here.
// I think, could mabbye look at implementing a parrell, implementation acc, which store just they key word.
// so acc, could remain free of kind implmentation details, I guess that is the next move and improvement.
// <ACC, KIND extends SchemaTypes<keyof ACC> = SchemaTypes<keyof ACC>>(
export async function OperateOnJoiSchema<ACC, ACC_KIND extends string, KIND extends SchemaTypes<ACC_KIND> = SchemaTypes<ACC_KIND>>(
  object : Joi.AnySchema,
  operate : (schema : Joi.AnySchema, acc : ACC, pos : number, key : string | undefined, configValue : ConfigValue) => Promise<void>,
  initAcc : (kind : KIND) => ACC,
  updateParentAcc : (key : string | undefined, schema : Joi.AnySchema, parentAcc : ACC, acc : ACC) => ACC,
  acc : ACC,
  pos : number = -1,
  key : string | undefined = undefined,
  config : Config = undefined) : Promise<ACC>
{
  for (let i = 0; i < joiSchemaType.length; i++)
  {
    const type = joiSchemaType[i];
    const children = isTypeIfPropertyGetAnySchema(object, type.keys);
    
    if (children)
    {
      const newAcc = initAcc(type.kind as any as KIND);  // seem to be that the compile is falling over, this constian should work, looks like another bug.
      
      for (let j = 0; j < children.length; j++)
      {
        let child = children[j] as any as Record<string , Joi.AnySchema> & Record<'key', string>;  
        // Typically it would also be great to create a type constaint here as well, string
        // would be and extract up a subset from SomerArray[{'key'}] .. sure can come up with constraint, if the langauge is modified.

        let schema = child as any as Joi.AnySchema;
        if(type.childrenKey)
          schema = child[type.childrenKey]; 
          // look for ways in which to aurment this as a constain somehow, would need to think of this, need be some specila
          // form of kind present in a different way.

        await  OperateOnJoiSchema(schema, operate, initAcc, updateParentAcc, newAcc, j, child && child.key, config && config[child.key]);
      }

      return updateParentAcc(key, object, acc, newAcc);
    }
    // possible here need to handle the case undefined, in case we would like undefined value to be somthing.
  }

  // remeber may want to handle direct pass tought over here as well.
  await operate(object, acc, pos, key, config);

  return acc;
}


export function isJoiError(err: any): err is Joi.ValidationError {
  return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}

// export type IXSchema = _XSchema | IXSchemaMap;

// export interface IXSchemaMap {
//   [key: string]: IXSchema;
// }

// export interface XJSchemaMap {
// }

// export interface XSchemaMap {
//   [key: string]: XSchema;
// }
// export interface XTSchema  extends XJSchemaMap {

// }


// export type XSchema = _XSchema | XSchemaMap;

// //export type XSchema = {__tsType: any, __isRequired?: 'T', __isNullable?: 'T', __factoryType?: any} & _XSchema | XSchemaMap;

// //export type XSchema = _XSchema;

// export type _XSchema = (XAnySchema
//     | XArraySchema
//     | XAlternativesSchema
//     | XBinarySchema
//     | XBooleanSchema
//     | XDateSchema
//     | XFunctionSchema
//     | XNumberSchema
//     | XObjectSchema
//     | XStringSchema
//     | XFactory<any>);

/*
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


const instanyce: ExtractFromObject<typeof objectSchema>= {
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
};
*/

// export type _ExtractFromSchema<T> = _ExtractFromObject<{__tsTypeO: T}>['__tsTypeO']

// export type _ExtractFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractFromObject<T[P]> : never//'mistake' & T[P]
//    } 

// export type ExtractWithFactoriesFromSchema<T extends XSchema> = _ExtractWithFactoriesFromSchema<T> & XTSchema
// export type ExtractWithFactoriesFromObject<T extends XSchemaMap> = _ExtractWithFactoriesFromObject<T> & XTSchema
  

// export type _ExtractWithFactoriesFromSchema<T> = _ExtractWithFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']

// export type _ExtractWithFactoriesFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__factoryType:any} ? Promise<T[P]['__factoryType']> :
//   T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractWithFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractWithFactoriesFromObject<T[P]> : never//'mistake' & T[P]
//    } 


// export type _ExtractFactoriesFromSchema<T> = _ExtractFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']

// export type _ExtractFactoriesFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__factoryType:any} ? T[P]['__factoryType'] :
//   T[P] extends {__tsType:any} ? never:
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractFactoriesFromObject<T[P]> : never//'mistake' & T[P]
//    } 