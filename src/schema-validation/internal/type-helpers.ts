import {Bool, ObjectOverwrite, ObjectOmit, If, ObjectClean, ObjectHasKey} from 'typelevel-ts';
import {_ValidationTypes} from './merged-definitions';
import { Validator, Validate, Optional, Nullable, TSTypes } from './types';
export {ValidationTypes } from './merged-definitions';

export interface HasType<T> 
{
    type?: T
}

// look late at merging this using the type system, just need be carefully binding degrades.
export declare interface GhostValidationType
{
    where : (nodeRef : IValidationType) =>void;
}

export type ValidationType = 

    IValidationType /*|
GhostValidationType;*/

export interface IValidationType 
{
    type: string | number | object | boolean;
    //where: (nodeRef : IValidationType) => void; // do this using the declare magic, so that functoin definition doesn't have to
    // actually existing, it can then be injected at run time. otherwise write and abstract class, and requires instance.
    // But their once again is a trick that this could be converted to a class by default, but requires a new keywor to
    // be used every were in the definitions, I don't like that it is not clean and will be messy.
    // we going to take the approach of using declare makthing IvalidationType look as if these methods exist.
    // we can use typing to agument IValidatoinType with declare, so stil have this definition exist as internal hidden one
    // so that we can still easily write typescript, with the knowlagde of what is concreate and what is not concreate.
    // The question now is how at run time to inject this methods, so that they can be found or converted to properties
    // when they are executed, they could just take on properties, to allow more complex validator to be written
}

export type Kind = 'T';
export type KindSelectOption = Kind | Validator;

// I actually don't feel that optional or nullable should be append here, because this is a validator spesific information.
// null, undefined should be verified at schema level recursive iterator, because no spesific validation is required.
export type KindSelect<T extends HasType<any>, B extends Bool> = If<B, T, Validate<T & { optional?: boolean }, Validator>>

export type NestedValidatorTypes =
_ValidationTypes |
Optional<_ValidationTypes> |
Nullable<_ValidationTypes> |
Optional<Nullable<_ValidationTypes>>

import * as Joi from 'joi';
import { Binary } from 'bson';

const schema = Joi.object().options({abortEarly: false}).keys({
    email
});

function JNumber()
{
   return Joi.number()
}

function JONumber()
{
   return Joi.number()
}

function JNNumber()
{
   return Joi.number()
}
function JON_Number()
{
   return Joi.number()
}


Joi.array().items();

type JNumber = () => Joi.NumberSchema;
type JONumber = () => Joi.NumberSchema;
type JNNumber = () => Joi.NumberSchema;
type JON_Number = () => Joi.NumberSchema;

class ModNumber
{
    static JNumber : JNumber = () =>
    {
        return Joi.number();
    };

    static JONumber : JONumber = () =>
    {
        return Joi.number();
    };

    static JNNumber : JNNumber = () =>
    {
        return Joi.number();
    };

    static JON_Number : JON_Number = () =>
    {
        return Joi.number();
    }
}

class ModNumber2
{
    static JNumber : JNumber = () =>
    {
        return Joi.number();
    };
}

class ModNumber3
{
    static JONumber : JONumber = () =>
    {
        return Joi.number();
    };
}

class ModNumber4
{
    static JNNumber : JNNumber = () =>
    {
        return Joi.number();
    };
}

class ModNumber5
{
    static JON_Number : JON_Number = () =>
    {
        return Joi.number();
    }
}

class empty{

}

const test = ModNumber


interface Modifiers {
    Non : true
    Optional : true
    Nullable : true
    OptionalNullable : true
}

interface Num {
    prop: 1,
    prop2 : 3
}

interface tt {
   JNumber : ModNumber2,
   JNNumber : ModNumber3
   JONumber : ModNumber4
   JONNumber : ModNumber5
}

type aaa = Pick<Modifiers, 'Non'>;


type Def<T extends keyof Modifiers> = (init : {m: Pick<Modifiers,T>}) => Joi.JoiObject;
declare function Def<T extends keyof Modifiers> (init :{ m: Pick<Modifiers,T>}) : Joi.JoiObject;

/*
class D<T extends keyof Modifiers> {

    Def : Def<T> = (init : Pick<Modifiers,T>) => 
    {
        return Joi.number();
    }
}*/
/*
function Def() : Joi.JoiObject
{
    return Joi.number();
}*/

