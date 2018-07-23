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
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.startAsync())));
    }
    stopAsync() {
        return Promise.all(this.factoryInstances.map(f => f().then((self) => self.stopAsync())));
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
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false, skipValidation = false) {
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
exports.LoadConfig = LoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGtFQUFxRTtBQUNoRCw0QkFEYiw4QkFBUyxDQUNxQjtBQUFFLDBCQURyQixvQ0FBZSxDQUNxQjtBQUV2RCw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRzlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFHNUIsd0NBQXFFO0FBQTdELDhCQUFBLFdBQVcsQ0FBQTtBQUFnQiw2QkFBQSxVQUFVLENBQUE7QUFLN0M7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBa0QsU0FBUyxFQUFFLFlBQW9DLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXBNLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQUVELGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxTQUFTLEVBQUUsSUFBaUMsQ0FBQyxDQUFDO0FBZ0IzRjtJQUtJLFlBQW9CLFFBQWEsRUFBVSxnQkFBb0Q7UUFBM0UsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFL0YsQ0FBQztJ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