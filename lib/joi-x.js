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
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMkI7QUFFM0IseUJBQW9CO0FBa0RQLFFBQUEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQWdCLENBQUM7QUFDcEMsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBb0IsQ0FBQztBQUMxQyxRQUFBLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFvQixDQUFDO0FBQ2hELFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFpQixDQUFDO0FBQ3ZDLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBcUIsQ0FBQztBQUMzQyxRQUFBLElBQUksR0FBSSxDQUFvQixFQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFNLENBQUM7QUFDM0Usd0dBQXdHO0FBQ3RHLDZFQUE2RTtBQUM3RSxpRkFBaUY7QUFDdEUsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFrQixDQUFDO0FBQzFDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFB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