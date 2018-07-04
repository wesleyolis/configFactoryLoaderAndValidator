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
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = null) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        const children = JoiX.getXObjectChildrens(configSchema);
        if (configOptional)
            JoiX.OperateOnXObjectKeys(children, (key, schema, acc, config) => {
                schema.optional();
            }, (key, acc) => { }, null);
        const validateConfigSettings = yield JoiX.validate(configSettings, originalConfigSchema);
        let loadedConfig;
        let factoryConfig = [];
        JoiX.OperateOnXObjectKeys(children, (key, schema, acc, config) => {
            if (JoiX.isFactory(schema)) {
                const lazyLoader = () => {
                    let factoryInstance = undefined;
                    if (factoryInstance) {
                        try {
                            factoryInstance = schema.__NewFactory(config[key]);
                        }
                        catch (e) {
                            if (configOptional)
                                throw new Error().message += JSON.stringify(e);
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
                let value = config[key];
                if (configOptional) {
                    try {
                        value = JoiX.validate(config[key], schema);
                    }
                    catch (e) {
                        throw new Error().message += JSON.stringify(e);
                    }
                }
                acc[key] = value;
            }
        }, (key, acc) => {
            acc[key] = {};
            return acc[key];
        }, loadedConfig, validateConfigSettings);
        return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
    });
}
exports.LoadConfig = LoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFFckQsa0RBQW1IO0FBQTNHLHdDQUFBLFFBQVEsQ0FBd0I7QUFBRSw0Q0FBQSxhQUFhLENBQTRCO0FBRW5GLDRCQUE0QjtBQUU1QjtJQUVJLE1BQU0sQ0FBTyw4QkFBOEIsQ0FBRSxXQUF5QyxTQUFTLEVBQUUsWUFBaUMsRUFBRSxnQkFBdUMsT0FBTyxDQUFDLFFBQVEsQ0FBQzs7WUFFeEwsSUFBSSxRQUFRLElBQUksU0FBUyxFQUN6QjtnQkFDSSxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXJDLE1BQU0sc0JBQWEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sTUFBTSxDQUFBO2FBRWhCO1lBQ0QsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztLQUFBO0NBS0o7QUFsQkQsc0NBa0JDO0FBZ0JEO0lBS0ksWUFBb0IsTUFBVyxFQUFVLGdCQUEyQztRQUFoRSxXQUFNLEdBQU4sTUFBTSxDQUFLO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEyQjtJQUVwRixDQUFDO0lBRUQsVUFBVTtRQUVOLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTO1FBRUwsT0FB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