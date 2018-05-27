import { NestedValidatorTypes, ValidationType } from "./type-helpers";
import { Bool } from "typelevel-ts";
import { Validate } from "./types";

export interface Array<T extends NestedValidatorTypes, B extends Bool> extends ValidationType {
    kind: "array",
    type: T['type'][];
    elements: Validate<T, B>
}

export interface ObjectArray<T extends Record<string, NestedValidatorTypes>, B extends Bool> extends ValidationType {
    kind: "objectArray",
    type: ({
        [P in keyof T]: T[P]['type']
    })[];
    elements: {
        [P in keyof T]: Validate<T[P], B>
    }
}