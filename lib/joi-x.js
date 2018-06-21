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
function isJoiError(err) {
    return err.isJoi && err.name == 'ValidationError' && (err instanceof Error);
}
exports.isJoiError = isJoiError;
/*
export type ExtractFactoriesFromSchema<T extends XSchema> = ExtractFactory<T, undefined>;

export type ExtractFactoriesFromObject<T extends XSchemaMap> = {
  [K in keyof T] : ExtractFactoriesFromSchema<T[K]>
}
*/
/*
export type ExtractWithFactoriesFromSchema<T extends XSchema> = ExtractFactoryOrTsType<T, T>;
export type ExtractWithFactoriesFromObject<T extends XSchemaMap> = {
  [K in keyof T] : ExtractWithFactoriesFromSchema<T[K]>
}
*/
/*
export type ExtractFactoryFromSchema<T extends XSchema> = If<ObjectHasKey<T,'__isFactory'>, T['__isFactory'], never>
export type ExtractFacotryFromObject<T extends XSchemaMap> = {
  [K in keyof T] : ExtractFactoryFromSchema<T[K]>
}*/
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
const instance = {
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
const schema = exports.object().keys({
    a: exports.string().required(),
    b: exports.object().keys({
        c: exports.number().required(),
        d: exports.object().keys({
            f: exports.number().allow(null)
        })
    }).required()
});
const subInstance = {
    a: 'sdsa',
    b: {
        c: 1,
        d: {
            f: null
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvam9pLXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwyQkFBMkI7QUFFM0IseUJBQW9CO0FBNkRQLFFBQUEsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQWdCLENBQUM7QUFDcEMsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBb0IsQ0FBQztBQUMxQyxRQUFBLE9BQU8sR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFvQixDQUFDO0FBQ2hELFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFpQixDQUFDO0FBQ3ZDLFFBQUEsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQW1CLENBQUM7QUFDN0MsUUFBQSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBcUIsQ0FBQztBQUN4RCw4RUFBOEU7QUFDOUUsd0dBQXdHO0FBQ3RHLDZFQUE2RTtBQUM3RSxpRkFBaUY7QUFDdEUsUUFBQSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztBQUM3QyxRQUFBLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFrQixDQUFDO0FBQzFDLFFBQUEsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQXlCLENBQUM7QUFDL0QsUUFBQSxJQUFJLEdBQUcsQ0FBbUIsS0FBUyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBMkMsQ0FBQTtBQUMzRyxRQUFBLGFBQWEsR0FBRyxDQUFtQixLQUFXLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFxQixDQUFBO0FBQ2hHLFFBQUEsYUFBYSxHQUFHLENBQW1CLEtBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQXFCLENBQUE7QUFDaEcsUUFBQSxjQUFjLEdBQUcsQ0FBb0IsS0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBc0IsQ0FBQTtBQUNwRyxRQUFBLFVBQVUsR0FBRyxDQUFtQixNQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFxQixDQUFBO0FBRTdHLElBQVksV0FLWDtBQUxELFdBQVksV0FBVztJQUVyQix1REFBUyxDQUFBO0lBQ1QsdURBQVMsQ0FBQTtJQUNULGlEQUFNLENBQUE7QUFDUixDQUFDLEVBTFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFLdEI7QUFFWSxRQUFBLE9BQU8sR0FBRyxDQUFZLElBQWtCLEVBQUUsRUFBRTtJQUV2RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFTLENBQUM7SUFDMUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFFN0IsT0FBTyxPQUE4QixDQUFDO0FBQ3hDLENBQUMsQ0FBQTtBQUVELG1EQUFtRDtBQUNuRCxnREFBZ0Q7QUFDaEQsK0NBQStDO0FBQ2xDLFFBQUEsWUFBWSxHQUFHLENBQUMsZ0JBQXlCLEVBQUUsRUFBRTtJQUV4RCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFTLENBQUM7SUFDbkMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsZ0JBQWdCLENBQUM7SUFFOUMsT0FBTyxNQUE2QixDQUFBO0FBQ3RDLENBQUMsQ0FBQTtBQUVELG9CQUEyQixHQUFRO0lBQ2pDLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLGlCQUFpQixJQUFJLENBQUMsR0FBRyxZQUFZLEtBQUssQ0FBQyxDQUFDO0FBQzlFLENBQUM7QUFGRCxnQ0FFQztBQXdIRDs7Ozs7O0VBTUU7QUFFRjs7Ozs7RUFLRTtBQUdGOzs7O0dBSUc7QUFHSDs7Ozs7Ozs7Ozs7O0VBWUU7QUFHRixnSkFBZ0o7QUFHaEosTUFBTSxZQUFZLEdBQUc7SUFDbkIsY0FBYyxFQUFFLGNBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ3JELGlCQUFpQixFQUFFLGNBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ2hELFFBQVEsRUFBRSxjQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzdDLEtBQUssRUFBRSxjQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxFQUFFLGNBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN0QixDQUFDLEVBQUUsY0FBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLGNBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUN2QixDQUFDLENBQUMsUUFBUSxFQUFFO0tBQ2QsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNiLE9BQU8sRUFBRSxhQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ25DLEVBQUUsRUFBRSxjQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDeEIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQzFCLENBQUM7QUFHRixNQUFNLFFBQVEsR0FBMEM7SUFDdEQsY0FBYyxFQUFFLEVBQUU7SUFFbEIsaUJBQWlCLEVBQUcsU0FBUztJQUM3QixRQUFRLEVBQUUsRUFBRTtJQUNaLEtBQUssRUFBRTtRQUNMLENBQUMsRUFBRSxNQUFNO1FBQ1QsQ0FBQyxFQUFFO1lBQ0QsQ0FBQyxFQUFFLEdBQUc7U0FDUDtLQUNGO0lBQ0QsT0FBTyxFQUFFLENBQUM7WUFDUixFQUFFLEVBQUUsQ0FBQztTQUNOLENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsY0FBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNCLENBQUMsRUFBRSxjQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDdEIsQ0FBQyxFQUFFLGNBQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUNmLENBQUMsRUFBRSxjQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDdEIsQ0FBQyxFQUFFLGNBQU0sRUFBRSxDQUFDLElBQUksQ0FBQztZQUNmLENBQUMsRUFBRyxjQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1NBQ3pCLENBQUM7S0FDSCxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2QsQ0FBQyxDQUFDO0FBRUgsTUFBTSxXQUFXLEdBQXFDO0lBQ3BELENBQUMsRUFBRSxNQUFNO0lBQ1QsQ0FBQyxFQUFFO1FBQ0QsQ0FBQyxFQUFFLENBQUM7UUFDSCxDQUFDLEVBQUU7WUFDRixDQUFDLEVBQUUsSUFBSTtTQUNQO0tBQ0g7Q0FDRixDQUFDIn0=