"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFactories = require("./config-factory");
exports.ConfigFactories = configFactories;
const CFT = require("./config-factory/config-factory-types");
exports.CFT = CFT;
const factories = require("./factories");
exports.Factories = factories;
const Joi = require("Joi");
exports.Joi = Joi;
const JoiX = require("./joi-x");
exports.JoiX = JoiX;
const JoiV = require("./joi-x-validators");
exports.JoiV = JoiV;
var config_1 = require("./config-factory/config");
exports.describeConfigSchema = config_1.describe;
exports.validatConfigSchemaAsync = config_1.validateAsync;
function CreateFactoryAsync(factory, settings) {
    const unWrappedSettings = delete settings.factory;
    return factory.createAsync(unWrappedSettings);
}
exports.CreateFactoryAsync = CreateFactoryAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBbUQ7QUFDeEIsMENBQWU7QUFFMUMsNkRBQTREO0FBQzdDLGtCQUFHO0FBR2xCLHlDQUF3QztBQUNuQiw4QkFBUztBQUU5QiwyQkFBMEI7QUFDWCxrQkFBRztBQUVsQixnQ0FBK0I7QUFDZixvQkFBSTtBQUVwQiwyQ0FBMEM7QUFFMUIsb0JBQUk7QUFFcEIsa0RBQW1IO0FBQTNHLHdDQUFBLFFBQVEsQ0FBd0I7QUFBRSw0Q0FBQSxhQUFhLENBQTRCO0FBR25GLDRCQUFrRixPQUF3QixFQUFFLFFBQVk7SUFFcEgsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFFbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBTEQsZ0RBS0MifQ==