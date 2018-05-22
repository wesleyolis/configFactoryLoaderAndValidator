import { NestedValidatorTypes, IValidationType } from "./type-helpers";
import { Bool } from "typelevel-ts";

declare global
{
    export interface ValidationTypeArray<T extends NestedValidatorTypes, B extends Bool> extends IValidationType {
        kind: "array",
        type: T['type'][];
        elements: Select<T, B>
    }

    export interface ValidationTypeObjectArray<T extends Record<string, NestedValidatorTypes>, B extends Bool> extends IValidationType {
        kind: "objectArray",
        type: ({
            [P in keyof T]: T[P]['type']
        })[];
        elements: {
            [P in keyof T]: Select<T[P], B>
        }
    }
}