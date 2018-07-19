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
exports.lazy = (cb) => Joi.lazy(cb);
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
    const factories = Joi.alternatives();
    factories['__isFactory'] = type;
    return factories;
};
// figure out weather I can check for ducplicates..
// typically need to count the has keys and also
// need to then compute the unique set of keys.
exports.objectBundle = (unqiueBundleName) => {
    const object = Joi.object();
    object['unqiueBundleName'] = unqiueBundleName;
    return object;
};
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
/*
export type ExtractFactoriesFromSchema<T extends XSchema> = ExtractFactory<T, T>;
export type ExtractFactoriesFromObject<T extends XSchemaMap> = {
  [K in keyof T] : ExtractFactoriesFromSchema<T[K]>
}


export type ExtractWithFactoriesFromSchema<T extends XSchema> = If<ObjectHasKey<T,'__isFactory'>, T['__isFactory'], ExtractRequired<T, ExtractNull<T, ExtractTSType<T,T>>>>
export type ExtractWithFactoriesFromObject<T extends XSchemaMap> = {
  [K in keyof T] : ExtractFactoriesFromSchema<T[K]>
}
*/
/*
export type OptionalKeys<T extends Record<string, JoiXSchema>> = ({
  [P in keyof T]: If<IsRequired<T[P]>, never, P>
})[keyof T];
export type RequiredKeys<T extends Record<string, JoiXSchema>> = StringOmit<keyof T, OptionalKeys<T>>;


export type ExtractFromObject<T extends Record<string, JoiXSchema>> = Clean<{
  [P in RequiredKeys<T>]: ExtractFromSchema<T[P]>
} & {
  [P in OptionalKeys<T>]?: ExtractFromSchema<T[P]>
}>;
*/
//export type GodFunction<T> = T extends JoiXSchema ? ExtractFromSchema<T> : T extends Record<string, JoiXSchema> ? ExtractFromObject<T> : never
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
/*
const instance: ExtractFromObject<typeof objectSchema>= {
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
};*/
const schema = exports.object().keys({
    a: exports.string().required(),
    b: exports.object().keys({
        c: exports.number().required(),
        d: exports.object().keys({
            f: exports.number().allow(null)
        })
    }).required()
});
/*
const subInstance: ExtractFromSchema<typeof schema> = {
  a: 'sdsa',
  b: {
    c: 1,
     d: {
      
     }
  }
};
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtcHJldi0yMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC1wcmV2LTIxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMkJBQTJCO0FBRzNCLHlCQUFvQjtBQW1EUCxRQUFBLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFnQixDQUFDO0FBQ3BDLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQW9CLENBQUM7QUFDMUMsUUFBQSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBNkIsQ0FBQztBQUN6RCxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBaUIsQ0FBQztBQUN2QyxRQUFBLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFtQixDQUFDO0FBQzdDLFFBQUEsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQXFCLENBQUM7QUFDM0MsUUFBQSxJQUFJLEdBQUksQ0FBb0IsRUFBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBTSxDQUFDO0FBQzNFLHdHQUF3RztBQUN0Ryw2RUFBNkU7QUFDN0UsaUZBQWlGO0FBQ3RFLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBa0IsQ0FBQztBQUMxQyxRQUFBLFlB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