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
function OperateOnXObjectKeys(children, operate, newObject, acc, config = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        if (isChildrenAnArray(children)) {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                if (isXObjectAndHasChildren(child.schema)) {
                    const newAcc = newObject(child.key, acc);
                    yield OperateOnXObjectKeys(child.schema._inner.children, operate, newObject, newAcc, config && config[child.key]);
                }
                else if (child !== undefined) {
                    yield operate(child.key, child.schema, acc, config && config[child.key]);
                }
            }
        }
        else if (children !== undefined) {
            yield operate(children.key, children.schema, acc, config && config[children.key]);
        }
        const test = acc;
    });
}
exports.OperateOnXObjectKeys = OperateOnXObjectKeys;
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDJCQUEyQjtBQUszQix5QkFBb0I7QUF5RVAsUUFBQSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBZ0IsQ0FBQztBQUNwQyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFvQixDQUFDO0FBQzFDLFFBQUEsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQW9CLENBQUM7QUFDaEQsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQWlCLENBQUM7QUFDdkMsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFxQixDQUFDO0FBQ3hELDhFQUE4RTtBQUM5RSx3R0FBd0c7QUFDdEcsNkVBQTZFO0FBQzdFLGlGQUFpRjtBQUN0RSxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQWtCLENBQUM7QUFDMUMsUUFBQSxZQUFZLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBeUIsQ0FBQztBQUMvRCxRQUFBLElBQUksR0FBRyxDQUFtQixL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