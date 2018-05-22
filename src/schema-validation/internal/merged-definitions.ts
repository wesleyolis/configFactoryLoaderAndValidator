import * as VD from '../validator-definitions';
import * as VCD from './container-definitions';
import { Kind, KindSelectOption, KindSelect } from './helper-types';

export type _ValidationTypes = ValidationTypesKind<Kind>;
export type ValidationTypes = ValidationTypesKind<Validator>;


export type ValidationTypesKind_ = VD.ValidationTypesKind_ |
ValidationTypeArray<any, any> |
ValidationTypeObjectArray<any, any>

export type ValidationTypesKind<B extends KindSelectOption> = VD.ValidationTypesKind<B> |
KindSelect<ValidationTypeArray<any, any>, B> |
KindSelect<ValidationTypeObjectArray<any, any>, B>;