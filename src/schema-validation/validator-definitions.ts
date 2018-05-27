import {ValidationType, KindSelectOption, KindSelect} from './internal/type-helpers'

/*
export type ValidationTypesKind_ = 
ValidationTypeNumber |
ValidationTypeString;

export type ValidationTypesKind<B extends KindSelectOption> =
KindSelect<ValidationTypeNumber, B> |
KindSelect<ValidationTypeString, B>;
*/

export type Validators = [Number, String]

export * from './internal/container-definitions';

export interface Number extends ValidationType {
    kind: "number";
    type: number;
    lower: number;
    upper: number;
    allowNull: boolean;
}

export interface String extends ValidationType {
    kind: "reg";
    type: string;
    minLen: number;
    maxLen: number;
    regx: string;
}

// this is required to be a referance method.
export function where(this : IValidationType, nodeRef : IValidationType)
{

}

/*
function alphaNumeric(this : String)
{

}



export declare namespace String 
{
    export declare default = String
    export declare function alphaNumeric(this : String, optional : boolean) : void;
}*/