class WJoi
{
    readonly? : boolean;
    nullable? : boolean;
    JoiObject? : Joi.Schema;

    JN() : Joi.NumberSchema
    {
        return Joi.number();
    }
    
    JO() : Joi.ObjectSchema
    {
        return Joi.object();
    }
    
    JD() : Joi.DateSchema
    {
        return Joi.date();
    }
}



class WJoi2
{
    static JN() : Joi.NumberSchema
    {
        return Joi.number();
    }
    
    static JO() : Joi.ObjectSchema
    {
        return Joi.object();
    }
    
    static JD() : Joi.DateSchema
    {
        return Joi.date();
    }
}

type FirstElement<T extends []> = T[0];

interface JoiTypes
{
    JN : Joi.NumberSchema;
    JO : Joi.ObjectSchema;
    JD: Joi.DateSchema;
}

interface JoiInit
{
    readonly? : boolean;
    nullable? : boolean;
    const? : Number;
    JoiObject : WJoi2;
}

// Still want the types to impose constructor function.


export enum JMods {
    // Non : true
    Op,
    Null,
    OpNull
}

export interface JoiType
{
    type : boolean | number | string | object;
    Joi : any;
}

export interface Boolean extends JoiType {
    type: boolean;
    Joi : Joi.BooleanSchema;
}
 
export interface Number extends JoiType
{
    type : number;
    Joi : Joi.NumberSchema;
}

type MyNumber = Joi.NumberSchema & {type: number};

export interface String extends JoiType {
    type: string;
    Joi : Joi.StringSchema;
}

export interface Array extends JoiType {
    type: any [];
    Joi : Joi.ArraySchema;
}

export interface Object extends JoiType {
    type: object;
    Joi : Joi.ArraySchema;
}

export interface BinarySchema extends JoiType {
    type: string;
    Joi : Joi.BinarySchema;
}

export interface DateSchema extends JoiType {

    type : string
    Joi : Joi.DateSchema
}


//export type JoiOp<T> = ObjectClean<ObjectOverwrite<T,{JoiOp?: true;}>>

export interface JoiOp<T> 
{
    JoiOp? : true;
}

export interface JoiNull<T>
{
    JoiNull? : true
}

export interface JoiOpNull<T>
{
    JoiOpNull? : true;
}

function Ji<T extends Joi.Schema>(Joi : T) : T
{
    return <T>Joi.required();
}

function Op<T extends Joi.Schema>(joi : T) : JoiOp<T>
{
    return <JoiOp<T>>(<any>joi.optional());
}

function Null<T extends Joi.Schema>(joi : T) : JoiNull<T>
{
    return <JoiNull<T>>joi.allow(null);
}

function OpNull<T extends Joi.Schema>(joi : T) : JoiOpNull<T>
{
    return <JoiOpNull<T>>joi.allow(null).optional();
}

const R_ = Joi.string()

const R_Op = Op(Joi.string())

const R_Null = Null(Joi.string())

const R_OpNull = OpNull(Joi.string())
type uu = Op<String, Joi>;


const _sd :uu  = (R_Op);

const _ :uu  = <JoiOp<Joi.BooleanSchema>>(R_Op);

const _Op : Op<String, Joi> = Op(Joi.string())

const _Null : Null<String, Joi> = Null(Joi.string())

const _OpNull : OpNull<String, Joi> = OpNull(Joi.string())

export type TSTypes = 'T';
export type Joi = 'F';

export type TsTypesOrJoi = TSTypes | Joi;

// have forgotten typescript rewrite of the differnitions based on option B
export type Op<T extends JoiType, B extends Bool> = If<B, T['type'], JoiOp<T['Joi']>>;
export type Null<T extends JoiType, B extends Bool> = If<B, T['type'], JoiNull<T['Joi']>>
export type OpNull<T extends JoiType, B extends Bool> = If<B, T['type'], JoiOpNull<T['Joi']>>

// default everything is optional.
// TS -> implies required.. , this means we required different intialization functions.
// Optional -> doesn't apply required.
// Null -> Appllies Null
// OptionalNull -> Applies Null -> doesn't apply required.

// But for typescript conventions, optional needs to apply ?, which is explictly
// assignable to undefined, unless re-write parent types definition, which look
// at the other work I have done, for now undefined is good.

// How to strip the required options from the types.

