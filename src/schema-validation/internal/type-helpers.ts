import {Bool, ObjectOverwrite, ObjectOmit, If} from 'typelevel-ts';
import {_ValidationTypes} from './merged-definitions';
export {ValidationTypes } from './merged-definitions';

declare global
{
    namespace test {
    export type Schema = 'T';
    export type Validator = 'F';

    export type SelectOptions = Schema | Validator;

    export type Optional<T extends HasType<any>> = ObjectOverwrite<T, { type?: (T['type']), optional: true }>
    export type Nullable<T extends HasType<any>> = ObjectOverwrite<T, { type: (T['type'] | null), nullable: true }>

    export type Select<T extends HasType<any>, B extends Bool> = If<B, T['type'], ObjectOmit<T, 'type'>>;
}
}

export interface HasType<T> 
{
    type?: T
}

export interface IValidationType 
{
    type: string | number | object | boolean
}

export type Kind = 'T';
export type KindSelectOption = Kind | Validator;

// I actually don't feel that optional or nullable should be append here, because this is a validator spesific information.
// null, undefined should be verified at schema level recursive iterator, because no spesific validation is required.
export type KindSelect<T extends HasType<any>, B extends Bool> = If<B, T, Select<T & { optional?: boolean }, Validator>>

export type NestedValidatorTypes =
_ValidationTypes |
Optional<_ValidationTypes> |
Nullable<_ValidationTypes> |
Optional<Nullable<_ValidationTypes>>
