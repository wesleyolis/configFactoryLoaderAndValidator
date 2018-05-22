import { HasType } from "./type-helpers";
import { ObjectOverwrite, Bool, ObjectOmit, If } from "typelevel-ts";

declare global
{
    export type Schema = 'T';
    export type Validator = 'F';

    export type SelectOptions = Schema | Validator;

    export type Optional<T extends HasType<any>> = ObjectOverwrite<T, { type?: (T['type']), optional: true }>
    export type Nullable<T extends HasType<any>> = ObjectOverwrite<T, { type: (T['type'] | null), nullable: true }>

    export type Select<T extends HasType<any>, B extends Bool> = If<B, T['type'], ObjectOmit<T, 'type'>>;
}