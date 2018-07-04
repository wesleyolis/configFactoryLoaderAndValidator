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
exports.isFactory = (x) => {
    return x.__factoryType !== null;
};
var FactoryType;
(function (FactoryType) {
    FactoryType[FactoryType["issolated"] = 0] = "issolated";
    FactoryType[FactoryType["dependent"] = 1] = "dependent";
    FactoryType[FactoryType["manual"] = 2] = "manual";
})(FactoryType = exports.FactoryType || (exports.FactoryType = {}));
exports.Factory = (type, newFactory) => {
    const factory = Joi.alternatives();
    factory.__factoryType = type;
    factory.__NewFactory = newFactory;
    return factory;
};
function isObjectBundle(x) {
    const bundle = (x);
    return bundle.unqiueBundleName !== undefined;
}
exports.isObjectBundle = isObjectBundle;
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
function OperateOnXObjectKeys(children, operate, newObject, acc, config = undefined) {
    if (isChildrenAnArray(children)) {
        children.map(child => {
            if (isXObjectAndHasChildren(child.schema)) {
                const newAcc = newObject(child.key, acc);
                OperateOnXObjectKeys(child.schema._inner.children, operate, newObject, newAcc, config && config[child.key]);
            }
            else if (child !== undefined) {
                operate(child.key, child.schema, acc, config && config[child.key]);
            }
        });
    }
    else if (children !== undefined) {
        operate(children.key, children.schema, acc, config && config[children.key]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMkI7QUFJM0IseUJBQW9CO0FBNkVQLFFBQUEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQWdCLENBQUM7QUFDcEMsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBb0IsQ0FBQztBQUMxQyxRQUFBLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFvQixDQUFDO0FBQ2hELFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFpQixDQUFDO0FBQ3ZDLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBcUIsQ0FBQztBQUN4RCw4RUFBOEU7QUFDOUUsd0dBQXdHO0FBQ3RHLDZFQUE2RTtBQUM3RSxpRkFBaUY7QUFDdEUsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFrQixDQUFDO0FBQzFDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQXlCLENBQUM7QUFDL0QsUUFBQSxJQUFJLEdBQUcsQ0FBbUIsS0FBUyxFQUFF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