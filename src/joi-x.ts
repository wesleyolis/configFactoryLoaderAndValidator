import * as Joi from 'joi';
import {If, ObjectHasKey, ObjectOverwrite} from 'typelevel-ts';
import { JoiX } from '.';
import { IConfigFactory } from './config-factory';
import { settings } from 'cluster';
export * from 'joi';

export {IConfigFactory}


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
  __factoryType?: any
}

export interface XObject extends XBase {

  pattern<S extends XSchema>(regex: RegExp, schema : S) : this & {__tsTypeOP: S}
  keys<T extends XSchemaMap>(keys: T): this & {__tsTypeO : T }//__tsType: _ExtractFromObject<T>, __factoryType: ExtractFactoriesFromObject<T>}
  keys(schema?: Joi.SchemaMap): this & {__tsTypeO: 'Invalid type passed to JoiX.object().keys(). Do not use Joi types - use JoiX instead.'}
  //keyValue<T extends {}>(key : keyof T) : IXSchema | IXSchemaMap
}

export interface XArray extends XBase {
  items<T extends XSchema>(items: T):  this & {__tsTypeAr: T}//, __factoryType: ExtractFactoriesFromSchema<T>[]}
  items(...types: Joi.SchemaLike[]): this & {__tsTypeAr: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
  items(types: Joi.SchemaLike[]): this & {__tsTypeAr: 'Invalid type passed to JoiX.array().items(). Do not use Joi types - use JoiX instead.'};
}

export interface XAlternatives extends XBase {
  //__tsType: Record<never, any>
  
