import {Bool, ObjectOverwrite, ObjectOmit, If} from 'typelevel-ts';
import {_ValidationTypes} from './merged-definitions';
import { Validator, Validate, Optional, Nullable } from './types';
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
