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
const VError_1 = require("VError");
var config_2 = require("./config-factory/config");
exports.describeConfigSchema = config_2.describe;
exports.validatConfigSchemaAsync = config_2.validateAsync;
const _ = require("lodash");
class IConfigBundle {
    static newBundleAndResolveConfigAsync(settings = undefined, configSchema, requireConfig = require('config')) {
        return __awaiter(this, void 0, void 0, function* () {
            if (settings == undefined) {
                let config = requireConfig('config');
                yield config_1.validateAsync(configSchema, config);
                return config;
            }
            return settings;
        });
    }
}
exports.IConfigBundle = IConfigBundle;
class FactoriesInstancesResolver {
    constructor(config, factoryInstances) {
        this.config = config;
        this.factoryInstances = factoryInstances;
    }
    startAsync() {
        return Promise.all(this.factoryInstances.map(f => f().startAsync()));
    }
    stopAsync() {
        return Promise.all(this.factoryInstances.map(f => f().stopAsync()));
    }
}
exports.FactoriesInstancesResolver = FactoriesInstancesResolver;
class Errors {
}
Errors.configurationMissing = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
Errors.failedToNewFactory = "FailedToLoadFactory";
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        if (configOptional) {
            const children = JoiX.getXObjectChildrens(configSchema);
            JoiX.OperateOnXObjectKeys(children, (key, schema, acc, config) => {
                schema.optional();
            }, (key, acc) => { }, null);
        }
        const children = JoiX.getXObjectChildrens(originalConfigSchema);
        const validateConfigSettings = yield JoiX.validate(configSettings, configSchema);
        let loadedConfig = {};
        let factoryConfig = [];
        JoiX.OperateOnXObjectKeys(children, (key, schema, acc, configValue) => __awaiter(this, void 0, void 0, function* () {
            const factory = JoiX.findFactory(schema);
            if (factory) {
                const lazyLoader = () => {
                    let factoryInstance = undefined;
                    if (factoryInstance === undefined) {
                        try {
                            factoryInstance = factory.__newFactory(configValue);
                        }
                        catch (e) {
                            if (configOptional)
                                throw new VError_1.VError({ name: Errors.configurationMissing, cause: e }, `factory at key [$key] missing`);
                            else
                                throw new VError_1.VError({ name: Errors.failedToNewFactory, cause: e }, `failed to new factory [$key]`);
                        }
                    }
                    return factoryInstance;
                };
                if (!lazyLoad)
                    lazyLoader();
                factoryConfig.push(lazyLoader);
                Object.defineProperty(acc, key, { get: lazyLoader });
            }
            else {
                let value = configValue;
                if (configOptional) {
                    try {
                        value = yield JoiX.validate(configValue, schema);
                    }
                    catch (e) {
                        throw new VError_1.VError({ name: Errors.configurationMissing, cause: e }, `factory at key [$key] missing`);
                    }
                }
                acc[key] = value;
            }
        }), (key, acc) => {
            acc[key] = {};
            return acc[key];
        }, loadedConfig, validateConfigSettings);
        return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
    });
}
exports.LoadConfig = LoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFFNUI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBeUMsU0FBUyxFQUFFLFlBQWlDLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXhMLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWdCRDtJQUtJLFlBQW9CLE1BQVcsRUFBVSxnQkFBMkM7UUFBaEUsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBMkI7SUFFcEYsQ0FBQztJQUVELFVBQVU7UUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQs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