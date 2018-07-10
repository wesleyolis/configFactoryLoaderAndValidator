"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
exports.enumString = (values) => Joi.string().allow(values);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUEyQjtBQUszQix5QkFBb0I7QUFpRlAsUUFBQSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBZ0IsQ0FBQztBQUNwQyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFvQixDQUFDO0FBQzFDLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQW9CLENBQUM7QUFDaEQsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQWlCLENBQUM7QUFDdkMsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFxQixDQUFDO0FBQ3hELDhFQUE4RTtBQUM5RSx3R0FBd0c7QUFDdEcsNkVBQTZFO0FBQzdFLGlGQUFpRjtBQUN0RSxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQWtCLENBQUM7QUFDMUMsUUFBQSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBeUIsQ0FBQztBQUMvRCxRQUFBLElBQUksR0FBRyxDQUFtQixL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