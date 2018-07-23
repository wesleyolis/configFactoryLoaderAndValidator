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
const bluebird_promisify_1 = require("./util/bluebird-promisify");
exports.BluebirdPromisify = bluebird_promisify_1.Promisify;
exports.PromisifyReturn = bluebird_promisify_1.PromisifyReturn;
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
var index_1 = require("./config/index");
exports.configAsync = index_1.configAsync;
exports.loadConfig = index_1.loadConfig;
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
IConfigBundle.newBundleAndResolveConfigAsync(undefined, null);
class FactoriesInstancesResolver {
    constructor(settings, factoryInstances) {
        this.settings = settings;
        this.factoryInstances = factoryInstances;
    }
    startAsync() {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.startAsync()))).catch((e) => {
            throw e;
        });
    }
    stopAsync() {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.stopAsync()))).catch((e) => {
            throw e;
        });
    }
}
exports.FactoriesInstancesResolver = FactoriesInstancesResolver;
class LoadConfigErrors {
}
// This is an error message is used to resolve all existing test that require special configuration
// to run. this will allow us to simple see a test failing, were the config is just missing.
LoadConfigErrors.configurationMissing = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
LoadConfigErrors.failedToNewFactory = "FailedToLoadFactory";
exports.LoadConfigErrors = LoadConfigErrors;
function genericLoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false, skipValidation = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        if (configOptional && !skipValidation) {
            // I would like to be able to define common genrics in which I then basically type this call back function
            // back in.
            // The next step, would be to create and abstraction for the accumulator, which one then need to spesify one operator.
            // then from, what makes things simpler is and any type accumulator, because then we don't care object distingishing the object types.
            // that and look at migrating OperateOnXObjectKeys onto this method, which is more genric and actually handles all the cases.
            const optionalConfigSchema = yield JoiX.OperateOnJoiSchema(configSchema, (schema, acc, pos, key, configValue) => __awaiter(this, void 0, void 0, function* () {
                const newSchema = schema.optional();
                switch (acc.kind) {
                    case 'array':
                        {
                            acc.items.push(newSchema);
                        }
                        break;
                    case 'alter':
                        {
                            acc.matches.push(newSchema);
                        }
                        break;
                    case 'object':
                        {
                            if (key != undefined)
                                acc.keys[key] = newSchema;
                            else
                                throw Error("object must always have a key"); // what I could look at doing is that the key, be hidden away in the accumulator,
                            // but that would mean, can't just operate on things.. probably what I should be doing is having and undefine key word, which means the 
                            // their was no present for the key in the first place.
                        }
                        break;
                    case 'accumulator': {
                        acc.accumulator = newSchema; // Could actually jsut give the accumulator a single joi value here, it shouldn't actually matter.
                        break;
                    }
                }
            }), (kind) => {
                switch (kind) {
                    case 'array':
                        {
                            return {
                                kind: 'array',
                                items: [],
                                newContainerObject: () => Joi.array().optional()
                            };
                        }
                    case 'alter':
                        {
                            return {
                                kind: 'alter',
                                matches: [],
                                newContainerObject: () => Joi.alternatives().optional()
                            };
                        }
                    case 'object':
                        {
                            return {
                                kind: 'object',
                                keys: {},
                                newContainerObject: () => Joi.object().optional()
                            };
                        }
                    default:
                        throw Error('Why the hell do I need default type'); // This is clearly another bug, in which we need to report, we starting to bleed a little.
                    // at least we can start to improve the ecosystem.
                }
            }, (key, schema, parentAcc, acc) => {
                // would just be nice here to use a read only type, which means has to be assign before ususage.
                let typeContainer = Joi.object();
                // if (key == undefined && acc.newContainerObject != null)
                //     typeContainer = acc.newContainerObject();
                switch (acc.kind) {
                    case 'array':
                        {
                            typeContainer = acc.newContainerObject().items(acc.items);
                        }
                        break;
                    case 'alter':
                        {
                            typeContainer = acc.newContainerObject().try(acc.matches);
                        }
                        break;
                    case 'object':
                        {
                            typeContainer = acc.newContainerObject().keys(acc.keys);
                        }
                        break;
                }
                // parent could also be null.
                switch (parentAcc.kind) {
                    case 'array':
                        {
                            parentAcc.items.push(typeContainer);
                        }
                        break;
                    case 'alter':
                        {
                            parentAcc.matches.push(typeContainer);
                        }
                        break;
                    case 'object':
                        {
                            if (key)
                                parentAcc.keys[key] = typeContainer;
                            else
                                throw Error("Object must always have a key");
                        }
                        break;
                    case 'accumulator':
                        {
                            parentAcc.accumulator = typeContainer;
                        }
                        break;
                }
                return parentAcc;
            }, { kind: 'accumulator', accumulator: null });
            // this could be simplified and we can get away from casting.
            configSchema = optionalConfigSchema.accumulator;
        }
        const children = JoiX.getXObjectChildrens(originalConfigSchema);
        let configValidationSettingsResult = undefined;
        if (skipValidation) {
            configValidationSettingsResult = configSettings;
        }
        else {
            configValidationSettingsResult = yield JoiX.validate(configSettings, configSchema);
        }
        const validateConfigSettings = configValidationSettingsResult;
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
                            if (factoryInstance['injectConfig'] != undefined)
                                factoryInstance.injectConfig(configSettings);
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
exports.genericLoadConfig = genericLoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtFQUFxRTtBQUNoRCw0QkFEYiw4QkFBUyxDQUNxQjtBQUFFLDBCQURyQixvQ0FBZSxDQUNxQjtBQUV2RCw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRzlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFHNUIsd0NBQXFFO0FBQTdELDhCQUFBLFdBQVcsQ0FBQTtBQUFnQiw2QkFBQSxVQUFVLENBQUE7QUFLN0M7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBa0QsU0FBUyxFQUFFLFlBQW9DLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXBNLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQUVELGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxTQUFTLEVBQUUsSUFBaUMsQ0FBQyxDQUFDO0FBZ0IzRjtJQUtJLFlBQW9CLFFBQWEsRUFBVSxnQkFBb0Q7UUFBM0UsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFL0YsQ0FBQztJ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