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
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.startAsync())));
    }
    stopAsync() {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.stopAsync())));
    }
}
exports.FactoriesInstancesResolver = FactoriesInstancesResolver;
class LoadConfigErrors {
}
LoadConfigErrors.configurationMissing = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
LoadConfigErrors.failedToNewFactory = "FailedToLoadFactory";
exports.LoadConfigErrors = LoadConfigErrors;
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        if (configOptional) {
            const optionalConfigSchema = { ref: JoiX.object() };
            const children = JoiX.getXObjectChildrens(configSchema);
            try {
                // await JoiX.OperateOnXObjectKeys(children, async (key : string, schema : any, acc : {ref:JoiX.XObjectSchema}, config : any) => {
                //     let object : Record<string,JoiX.AnySchema> = {};
                //     object[key] = (schema as Joi.AnySchema).optional();
                //     acc.ref = acc.ref.keys(object);
                // }, (key : string, acc : {ref : JoiX.XObjectSchema}) => {
                //     let object = JoiX.object();
                //     let keysObject : Record<string, JoiX.AnySchema> = {};
                //     keysObject[key] = object;
                //     // has to be delayed.
                //     acc.ref = acc.ref.keys(keysObject);
                //     return {ref : object};
                // }, (key : string, parentAcc, acc ) => {
                //     return parentAcc
                // },
                // {ref:optionalConfigSchema});
                yield JoiX.OperateOnXObjectKeys(children, (key, schema, acc, config) => __awaiter(this, void 0, void 0, function* () {
                    let keysObject = {};
                    keysObject[key] = schema.optional();
                    acc.ref = acc.ref.keys(keysObject);
                }), (key, schema, acc) => {
                    return { ref: _.cloneDeep(schema) };
                }, (key, parentAcc, acc) => {
                    let keysObject = {};
                    keysObject[key] = acc.ref;
                    return { ref: parentAcc.ref.keys(keysObject) };
                }, optionalConfigSchema);
            }
            catch (e) {
                console.log(JSON.stringify(e));
            }
            configSchema = optionalConfigSchema.ref;
        }
        const children = JoiX.getXObjectChildrens(originalConfigSchema);
        const validateConfigSettings = yield JoiX.validate(configSettings, configSchema);
        let loadedConfig = {};
        let factoryConfig = [];
        yield JoiX.OperateOnXObjectKeys(children, (key, schema, acc, configValue) => __awaiter(this, void 0, void 0, function* () {
            const factory = JoiX.findFactory(schema);
            if (factory) {
                let factoryInstance = undefined;
                const lazyLoader = () => __awaiter(this, void 0, void 0, function* () {
                    if (factoryInstance === undefined) {
                        try {
                            factoryInstance = factory.__newFactory(configValue);
                            yield factoryInstance.createFactoryAsync(configValue);
                            if (lazyLoad)
                                yield factoryInstance.startAsync();
                        }
                        catch (e) {
                            if (configOptional)
                                throw new VError_1.VError({ name: LoadConfigErrors.configurationMissing, cause: e }, `factory at key [${key}] missing`);
                            else
                                throw new VError_1.VError({ name: LoadConfigErrors.failedToNewFactory, cause: e }, `failed to new factory [${key}]`);
                        }
                    }
                    return factoryInstance;
                });
                let lazyLoaderPromise = () => { return lazyLoader(); };
                if (!lazyLoad) {
                    const resolved = yield lazyLoader();
                    lazyLoaderPromise = () => Promise.resolve(resolved);
                }
                factoryConfig.push(lazyLoaderPromise);
                Object.defineProperty(acc, key, { get: lazyLoaderPromise });
            }
            else {
                let propertyValue = () => configValue;
                if (configOptional) {
                    try {
                        const value = yield JoiX.validate(configValue, schema);
                        propertyValue = () => value;
                    }
                    catch (e) {
                        propertyValue = () => { throw new VError_1.VError({ name: LoadConfigErrors.configurationMissing, cause: e }, `factory at key [${key}] missing`); };
                    }
                }
                Object.defineProperty(acc, key, { get: propertyValue });
            }
        }), (key, acc) => {
            return {};
        }, (key, parentAcc, acc) => {
            parentAcc[key] = acc;
            return parentAcc;
        }, loadedConfig, validateConfigSettings);
        return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
    });
}
exports.LoadConfig = LoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFFNUI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBeUMsU0FBUyxFQUFFLFlBQWlDLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXhMLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWdCRDtJQUtJLFlBQW9CLE1BQVcsRUFBVSxnQkFBb0Q7UUFBekUsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFN0YsQ0FBQztJQUVELFVBQVU7UUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxD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