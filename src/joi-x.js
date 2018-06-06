"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var Joi = require("joi");
__export(require("joi"));
exports.any = function () { return Joi.any(); };
exports.bool = function () { return Joi.bool(); };
exports.boolean = function () { return Joi.boolean(); };
exports.number = function () { return Joi.number(); };
exports.string = function () { return Joi.string(); };
exports.date = function () { return Joi.date(); };
exports.binary = function () { return Joi.binary(); };
exports.func = function () { return Joi.func(); };
exports.lazy = function (cb) { return Joi.lazy(cb); };
// alternatives:(...types : SchemaLike[] | SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
// alt:(types : SchemaLike) => Joi.alternatives(types) as AlternativesSchema,
//alt:(...types : SchemaLike[]) => Joi.alternatives(types) as AlternativesSchema,
exports.object = function () { return Joi.object(); };
exports.array = function () { return Joi.array(); };
JoiXSchema ? ExtractFromSchema(T, Record(ExtractFromObject(never)))
    :
;
var objectSchema = {
    numberRequired: exports.number().required().min(100).max(200),
    numberNotRequired: exports.number().min(100).allow(null).required(),
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
var instance = {
    numberRequired: 42,
    numberNotRequired: undefined,
    myString: '',
    myObj: {
        a: 'sdsa',
        b: {
            c: 1
        }
    },
    myArray: [{
            a1: 2
        }]
};
var schema = exports.object().keys({
    a: exports.string().required(),
    b: exports.object().keys({
        c: exports.number().required()
    }).required()
});
var subInstance = {
    a: 'sdsa',
    b: {
        c: 1
    }
};
