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
const BluebirdPromisify = require("./util/bluebird-promisify");
exports.BluebirdPromisify = BluebirdPromisify;
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
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        if (configOptional) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtEQUErRDtBQUNsQyw4Q0FBaUI7QUFFOUMsNkRBQTREO0FBQzdDLGtCQUFHO0FBR2xCLHlDQUF3QztBQUNuQiw4QkFBUztBQUU5QiwyQkFBMEI7QUFDWCxrQkFBRztBQUVsQixnQ0FBK0I7QUFDZixvQkFBSTtBQUVwQiwyQ0FBMEM7QUFFMUIsb0JBQUk7QUFDcEIsb0RBQXFEO0FBQ3JELG1DQUF5QztBQUV6QyxrREFBbUg7QUFBM0csd0NBQUEsUUFBUSxDQUF3QjtBQUFFLDRDQUFBLGFBQWEsQ0FBNEI7QUFFbkYsNEJBQTRCO0FBRzVCLHdDQUEyQztBQUFuQyw4QkFBQSxXQUFXLENBQUE7QUFFbkI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBeUMsU0FBUyxFQUFFLFlBQWlDLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXhMLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWdCRDtJQUtJLFlBQW9CLFFBQWEsRUFBVSxnQkFBb0Q7UUFBM0UsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFL0YsQ0FBQztJQUVELFVBQVU7UUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUks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