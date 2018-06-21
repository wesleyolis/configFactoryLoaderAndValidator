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
const config_1 = require("./config-factory/config");
var config_2 = require("./config-factory/config");
exports.describeConfigSchema = config_2.describe;
exports.validatConfigSchemaAsync = config_2.validateAsync;
class IConfigBundle {
    static newBundleAndResolveConfigAsync(settings = undefined, configSchema, requireConfig = require('config')) {
        return __awaiter(this, void 0, void 0, function* () {
            if (settings == undefined) {
                let config = requireConfig('config');
                yield config_1.validateAsync(configSchema, config);
                return config;
            }
            return JSON.parse(JSON.stringify(settings));
        });
    }
}
exports.IConfigBundle = IConfigBundle;
/*
type ObjectFactoryInstances = IConfigFactory | FactoryInstances
type FactoryInstances = {
    [index:string] : ObjectFactoryInstances
}


export class FactoriesInstancesResolver implements IConfigFactoriesInstances
{
    constructor(public localInstances : FactoryInstances, public parentInstances : FactoryInstances )
    {

    }

    startAsync() : Promise<void>
    {

    }
    stopAsync() : Promise<void>
    {

    }
}

export function LoadConfig(localConfig : JoiX.XObject, parentConfig : JoiX.XObject) : FactoriesInstancesResolver
{

}
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFFckQsa0RBQW1IO0FBQTNHLHdDQUFBLFFBQVEsQ0FBd0I7QUFBRSw0Q0FBQSxhQUFhLENBQTRCO0FBRW5GO0lBRUksTUFBTSxDQUFPLDhCQUE4QixDQUFFLFdBQXlDLFNBQVMsRUFBRSxZQUFpQyxFQUFFLGdCQUF1QyxPQUFPLENBQUMsUUFBUSxDQUFDOztZQUV4TCxJQUFJLFFBQVEsSUFBSSxTQUFTLEVBQ3pCO2dCQUNJLElBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFckMsTUFBTSxzQkFBYSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxNQUFNLENBQUE7YUFFaEI7WUFDRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNEJFIn0=