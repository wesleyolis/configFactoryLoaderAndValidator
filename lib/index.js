"use strict";
//import {Promisify, PromisifyReturn} from './util/bluebird-promisify';
//export {Promisify as BluebirdPromisify, PromisifyReturn};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    static newBundleAndResolveConfigAsync(settings = 42, configSchema, requireConfig = () => require('config')) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVFQUF1RTtBQUN2RSwyREFBMkQ7Ozs7Ozs7Ozs7QUFFM0QsNkRBQTREO0FBQzdDLGtCQUFHO0FBR2xCLHlDQUF3QztBQUNuQiw4QkFBUztBQUc5QiwyQkFBMEI7QUFDWCxrQkFBRztBQUVsQixnQ0FBK0I7QUFDZixvQkFBSTtBQUVwQiwyQ0FBMEM7QUFFMUIsb0JBQUk7QUFDcEIsb0RBQXFEO0FBQ3JELG1DQUF5QztBQUV6QyxrREFBbUg7QUFBM0csd0NBQUEsUUFBUSxDQUF3QjtBQUFFLDRDQUFBLGFBQWEsQ0FBNEI7QUFFbkYsNEJBQTRCO0FBRzVCLHdDQUF5RDtBQUFqRCw4QkFBQSxXQUFXLENBQUE7QUFLbkI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBa0QsRUFBRSxFQUFFLFlBQW9DLEVBQUUsZ0JBQXVDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRW5NLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FDMUIsQ0FBQztnQkFDRyxJQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXJDLE1BQU0sc0JBQWEsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7WUFFakIsQ0FBQztZQUNELE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDcEIsQ0FBQztLQUFBO0NBS0o7QUFsQkQsc0NBa0JDO0FBRUQsYUFBYSxDQUFDLDhCQUE4QixDQUFDLFNBQVMsRUFBRSxJQUFpQyxDQUFDLENBQUM7QUFnQjNGO0lBS0ksWUFBb0IsUUFBYSxFQUFVLGdCQUFvRDtRQUEzRSxhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQztJQUUvRixDQUFDO0lBRUQsVUFB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