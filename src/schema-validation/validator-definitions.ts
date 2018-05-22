import {IValidationType, KindSelectOption, KindSelect} from './internal/types'

export type ValidationTypesKind_ = 
ValidationTypeNumber |
ValidationTypeString;

export type ValidationTypesKind<B extends KindSelectOption> =
KindSelect<ValidationTypeNumber, B> |
KindSelect<ValidationTypeString, B>;

declare global
{
    export interface ValidationTypeNumber extends IValidationType {
        kind: "number";
        type: number;
        lower: number;
        upper: number;
        allowNull: boolean;
    }

    export interface ValidationTypeString extends IValidationType {
        kind: "reg";
        type: string;
        minLen: number;
        maxLen: number;
        regx: string;
    }
}