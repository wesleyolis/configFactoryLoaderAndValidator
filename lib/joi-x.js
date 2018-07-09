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
exports.LiteralBoolean = (value) => Joi.boolean().allow(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUEyQjtBQUszQix5QkFBb0I7QUFpRlAsUUFBQSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBZ0IsQ0FBQztBQUNwQyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFvQixDQUFDO0FBQzFDLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQW9CLENBQUM7QUFDaEQsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQWlCLENBQUM7QUFDdkMsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFxQixDQUFDO0FBQ3hELDhFQUE4RTtBQUM5RSx3R0FBd0c7QUFDdEcsNkVBQTZFO0FBQzdFLGlGQUFpRjtBQUN0RSxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQWtCLENBQUM7QUFDMUMsUUFBQSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBeUIsQ0FBQztBQUMvRCxRQUFBLElBQUksR0FBRyxDQUFtQixLQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUEyQyxDQUFBO0FBQzNHLFFBQUEsYUFBYSxHQUFHLENBQW1CLEtBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQXFCLENBQUE7QUFDaEcsUUFBQSxhQUFhLEdBQUcsQ0FBbUIsS0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBcUIsQ0FBQTtBQUNoRyxRQUFBLGNBQWMsR0FBRyxDQUFvQixLQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFzQixDQUFBO0FBQ3BHLFFBQUEsVUFBVSxHQUFHLENBQW1CLE1BQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQXFCLENBQUE7QUFFaEcsUUFBQSxXQUFXLEdBQUcsQ0FBQyxDQUFPLEVBQTJCLEVBQUU7SUFFOUQsSUFBSSxPQUFPLEdBQXlDLFNBQVMsQ0FBQztJQUU5RCxJQUFLLENBQXlCLENBQUMsS0FBSyxFQUNwQztRQUNFLE9BQU8sR0FBSSxDQUF5QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztLQUM3RjtJQUVELElBQUksT0FBTyxJQUFJLFNBQVMsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDOUMsT0FBTyxTQUFTLENBQUM7O1FBRWpCLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNoQyxDQUFDLENBQUE7QUFFRCxJQUFZLFdBS1g7QUFMRCxXQUFZLFdBQVc7SUFFckIsdURBQWEsQ0FBQTtJQUNiLHVEQUFhLENBQUE7SUFDYixpREFBVSxDQUFBO0FBQ1osQ0FBQyxFQUxXLFdBQVcsR0FBWCxtQkFBVyxLQUFYLG1CQUFXLFFBS3RCO0FBa0JZLFFBQUEsT0FBTyxHQUFHLENBQVksSUFBa0IsRUFBRSxVQUErQyxFQUFFLEVBQUU7SUFFeEcsSUFBSSxPQUFPLEdBQUksR0FBRyxDQUFDLFlBQVksRUFBMEIsQ0FBQztJQUUxRCxPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNyQixTQUFTLEVBQUU7WUFDVCxhQUFhLEVBQUcsSUFBSTtZQUNwQixZQUFZLEVBQUcsVUFBVTtTQUMxQjtLQUFDLENBQUMsQ0FBQztJQUVOLE9BQVEsT0FBc0MsQ0FBQztBQUNqRCxDQUFDLENBQUE7QUFJRCx3QkFBK0IsQ0FBdUI7SUFFcEQsTUFBTSxNQUFNLEdBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1QixPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsS0FBSyxTQUFTLENBQUM7QUFDL0MsQ0FBQztBQUxELHdDQUtDO0FBRUQsbURBQW1EO0FBQ25ELGdEQUFnRDtBQUNoRCwrQ0FBK0M7QUFDbEMsUUFBQSxZQUFZLEdBQUcsQ0FBQyxnQkFBeUIsRUFBRSxFQUFFO0lBRXhELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQVMsQ0FBQztJQUNuQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztJQUU5QyxPQUFPLE1BQTZCLENBQUE7QUFDdEMsQ0FBQyxDQUFBO0FBRUQsNkJBQW9DLEdBQW1CO0lBRXJELE9BQU8sa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUhELGtEQUdDO0FBRUQsNEJBQW1DLEdBQXNCO0lBRXZELE1BQU0sU0FBUyxHQUF3QixHQUFJLENBQUM7SUFFNUMsSUFBSSxHQUFHO1FBQ0wsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7UUFFNUQsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQVJELGdEQVFDO0FBRUQsMkJBQWtDLFFBQTJEO0lBRTNGLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBSEQsOENBR0M7QUFFRCxpQ0FBd0MsR0FBbUI7SUFFekQsTUFBTSxTQUFTLEdBQXdCLEdBQUksQ0FBQztJQUU1QyxPQUFPLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdkYsQ0FBQztBQUxELDBEQUtDO0FBS0QsOEJBQ0EsUUFBMkQsRUFDM0QsT0FBdUcsRUFDdkcsT0FBa0UsRUFDbEUsZUFBbUUsRUFDbkUsR0FBUyxFQUFFLFNBQWtCLFNBQVM7O1FBRXBDLElBQUksaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQy9CO1lBQ0ksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ3hDO2dCQUNFLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsSUFBSSx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ3pDO29CQUNFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ3JELE1BQU0sb0JBQW9CLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNqSSxHQUFHLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMvQztxQkFDSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQzVCO29CQUNFLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDMUU7YUFDRjtTQUNKO2FBQ0ksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUMvQjtZQUNFLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7Q0FBQTtBQTdCRCxvREE2QkM7QUFFRCw2QkFBb0MsTUFBc0I7SUFFeEQsTUFBTSxhQUFhLEdBQXVCLE1BQU8sQ0FBQztJQUVsRCxPQUFPLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQztBQUMxRixDQUFDO0FBTEQsa0RBS0M7QUFFRCxvQ0FBMkMsTUFBc0I7SUFFL0QsTUFBTSxhQUFhLEdBQThCLE1BQU8sQ0FBQztJQUV6RCxPQUFPLGFBQWEsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLFNBQVMsQ0FBQztBQUM1RixDQUFDO0FBTEQsZ0VBS0M7QUFnQkQsbUVBQW1FO0FBRW5FLGdGQUFnRjtBQUVoRixrRkFBa0Y7QUFDbEYsSUFBSTtBQUNKLDJFQUEyRTtBQUMzRSxJQUFJO0FBRUosMEZBQTBGO0FBQzFGLDJFQUEyRTtBQUMzRSxzQ0FBK0QsTUFBVSxFQUFFLElBQWdCO0lBRXpGLElBQUksSUFBSSxHQUFTLE1BQU0sQ0FBQztJQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFFbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixJQUFHLElBQUksSUFBSSxTQUFTO1lBQ2xCLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUF3QixDQUFDO0FBQ2xDLENBQUM7QUFFRCxnR0FBZ0c7QUFDaEcscUZBQXFGO0FBQ3JGLGdGQUFnRjtBQUNoRiw2SEFBNkg7QUFDN0gsK0ZBQStGO0FBQy9GLG1FQUFtRTtBQUNuRSxtQ0FBbUM7QUFDbkMsTUFBTSxhQUFhLEdBQXNCO0lBQ3pDO1FBQ0UsSUFBSSxFQUFHLENBQUMsUUFBUSxFQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLEVBQUcsUUFBUTtRQUNmLFdBQVcsRUFBRyxRQUFRO0tBQ3ZCO0lBQ0Q7UUFDRSxJQUFJLEVBQUcsQ0FBQyxRQUFRLEVBQUMsT0FBTyxDQUFDO1FBQ3pCLElBQUksRUFBRyxRQUFRO1FBQ2YsV0FBVyxFQUFHLFNBQVM7S0FDeEI7SUFDRDtRQUNFLElBQUksRUFBRyxDQUFDLFFBQVEsRUFBQyxTQUFTLENBQUM7UUFDM0IsSUFBSSxFQUFHLE9BQU87UUFDZCxXQUFXLEVBQUcsUUFBUTtLQUN2QjtDQUNBLENBQUM7QUFPRix3R0FBd0c7QUFFeEcsNEdBQTRHO0FBRTVHLG9GQUFvRjtBQUVwRixtRUFBbUU7QUFFbkUsOEJBQThCO0FBQzlCLHdCQUF3QjtBQUN4QixJQUFJO0FBRUosd0NBQXdDO0FBRXhDLHFEQUFxRDtBQUNyRCxJQUFJO0FBQ0osWUFBWTtBQUNaLElBQUk7QUFFSiw0Q0FBNEM7QUFFNUMsa0JBQWtCO0FBQ2xCLElBQUk7QUFDSix3REFBd0Q7QUFFeEQsNENBQTRDO0FBQzVDLElBQUk7QUFFSiw0R0FBNEc7QUFDNUcsSUFBSTtBQUVKLElBQUk7QUFHSix3RkFBd0Y7QUFDeEYsbURBQW1EO0FBQ25ELHdDQUF3QztBQUN4QyxrR0FBa0c7QUFDbEcsNEVBQTRFO0FBQzVFLDRHQUE0RztBQUM1RywwR0FBMEc7QUFDMUcsdUVBQXVFO0FBQ3ZFLDRCQUNFLE1BQXNCLEVBQ3RCLE9BQWlJLEVBQ2pJLE9BQThCLEVBQzlCLGVBQXVHLEVBQ3ZHLEdBQVMsRUFDVCxNQUFlLENBQUMsQ0FBQyxFQUNqQixNQUEyQixTQUFTLEVBQ3BDLFNBQWtCLFNBQVM7O1FBRTNCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUM3QztZQUNFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWpFLElBQUksUUFBUSxFQUNaO2dCQUNFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBbUIsQ0FBQyxDQUFDLENBQUUsa0dBQWtHO2dCQUVySixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFDeEM7b0JBQ0UsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBa0UsQ0FBQztvQkFDekYsbUZBQW1GO29CQUNuRiw4SEFBOEg7b0JBRTlILElBQUksTUFBTSxHQUFHLEtBQTZCLENBQUM7b0JBQzNDLElBQUcsSUFBSSxDQUFDLFdBQVc7d0JBQ2pCLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNqQyxrSEFBa0g7b0JBQ2xILDJDQUEyQztvQkFFN0MsTUFBTyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsRUFBRSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNsSTtnQkFFRCxPQUFPLGVBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUNsRDtZQUNELHlHQUF5RztTQUMxRztRQUVELG1FQUFtRTtRQUNuRSxNQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQUE7QUEzQ0QsZ0RBMkNDO0FBR0Qsb0JBQTJCLEdBQVE7SUFDakMsT0FBTyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksaUJBQWlCLElBQUksQ0FBQyxHQUFHLFlBQVksS0FBSyxDQUFDLENBQUM7QUFDOUUsQ0FBQztBQUZELGdDQUVDIn0=