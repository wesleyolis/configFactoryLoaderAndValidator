"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
__export(require("joi"));
exports.any = () => Joi.any();
exports.bool = () => Joi.bool();
exports.boolean = () => Joi.boolean();
exports.number = () => Joi.number();
exports.string = () => Joi.string();
exports.date = () => Joi.date();
exports.binary = () => Joi.binary();
exports.func = () => Joi.func();
// export const lazy =  <T extends XSchema>(cb: () => T) => Joi.lazy(cb) as T;
// alternatives:(...types : SchemaLike[] | SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
// alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
//alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
exports.object = () => Joi.object();
exports.array = () => Joi.array();
exports.alternatives = () => Joi.alternatives();
exports.kind = (value) => Joi.string().allow(value);
exports.LiteralString = (value) => Joi.string().allow(value);
exports.LiteralNumber = (value) => Joi.number().allow(value);
exports.LiteralBoolean = (value) => Joi.boolean().allow(value);
exports.enumString = (values) => Joi.string().allow(values);
var FactoryType;
(function (FactoryType) {
    FactoryType[FactoryType["issolated"] = 0] = "issolated";
    FactoryType[FactoryType["dependent"] = 1] = "dependent";
    FactoryType[FactoryType["manual"] = 2] = "manual";
})(FactoryType = exports.FactoryType || (exports.FactoryType = {}));
exports.Factory = (type) => {
    const factory = Joi.alternatives();
    factory.__factoryType = type;
    return factory;
};
// figure out weather I can check for ducplicates..
// typically need to count the has keys and also
// need to then compute the unique set of keys.
exports.objectBundle = (unqiueBundleName) => {
    const object = Joi.object();
    object['unqiueBundleName'] = unqiueBundleName;
    return object;
};
function getXObjectChildrens(obj) {
    return getXObjectChildren(obj);
}
exports.getXObjectChildrens = getXObjectChildrens;
function getXObjectChildren(obj) {
    const objHidden = obj;
    if (obj)
        return obj && objHidden._inner && objHidden._inner.children;
    else
        return undefined;
}
exports.getXObjectChildren = getXObjectChildren;
function isChildrenAnArray(children) {
    return Array.isArray(children);
}
exports.isChildrenAnArray = isChildrenAnArray;
function isXObjectAndHasChildren(obj) {
    const objHidden = obj;
    return objHidden && objHidden._inner && isChildrenAnArray(objHidden._inner.children);
}
exports.isXObjectAndHasChildren = isXObjectAndHasChildren;
function OperateOnXObjectKeys(children, operate, newObject, acc) {
    if (isChildrenAnArray(children)) {
        children.map(child => {
            if (isXObjectAndHasChildren(child.schema)) {
                const newAcc = newObject(child.key, acc);
                OperateOnXObjectKeys(child.schema._inner.children, operate, newObject, newAcc);
            }
            else if (child !== undefined) {
                operate(child.key, child.schema, acc);
            }
        });
    }
    else if (children !== undefined) {
        operate(children.key, children.schema, acc);
    }
}
exports.OperateOnXObjectKeys = OperateOnXObjectKeys;
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
/* This works but it is not pretty

export type _ExtractFromSchema<T> =

// An array can contain an single object or an array, but in this case it is handle as single primative, since just has tsType
T extends XArray ? T extends {__tsTypeAr:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeAr']> []>> : T & 'Ar Type not defined' :
T extends XObject ? T extends {__tsTypeO:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeO']>>> :
T extends {__tsTypeOP:any} ?
T['__tsTypeOP'] extends {__tsType:any} ? ExtractRequired<T, ExtractNull<T, Record<string, ExtractPrimative<T['__tsTypeOP']>>>> :
ExtractRequired<T, ExtractNull<T, Record<string,_ExtractFromObject<T['__tsTypeOP']>>>> : T & 'O or Op Type not defined' :

T extends XAlternatives ? T extends {__tsTypeAl:any} ? T['__tsTypeAl'] extends {__tsTypeO:any} ? _ExtractFromObject<T['__tsTypeAl']['__tsTypeO']> :'Unsupported' :
//ExtractRequired<T, ExtractNull<T, _ExtractFromSchema__<T['__tsTypeAl']>>> :
 T & 'Al Type not defined' :
ExtractPrimative<T> // A primative here  or if not a primative, then it is an object again.

export type _ExtractFromObject<T>
 = {
  [P in keyof T]:
  T[P] extends XArray ? T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]['__tsTypeAr']> []>> : T[P] & 'Ar Type not defined' :
  T[P] extends XObject ? T[P] extends {__tsTypeO:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]>>> :
  T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]>>> : ' O or Op Type not defined' :
  T[P] extends XAlternatives ? T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromSchema<T[P]['__tsTypeAl']>>> : T[P] & ' Al Type not defined' :
  _ExtractFromSchema<T[P]>
  //T[P] extends XPrimitive<any> ? _ExtractFromSchema<T[P]> : 'Unkown Type' & T
 }
 */
