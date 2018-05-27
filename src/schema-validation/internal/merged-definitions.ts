import * as VD from '../validator-definitions';
import * as VCD from './container-definitions';
import { Kind, KindSelectOption, KindSelect, HasType } from './type-helpers';
import { ObjectOmit, Bool, If, ObjectClean } from 'typelevel-ts';

export type _ValidationTypes = ValidationTypesKind<Kind>;
export type ValidationTypes = ValidationTypesKind<Validator>;;

export type VDValidators_ = ObjectOmit<VD.Validators, EmptyArrayKeys>

export type ValidationTypesKind_ = Union<VDValidators_> |
VCD.Array<any, any> |
VCD.ObjectArray<any, any>

export type VDValidators = ObjectOmit<VD.Validators, EmptyArrayKeys>
export type KindVDValidators<B extends KindSelectOption> = ForEachKindSelect<VDValidators, B> ;

export type ValidationTypesKind<B extends KindSelectOption> = KindVDValidators<B> |
KindSelect<VCD.Array<any, any>, B> |
KindSelect<VCD.ObjectArray<any, any>, B>;

export type ForEachKindSelect<T extends {}, B extends KindSelectOption> = 
({
    [K in keyof T] : If<B, T[K] & {type? : any}, ObjectOmit<T, 'type'>> // compiler seem to fall over, need to unroll everything or it.
})[keyof T]

export type Union<T extends {}> = (
{
    [P in keyof T]: T[P]
})[keyof T]

export type keys<T extends {}> = 
{
    [P in keyof T] : P
}[keyof T]
        
export type EmptyArrayKeys = keys<[]>;