  // try needs to generate a union of the extracted types.
  try<T extends XSchema>(types: T[]): this & {__tsTypeAl: T}//, __factoryType: ExtractFactoriesFromSchema<T>}
  //try(types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.alternatives().try(). Do not use Joi types - use JoiX instead.'}
  //try(...types: Joi.SchemaLike[]): this & {__tsType: 'Invalid type passed to JoiX.alternatives().try(). Do not use Joi types - use JoiX instead.'}
}

//export type XFactoryType = XFactory<FactoryType>
// Using symbols, would be the best thing ever, for this type of hacking.
export type XFactory<T> = XAlternativesSchema & {
  __factoryType : T
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
export type XObjectBundleSchema = XObject & Joi.ObjectSchema & {__bundleName :'T'};

export const any = () => Joi.any() as XAnySchema;
export const bool = () => Joi.bool() as XBooleanSchema;
export const boolean = () => Joi.boolean() as XBooleanSchema;
export const number = () => Joi.number() as XNumberSchema;
export const string = () => Joi.string() as XStringSchema;
export const date = () => Joi.date() as XDateSchema;
export const binary = () => Joi.binary() as XBinarySchema;
export const func = () => Joi.func() as XFunctionSchema;
// export const lazy =  <T extends XSchema>(cb: () => T) => Joi.lazy(cb) as T;
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
  __newFactory : <T extends ({factory: string} & JoiX.XTSchema)>(settings : T) => IConfigFactory
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
  
  return (factory as any) as XFactory<FInteface>;
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

// I must see If I am able of striping away the undefined, behaveour, so not their as option
// by creating another layer.
export interface AccBase<T extends Joi.AnySchema | undefined>
{
  newContainerObject : () => T
}

export interface ChildObjectAcc extends AccBase<Joi.ObjectSchema>
{
  kind : 'object'
  keys : Record<string, Joi.AnySchema>
}

export interface ChildArrayAcc extends AccBase<Joi.ArraySchema>
{
  kind : 'array'
  items : Joi.AnySchema [];
}


export interface ChildAlterAcc extends AccBase<Joi.AlternativesSchema>
{
  kind : 'alter'
  matches : Joi.AnySchema [];
}

export interface UndefinedAcc extends Joi.AnySchema, AccBase<undefined>
{
  kind : 'undefined'
}

export type OperateOnJoiSchemaAcc = ChildObjectAcc | ChildArrayAcc | ChildAlterAcc | UndefinedAcc;

export async function OperateOnJoiSchema<ACC>(
  object : Joi.AnySchema,
  operate : (schema : Joi.AnySchema, acc : ACC, key : string | undefined, configValue : ConfigValue) => Promise<void>,
  initAcc : (schema : Joi.AnySchema) => ACC,
  updateParentAcc : (key : string | undefined, schema : Joi.AnySchema, parentAcc : ACC, acc : ACC) => ACC,
  acc : ACC,
  key : string | undefined = undefined,
  config : Config = undefined) : Promise<ACC>
{
  if (isXObjectAndHasChildren(object))
  {
    const newAcc = initAcc(object);

    for (let i = 0; i < object._inner.children.length; i++)
    {
      const child = object._inner.children[i];

      await OperateOnJoiSchema(child.schema, operate, initAcc, updateParentAcc, newAcc, child.key, config && config[child.key] );
    }
    
    acc = updateParentAcc(key, object, acc, newAcc);
  }
  else if (isXArrayHasChildren(object))
  {
    const schemas = object._inner.items;

    const newAcc = initAcc(object);

    for (let i = 0; i < schemas.length; i++)
    {
      let configValue = config && config[i];

      await OperateOnJoiSchema(schemas[i], operate, initAcc, updateParentAcc, newAcc, undefined, configValue);
    }

    acc = updateParentAcc(key, object, acc, newAcc);
  }
  else if (isXAlternativesHasChildren(object))
  {
    const schemas = object._inner.matches;

    const newAcc = initAcc(object);

    for (let i = 0; i < schemas.length; i++)
    {
      let configValue = config && config[i];

      await OperateOnJoiSchema(schemas[i].schema, operate, initAcc, updateParentAcc, newAcc, undefined, configValue);
    }

    acc = updateParentAcc(key, object, acc, newAcc);
  }
  else
  {
    await operate(object, acc, key, config);
  }

  return acc;
}


export function isJoiError(err: any): err is Joi.ValidationError {
  return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}

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

//export type XSchema = {__tsType: any, __isRequired?: 'T', __isNullable?: 'T', __factoryType?: any} & _XSchema | XSchemaMap;

//export type XSchema = _XSchema;

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

export type ExtractRequired<S, T> = If<ObjectHasKey<S,'__isRequired'>, T, T | undefined>; 
export type ExtractNull<S, T> = If<ObjectHasKey<S,'__isNullable'>, T | null, T>; 
export type ExtractTSType<T extends HasKey, F> = If<ObjectHasKey<T,'__tsType'>, T['__tsType'], F>;
export type ExtractFactory<S extends HasKey, T> = If<ObjectHasKey<S,'__factoryType'>, S['__factoryType'], undefined>; 


export type ExtractPrimative<T> = T extends XPrimitive<any> ? ExtractRequired<T, ExtractNull<T,ExtractTSType<T,T>>> : 'Unkown Type' & T;

export type ExtractFromSchema<T extends XSchema> = _ExtractFromSchema<T> & XTSchema
export type ExtractFromObject<T extends XSchemaMap> = _ExtractFromObject<T> & XTSchema

/* This works but it is not pretty

export type _ExtractFromSchema<T> = 

// An array can contain an single object or an array, but in this case it is handle as single primative, since just has tsType
T extends XArray ? T extends {__tsTypeAr:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeAr']> []>> : T & 'Ar Type not defined' :
T extends XObject ? T extends {__tsTypeO:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeO']>>> : 
T extends {__tsTypeOP:any} ?
T['__tsTypeOP'] extends {__tsType:any} ? ExtractRequired<T, ExtractNull<T, Record<string, ExtractPrimative<T['__tsTypeOP']>>>> :
ExtractRequired<T, ExtractNull<T, Record<string,_ExtractFromObject<T['__tsTypeOP']>>>> : T & 'O or Op Type not defined' :

T extends XAlternatives ? T extends {__tsTypeAl:any} ? T['__tsTypeAl'] extends {__tsTypeO:any} ? _ExtractFromObject<T['__tsTypeAl']['__tsTypeO']> :'Unsupported' :
//ExtractRequired<T, ExtractNull<T, _ExtractFromSchema__<T['__tsTypeAl']>>> :
 T & 'Al Type not defined' :
ExtractPrimative<T> // A primative here  or if not a primative, then it is an object again.

export type _ExtractFromObject<T>
 = {
  [P in keyof T]: 
  T[P] extends XArray ? T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]['__tsTypeAr']> []>> : T[P] & 'Ar Type not defined' :
  T[P] extends XObject ? T[P] extends {__tsTypeO:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]>>> : 
  T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]>>> : ' O or Op Type not defined' :
  T[P] extends XAlternatives ? T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]['__tsTypeAl']>>> : T[P] & ' Al Type not defined' :
  _ExtractFromSchema<T[P]>
  //T[P] extends XPrimitive<any> ? _ExtractFromSchema<T[P]> : 'Unkown Type' & T
 }
 */

// // An array can contain an single object or an array, but in this case it is handle as single primative, since just has tsType
// T extends XArray ? T extends {__tsTypeAr:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeAr']> []>> : T & 'Ar Type not defined' :
// T extends XObject ? T extends {__tsTypeO:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeO']>>> : 
// T extends {__tsTypeOP:any} ?
// T['__tsTypeOP'] extends {__tsType:any} ? ExtractRequired<T, ExtractNull<T, Record<string, ExtractPrimative<T['__tsTypeOP']>>>> :
// ExtractRequired<T, ExtractNull<T, Record<string,_ExtractFromObject<T['__tsTypeOP']>>>> : T & 'O or Op Type not defined' :

// T extends XAlternatives ? T extends {__tsTypeAl:any} ? T['__tsTypeAl'] extends {__tsTypeO:any} ? _ExtractFromObject<T['__tsTypeAl']['__tsTypeO']> :'Unsupported' :
// //ExtractRequired<T, ExtractNull<T, _ExtractFromSchema__<T['__tsTypeAl']>>> :
//  T & 'Al Type not defined' :
// ExtractPrimative<T> // A primative here  or if not a primative, then it is an object again.
/*
export type ExtractALL<T, K extends keyof T> = T extends {K:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T>[K]>> : 'unkownKey'


export type _ExtractFromObject<T>
 = 
   {
  [P in keyof T]: 
  T[P] extends {__tsType:any} ? ExtractALL<T[P],'__tsType'> : //T[P]['__tsType'] ://ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
  T[P] extends {__tsTypeAr:any} ? ExtractALL<T[P],'__tsTypeAr'> [] ://ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAr'] []>> :
  T[P] extends {__tsTypeO:any} ?  ExtractALL<T[P],'__tsTypeO'> : 
  T[P] extends {__tsTypeOP:any} ? 'OP' ://_ExtractFromObject<T[P]>['__tsTypeOP'] : //ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeOP']>> :
  T[P] extends {__tsTypeAl:any} ? 'AL' ://_ExtractFromObject<T[P]>['__tsTypeAl'] : 
  T[P] extends {} ? _ExtractFromObject<T[P]> : 'mistake' & T[P]
   }
*/

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

export type _ExtractFromSchema<T> = _ExtractFromObject<{__tsTypeO: T}>['__tsTypeO']

export type _ExtractFromObject<T>
 = 
   {
  [P in keyof T]: 
  T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
  T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAr']>> [] :
  T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeO']>> : 
  T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFromObject<T[P]>['__tsTypeOP']>>> : 
  T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAl']>> : 
  T[P] extends {} ? _ExtractFromObject<T[P]> : never//'mistake' & T[P]
   } 

export type ExtractWithFactoriesFromSchema<T extends XSchema> = _ExtractWithFactoriesFromSchema<T> & XTSchema
export type ExtractWithFactoriesFromObject<T extends XSchemaMap> = _ExtractWithFactoriesFromObject<T> & XTSchema
  

export type _ExtractWithFactoriesFromSchema<T> = _ExtractWithFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']

export type _ExtractWithFactoriesFromObject<T>
 = 
   {
  [P in keyof T]: 
  T[P] extends {__factoryType:any} ? Promise<T[P]['__factoryType']> :
  T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
  T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
  T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeO']>> : 
  T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractWithFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
  T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
  T[P] extends {} ? _ExtractWithFactoriesFromObject<T[P]> : never//'mistake' & T[P]
   } 


export type _ExtractFactoriesFromSchema<T> = _ExtractFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']

export type _ExtractFactoriesFromObject<T>
 = 
   {
  [P in keyof T]: 
  T[P] extends {__factoryType:any} ? T[P]['__factoryType'] :
  T[P] extends {__tsType:any} ? never:
  T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
  T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeO']>> : 
  T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
  T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
  T[P] extends {} ? _ExtractFactoriesFromObject<T[P]> : never//'mistake' & T[P]
   } 