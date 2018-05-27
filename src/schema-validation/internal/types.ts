import { HasType } from "./type-helpers";
import { ObjectOverwrite, Bool, ObjectOmit, If } from "typelevel-ts";

export type TSTypes = 'T';
export type Validator = 'F';

export type ValidatorOptions = TSTypes | Validator;

export type Optional<T extends HasType<any>> = ObjectOverwrite<T, { type?: (T['type']), optional: true }>
export type Nullable<T extends HasType<any>> = ObjectOverwrite<T, { type: (T['type'] | null), nullable: true }>

export type Validate<T extends HasType<any>, B extends Bool> = If<B, T['type'], ObjectOmit<T, 'type'>>;

// This does allow us to generically add some random error context information
// that has been supplied generically at design time.
export function ValidateIn<T extends HasType<any>, B extends Bool>(msg : string) :
 If<B, T['type'], ObjectOmit<T, 'type'>>
{
    return new T();
}