export type HasTypeJoi = 
{
    type : any;
    Joi : Joi.Schema
}

export type TS<T extends JoiType, B extends Bool> = If<B, T['type'], T['Joi']>;

// will have to figure out how to write this complex wrapper signature..
interface TSJoiSchema {}

class schemaaa<B extends TsTypesOrJoi = Joi> implements TSJoiSchema
{
    p1: TS<String, B> = Joi.number().min(3).max(30).required();
    p1_Op: Op<Number, B> = Op(Joi.number().min(3).max(30));
    p1_Null: Null<Number, B> = Null(Joi.number().min(3).max(30).required());
    p1_OpNull: OpNull<Number, B> = OpNull(Joi.number().min(3).max(30).required());
      
}

function JoiInstance (schema : TSJoiSchema, options: Joi.ValidationOptions | undefined = undefined ) :Joi.ObjectSchema
{
    const joi = Joi.object().required().keys(<Joi.SchemaMap>schema);

    if (options)
        joi.options(options);

    return joi;
}

const schemaDef = JoiInstance(new schemaaa()).with('username', 'birthyear').without('password', 'access_token')
const settings : schemaaa<TSTypes> = 
{
    p1 : 3434,
    p1_Op : 3434,



}

type Def<T extends keyof Modifiers> = (init : {m: Pick<Modifiers,T>}) => Joi.JoiObject;
declare function Def<T extends keyof Modifiers> (init :{ m: Pick<Modifiers,T>}) : Joi.JoiObject;
// interface based extends Joi.AnySchema
// {
//     //isRequired : 'T' | 'F';
//     //isNullable : 'T' | 'F';
//     required: () => this & {isRequired:'T'}
//     nullable: () =>  this & {isNullable:'T'} | this
// }

declare abstract class AnySchema implements Joi.AnySchema
{
    validate<T>(value: T): ValidationResult<T>;
    required() : this & {isRequired:'T'}
    allow(...values: any[]): this;
}

abstract class BasedIn extends AnySchema
{
    nullable () : (this & {isNullable:'T'} | this)
    {
        super.allow(null);
        return this;
    }
}

interface Nunber extends Joi.NumberSchema
{
    tsType : number
}

class schemaaaT<B extends TsTypesOrJoi = Joi> implements TSJoiSchema
{
    p1 = Joi.number().min(3).max(30).required().allow(null);
    p1_Op = Op(Joi.number().min(3).max(30));
    p1_Null  = Null(Joi.number().min(3).max(30).required());
    p1_OpNull = OpNull(Joi.number().min(3).max(30).required());     
}

import * as Joi from 'joi';
import {If} from 'typelevel-ts';

interface MyBase<T> {
  tsType: T;
  isRequired: 'T' | 'F';
  isNullable: 'T' | 'F';
  required: () => this & {isRequired: 'T'};
  allow: (allow: null) => this & {isNullable: 'T'}
}

type MyNumberSchema = MyBase<number> & Joi.NumberSchema;
type MyStringSchema = MyBase<string> & Joi.StringSchema;
type MyDateSchema = MyBase<number | Date | string> & Joi.DateSchema;
type MyDateSchemaUTC = MyBase<number> & Joi.DateSchema;
type MyDateSchemaSString = MyBase<string> & Joi.DateSchema;

const JoiX = {
  number: () => Joi.number() as MyNumberSchema,
  string: () => Joi.string() as MyStringSchema,
  date: () => Joi.date() as MyDateSchema,
  dateUTC: () => Joi.date() as MyDateSchemaUTC,
  dateString: () => Joi.date() as MyDateSchemaSString
}


type HasTsType = {tsType: any, isRequired: 'T' | 'F', isNullable: 'T' | 'F'};//Add isNullable
type ExtractTsType<T extends HasTsType> = If<T['isRequired'], T['tsType'], T['tsType'] | undefined>; //Need to add support for isNullable

type propType = (typeof schema)['myString'];
type extracted = ExtractTsType<propType>;

// Todo: Object/Array

export type Runtime<T> = any; //TODO 

//////

const schema = {
  numberRequired: JoiX.number().required().min(100).max(200),
  numberNotRequired: JoiX.number().min(100).allow(null),
  myString: JoiX.string().regex(/sdfsfd/).required()
};

const obj: Runtime<typeof schema> = {
  numberRequired: 42,
  numberNotRequired: undefined,
  myString: ''
};