// // An array can contain an single object or an array, but in this case it is handle as single primative, since just has tsType
// T extends XArray ? T extends {__tsTypeAr:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeAr']> []>> : T & 'Ar Type not defined' :
// T extends XObject ? T extends {__tsTypeO:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T['__tsTypeO']>>> : 
// T extends {__tsTypeOP:any} ?
// T['__tsTypeOP'] extends {__tsType:any} ? ExtractRequired<T, ExtractNull<T, Record<string, ExtractPrimative<T['__tsTypeOP']>>>> :
// ExtractRequired<T, ExtractNull<T, Record<string,_ExtractFromObject<T['__tsTypeOP']>>>> : T & 'O or Op Type not defined' :
// T extends XAlternatives ? T extends {__tsTypeAl:any} ? T['__tsTypeAl'] extends {__tsTypeO:any} ? _ExtractFromObject<T['__tsTypeAl']['__tsTypeO']> :'Unsupported' :
// //ExtractRequired<T, ExtractNull<T, _ExtractFromSchema__<T['__tsTypeAl']>>> :
//  T & 'Al Type not defined' :
// ExtractPrimative<T> // A primative here  or if not a primative, then it is an object again.
/*
export type ExtractALL<T, K extends keyof T> = T extends {K:any} ? ExtractRequired<T, ExtractNull<T, _ExtractFromObject<T>[K]>> : 'unkownKey'


export type _ExtractFromObject<T>
 =
   {
  [P in keyof T]:
  T[P] extends {__tsType:any} ? ExtractALL<T[P],'__tsType'> : //T[P]['__tsType'] ://ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
  T[P] extends {__tsTypeAr:any} ? ExtractALL<T[P],'__tsTypeAr'> [] ://ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeAr'] []>> :
  T[P] extends {__tsTypeO:any} ?  ExtractALL<T[P],'__tsTypeO'> :
  T[P] extends {__tsTypeOP:any} ? 'OP' ://_ExtractFromObject<T[P]>['__tsTypeOP'] : //ExtractRequired<T[P], ExtractNull<T[P], _ExtractFromObject<T[P]>['__tsTypeOP']>> :
  T[P] extends {__tsTypeAl:any} ? 'AL' ://_ExtractFromObject<T[P]>['__tsTypeAl'] :
  T[P] extends {} ? _ExtractFromObject<T[P]> : 'mistake' & T[P]
   }
*/
const objectSchema = {
    numberRequired: exports.number().required().min(100).max(200),
    numberNotRequired: exports.number().min(100).allow(null),
    myString: exports.string().regex(/sdfsfd/).required(),
    myObj: exports.object().keys({
        a: exports.string().required(),
        b: exports.object().keys({
            c: exports.number().required()
        }).required()
    }).required(),
    myArray: exports.array().items(exports.object().keys({
        a1: exports.number().required()
    }).required()).required()
};
const instanyce = {
    numberRequired: 42,
    numberNotRequired: undefined,
    myString: '',
    myObj: {
        a: 'sdsa',
        b: {
            c: 234
        }
    },
    myArray: [{
            a1: 2
        }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMkI7QUFFM0IseUJBQW9CO0FBc0VQLFFBQUEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQWdCLENBQUM7QUFDcEMsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBb0IsQ0FBQztBQUMxQyxRQUFBLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFvQixDQUFDO0FBQ2hELFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFpQixDQUFDO0FBQ3ZDLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBcUIsQ0FBQztBQUN4RCw4RUFBOEU7QUFDOUUsd0dBQXdHO0FBQ3RHLDZFQUE2RTtBQUM3RSxpRkFBaUY7QUFDdEUsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFrQixDQUFDO0FBQzFDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQXlCLENBQUM7QUFDL0QsUUFBQSxJQUFJLEdBQUcsQ0FBbUIsS0FBUyxFQUFF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