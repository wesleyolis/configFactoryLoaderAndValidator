"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//export * from './joi-x-validators' 
//export {Joi as Joi}
const joi_1 = require("joi");
exports.validate = joi_1.validate;
exports.describe = joi_1.describe;
const Joi = require("joi");
exports.any = () => Joi.any();
exports.bool = () => Joi.bool();
exports.boolean = () => Joi.boolean();
exports.number = () => Joi.number();
exports.string = () => Joi.string();
//export const enum = <T extends string>(options: T[]) => Joi.string().allow(options) as XEnumSchema<T>;
exports.stringValue = (value) => Joi.string().allow(value);
exports.date = () => Joi.date();
exports.binary = () => Joi.binary();
exports.func = () => Joi.func();
//export const lazy = <T extends JoiXSchema>(cb: () => T) => Joi.lazy(cb) as T;
exports.alternatives = () => Joi.alternatives();
// alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
//alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
//export const object = () => Joi.object() as XObjectSchema;
exports.array = () => Joi.array();
exports.kind = (value) => Joi.string().allow(value).required().required();
exports.LiteralString = (value) => Joi.string().allow(value);
exports.LiteralNumber = (value) => Joi.number().allow(value);
exports.enumString = (values) => Joi.string().allow(values);
function object() {
    return Joi.object();
}
exports.object = object;
exports.findFactory = (x) => {
    let factory = undefined;
    if (x._meta) {
        factory = x._meta.filter(m => (m && m['__factory'] !== undefined));
    }
    if (factory == undefined || factory.length === 0)
        return undefined;
    else
        return factory[0].__factory;
};
var FactoryType;
(function (FactoryType) {
    FactoryType[FactoryType["issolated"] = 1] = "issolated";
    FactoryType[FactoryType["dependent"] = 2] = "dependent";
    FactoryType[FactoryType["manual"] = 3] = "manual";
})(FactoryType = exports.FactoryType || (exports.FactoryType = {}));
exports.Factory = (type, newFactory) => {
    let factory = Joi.alternatives();
    factory = factory.meta({
        __factory: {
            __factoryType: type,
            __newFactory: newFactory
        }
    });
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
function OperateOnXObjectKeys(children, operate, initAcc, updateParentAcc, acc, config = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isChildrenAnArray(children)) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (isXObjectAndHasChildren(child.schema)) {
                    const newAcc = initAcc(child.key, child.schema, acc);
                    yield OperateOnXObjectKeys(child.schema._inner.children, operate, initAcc, updateParentAcc, newAcc, config && config[child.key]);
                    acc = updateParentAcc(child.key, acc, newAcc);
                }
                else if (child !== undefined) {
                    yield operate(child.key, child.schema, acc, config && config[child.key]);
                }
            }
        }
        else if (children !== undefined) {
            yield operate(children.key, children.schema, acc, config && config[children.key]);
        }
    });
}
exports.OperateOnXObjectKeys = OperateOnXObjectKeys;
function isXArrayHasChildren(schema) {
    const arrayChidlren = schema;
    return arrayChidlren && arrayChidlren._inner && arrayChidlren._inner.items != undefined;
}
exports.isXArrayHasChildren = isXArrayHasChildren;
function isXAlternativesHasChildren(schema) {
    const arrayChildren = schema;
    return arrayChildren && arrayChildren._inner && arrayChildren._inner.matches != undefined;
}
exports.isXAlternativesHasChildren = isXAlternativesHasChildren;
// export type isType<B, T extends B> = (schema : B) => schema is T
// export type isTypeKind = {isType : isType<any, any>, kind : JoiSchemaTypes };
// function isType<B extends Joi.AnySchema, T extends B>(schema : B) : schema is T
// {
//   return schema. required to know the property here, which is a problem.
// }
// Need to things of a way in which I can improve this with more stricter type constaints,
// I will think of something and the suggested it to the technical commity.
function isTypeIfPropertyGetAnySchema(schema, keys) {
    let item = schema;
    keys.forEach((key) => {
        item = item[key];
        if (item == undefined)
            return undefined;
    });
    return item;
}
// What would be nice here is to be able to say I expect and implmentation for each item of type
// JoiSchemaTypes at least, don't have any obvious idears on how to do that just yet.
// mabye somthing like this [property extends/implements : keys], which would a 
// it would also be nice, to be able to constaint the keys, ref to keys, need this else were to, selection of exesting set of
// interface, that implement a common base with kind, were it has to meet keys constaint above.
// ref type should be and array of string, that have an index type.
// I have need this before as well.
const joiSchemaType = [
    {
        keys: ['_inner', 'children'],
        kind: 'object',
        childrenKey: 'schema'
    },
    {
        keys: ['_inner', 'items'],
        kind: 'object',
        childrenKey: undefined
    },
    {
        keys: ['_inner', 'matches'],
        kind: 'alter',
        childrenKey: 'schema'
    }
];
// export type OperateOnJoiSchemaAcc<T extends {}> = ChildObjectAcc | ChildArrayAcc | ChildAlterAcc | T;
// export type OperateOnJoiSchemaAccBase<T extends {} > = ChildAlterAcc | ChildArrayAcc | ChildAlterAcc | T;
// export type ParentOperateOnJoiSchemaAcc = OperateOnJoiSchemaAccBase<UndefinedAcc>
// export type BaseKinds<T extends string> = 'A1' | 'A2' | 'A3' | T
// export  interface Base<T> {
//   kind : BaseKinds<T>
// }
// export type ParentKinds = 'P1' | 'P2'
// export interface Parentd extends Base<ParentKinds>
// {
//   kind : 
// }
// export type Parent = BaseKinds<'Parent'>;
// function test()
// {
//   const param = ({kind:'undefined'} as UndefinedAcc);
//   OperateOnJoiSchema2<ParentKinds>('P2');
// }
// export function OperateOnJoiSchema2<T extends string, ACC extends BaseKinds<T> = BaseKinds<T>>(acc : ACC)
// {
// }
// can also implement a context, which can be used to build up decission matching logic.
// pos is used for context, when their are no keys.
// I also require a keys referance here.
// but this will enfore the constaints proabbly too much by using typeof, because not accumulator,
// can't just be some random joi, thing..mm, how to go about this from here.
// I think, could mabbye look at implementing a parrell, implementation acc, which store just they key word.
// so acc, could remain free of kind implmentation details, I guess that is the next move and improvement.
// <ACC, KIND extends SchemaTypes<keyof ACC> = SchemaTypes<keyof ACC>>(
function OperateOnJoiSchema(object, operate, initAcc, updateParentAcc, acc, pos = -1, key = undefined, config = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < joiSchemaType.length; i++) {
            const type = joiSchemaType[i];
            const children = isTypeIfPropertyGetAnySchema(object, type.keys);
            if (children) {
                const newAcc = initAcc(type.kind); // seem to be that the compile is falling over, this constian should work, looks like another bug.
                for (let j = 0; j < children.length; j++) {
                    let child = children[j];
                    // Typically it would also be great to create a type constaint here as well, string
                    // would be and extract up a subset from SomerArray[{'key'}] .. sure can come up with constraint, if the langauge is modified.
                    let schema = child;
                    if (type.childrenKey)
                        schema = child[type.childrenKey];
                    // look for ways in which to aurment this as a constain somehow, would need to think of this, need be some specila
                    // form of kind present in a different way.
                    yield OperateOnJoiSchema(schema, operate, initAcc, updateParentAcc, newAcc, j, child && child.key, config && config[child.key]);
                }
                return updateParentAcc(key, object, acc, newAcc);
            }
            // possible here need to handle the case undefined, in case we would like undefined value to be somthing.
        }
        // remeber may want to handle direct pass tought over here as well.
        yield operate(object, acc, pos, key, config);
        return acc;
    });
}
exports.OperateOnJoiSchema = OperateOnJoiSchema;
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
// export type IXSchema = _XSchema | IXSchemaMap;
// export interface IXSchemaMap {
//   [key: string]: IXSchema;
// }
// export interface XJSchemaMap {
// }
// export interface XSchemaMap {
//   [key: string]: XSchema;
// }
// export interface XTSchema  extends XJSchemaMap {
// }
// export type XSchema = _XSchema | XSchemaMap;
// //export type XSchema = {__tsType: any, __isRequired?: 'T', __isNullable?: 'T', __factoryType?: any} & _XSchema | XSchemaMap;
// //export type XSchema = _XSchema;
// export type _XSchema = (XAnySchema
//     | XArraySchema
//     | XAlternativesSchema
//     | XBinarySchema
//     | XBooleanSchema
//     | XDateSchema
//     | XFunctionSchema
//     | XNumberSchema
//     | XObjectSchema
//     | XStringSchema
//     | XFactory<any>);
/*
const objectSchema = {
  numberRequired: number().required().min(100).max(200),
  numberNotRequired: number().min(100).allow(null),
  myString: string().regex(/sdfsfd/).required(),
  myObj: object().keys({
    a: string().required(),
    b: object().keys({
      c: number().required()
    }).required()
  }).required(),
  myArray: array().items(object().keys({
    a1: number().required()
  }).required()).required()
};


const instanyce: ExtractFromObject<typeof objectSchema>= {
  numberRequired: 42,

  numberNotRequired : undefined,
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
*/
// export type _ExtractFromSchema<T> = _ExtractFromObject<{__tsTypeO: T}>['__tsTypeO']
// export type _ExtractFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractFromObject<T[P]> : never//'mistake' & T[P]
//    } 
// export type ExtractWithFactoriesFromSchema<T extends XSchema> = _ExtractWithFactoriesFromSchema<T> & XTSchema
// export type ExtractWithFactoriesFromObject<T extends XSchemaMap> = _ExtractWithFactoriesFromObject<T> & XTSchema
// export type _ExtractWithFactoriesFromSchema<T> = _ExtractWithFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']
// export type _ExtractWithFactoriesFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__factoryType:any} ? Promise<T[P]['__factoryType']> :
//   T[P] extends {__tsType:any} ? ExtractRequired<T[P], ExtractNull<T[P], T[P]['__tsType']>> :
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractWithFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractWithFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractWithFactoriesFromObject<T[P]> : never//'mistake' & T[P]
//    } 
// export type _ExtractFactoriesFromSchema<T> = _ExtractFactoriesFromObject<{__tsTypeO: T}>['__tsTypeO']
// export type _ExtractFactoriesFromObject<T>
//  = 
//    {
//   [P in keyof T]: 
//   T[P] extends {__factoryType:any} ? T[P]['__factoryType'] :
//   T[P] extends {__tsType:any} ? never:
//   T[P] extends {__tsTypeAr:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAr']>> [] :
//   T[P] extends {__tsTypeO:any} ?  ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeO']>> : 
//   T[P] extends {__tsTypeOP:any} ? ExtractRequired<T[P], ExtractNull<T[P],Record<string,_ExtractFactoriesFromObject<T[P]>['__tsTypeOP']>>> : 
//   T[P] extends {__tsTypeAl:any} ? ExtractRequired<T[P], ExtractNull<T[P],_ExtractFactoriesFromObject<T[P]>['__tsTypeAl']>> : 
//   T[P] extends {} ? _ExtractFactoriesFromObject<T[P]> : never//'mistake' & T[P]
//    } 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLHFDQUFxQztBQUVyQyxxQkFBcUI7QUFDckIsNkJBQStFO0FBQ2YsbUJBRG5DLGNBQVEsQ0FDbUM7QUFBYyxtQkFEL0MsY0FBUSxDQUMrQztBQUU5RiwyQkFBMkI7QUErSmQsUUFBQSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBZ0IsQ0FBQztBQUNwQyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFvQixDQUFDO0FBQzFDLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQW9CLENBQUM7QUFDaEQsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzFELHdHQUF3RztBQUMzRixRQUFBLFdBQVcsR0FBRyxDQUFtQixLQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFtQixDQUFDO0FBQzFGLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQWlCLENBQUM7QUFDdkMsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFxQixDQUFDO0FBQ3hELCtFQUErRTtBQUNsRSxRQUFBLFlBQVksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUF5QixDQUFDO0FBQzVFLDZFQUE2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