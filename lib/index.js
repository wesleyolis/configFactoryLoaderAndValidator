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
            const optionalConfigSchema = yield JoiX.OperateOnJoiSchema(configSchema, (schema, acc, key, configValue) => __awaiter(this, void 0, void 0, function* () {
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
                    case 'undefined': {
                        acc = newSchema;
                        break;
                    }
                }
            }), (schema) => {
                if (JoiX.isXArrayHasChildren(schema)) {
                    const newAcc = {
                        kind: 'array',
                        items: [],
                        newContainerObject: () => Joi.array().optional()
                    };
                    return newAcc;
                }
                else if (JoiX.isXAlternativesHasChildren(schema)) {
                    const newAcc = {
                        kind: 'alter',
                        matches: [],
                        newContainerObject: () => Joi.alternatives().optional()
                    };
                    return newAcc;
                }
                else {
                    const newAcc = {
                        kind: 'object',
                        keys: {},
                        newContainerObject: () => Joi.object().optional()
                    };
                    return newAcc;
                }
            }, (key, schema, parentAcc, acc) => {
                let typeParentAcc;
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
                    case 'undefined':
                        {
                            parentAcc = typeContainer; // this is a little bit hacky but it should work.
                        }
                        break;
                }
                return parentAcc;
            }, { kind: 'undefined' });
            // this could be simplified and we can get away from casting.
            configSchema = optionalConfigSchema;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFHNUI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBeUMsU0FBUyxFQUFFLFlBQWlDLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXhMLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWdCRDtJQUtJLFlBQW9CLE1BQVcsRUFBVSxnQkFBb0Q7UUFBekUsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFN0YsQ0FBQztJQUVELFVBQVU7UUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxTQUFTO1FBRUwsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0NBQ0o7QUFsQkQsZ0VBa0JDO0FBRUQ7O0FBQ29CLHFDQUFvQixHQUFZLHVCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzNGLG1DQUFrQixHQUFZLHFCQUFxQixDQUFDO0FBRnhFLDRDQUdDO0FBRUQsb0JBRUMsY0FBb0IsRUFBRSxZQUFnQixFQUFFLFdBQXFCLEtBQUssRUFBRSxpQkFBMkIsS0FBSzs7UUFFakcsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZELElBQUksY0FBYyxFQUNsQjtZQUNJLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQTZCLFlBQVksRUFDbkcsQ0FBTyxNQUFzQixFQUFFLEdBQWdDLEVBQUUsR0FBd0IsRUFBRSxXQUE4QixFQUFrQixFQUFFO2dCQUV6SSxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRXBDLFFBQU8sR0FBRyxDQUFDLElBQUksRUFDZjtvQkFDSSxLQUFLLE9BQU87d0JBQUc7NEJBQ1gsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQzdCO3dCQUNELE1BQU07b0JBRU4sS0FBSyxPQUFPO3dCQUFHOzRCQUNYLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3lCQUMvQjt3QkFDRCxNQUFNO29CQUVOLEtBQUssUUFBUTt3QkFBRzs0QkFDWixJQUFJLEdBQUcsSUFBSSxTQUFTO2dDQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQzs7Z0NBRTFCLE1BQU0sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBRyxpRkFBaUY7NEJBQ2pJLHdJQUF3STs0QkFDeEksdURBQXVEO3lCQUM5RDt3QkFDRCxNQUFNO29CQUNOLEtBQUssV0FBVyxDQUFDLENBQUM7d0JBQ2QsR0FBRyxHQUFHLFNBQThCLENBQUM7d0JBRXpDLE1BQU07cUJBQ0w7aUJBQ0o7WUFFTCxDQUFDLENBQUEsRUFDRCxDQUFDLE1BQXNCLEVBQStCLEVBQUU7Z0JBQ3BELElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxFQUNwQztvQkFDSSxNQUFNLE1BQU0sR0FDWjt3QkFDSSxJQUFJLEVBQUcsT0FBTzt3QkFDZCxLQUFLLEVBQUcsRUFBRTt3QkFDVixrQkFBa0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO3FCQUNuRCxDQUFBO29CQUVELE9BQU8sTUFBTSxDQUFDO2lCQUNqQjtxQkFDSSxJQUFJLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLENBQUMsRUFDaEQ7b0JBQ0ksTUFBTSxNQUFNLEdBQ1o7d0JBQ0ksSUFBSSxFQUFHLE9BQU87d0JBQ2QsT0FBTyxFQUFHLEVBQUU7d0JBQ1osa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsRUFBRTtxQkFDMUQsQ0FBQTtvQkFFRCxPQUFPLE1BQU0sQ0FBQztpQkFDakI7cUJBRUQ7b0JBQ0ksTUFBTSxNQUFNLEdBQ1o7d0JBQ0ksSUFBSSxFQUFHLFFBQVE7d0JBQ2YsSUFBSSxFQUFHLEVBQUU7d0JBQ1Qsa0JBQWtCLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtxQkFDcEQsQ0FBQTtvQkFFRCxPQUFPLE1BQU0sQ0FBQztpQkFDakI7WUFDTCxDQUFDLEVBQ0QsQ0FBQyxHQUF3QixFQUFFLE1BQXNCLEVBQUUsU0FBc0MsRUFBRSxHQUFnQyxFQUErQixFQUFFO2dCQUV4SixJQUFJLGFBQTZCLENBQUM7Z0JBRWxDLElBQUksYUFBYSxHQUFvQixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRWxELDBEQUEwRDtnQkFDMUQsZ0RBQWdEO2dCQUVoRCxRQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQ2Y7b0JBQ0ksS0FBSyxPQUFPO3dCQUFHOzRCQUNYLGFBQWEsR0FBRyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO3lCQUM3RDt3QkFDRCxNQUFNO29CQUVOLEtBQUssT0FBTzt3QkFBRzs0QkFDWCxhQUFhLEdBQUcsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt5QkFDN0Q7d0JBQ0QsTUFBTTtvQkFFTixLQUFLLFFBQVE7d0JBQUc7NEJBQ1osYUFBYSxHQUFHLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzNEO3dCQUNELE1BQU07aUJBQ1Q7Z0JBRUQsNkJBQTZCO2dCQUM3QixRQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQ3JCO29CQUNJLEtBQUssT0FBTzt3QkFBRzs0QkFDWCxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt5QkFDdkM7d0JBQ0QsTUFBTTtvQkFFTixLQUFLLE9BQU87d0JBQUc7NEJBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7eUJBQ3pDO3dCQUNELE1BQU07b0JBRU4sS0FBSyxRQUFRO3dCQUFHOzRCQUVaLElBQUcsR0FBRztnQ0FDRixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQzs7Z0NBRXBDLE1BQU0sS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7eUJBQ3BEO3dCQUNELE1BQU07b0JBQ04sS0FBSyxXQUFXO3dCQUFFOzRCQUNkLFNBQVMsR0FBRyxhQUFrQyxDQUFDLENBQUMsaURBQWlEO3lCQUNwRzt3QkFFRCxNQUFNO2lCQUNUO2dCQUVELE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxXQUFXLEVBQXNCLENBQUMsQ0FBQztZQUM1Qyw2REFBNkQ7WUFFN0QsWUFBWSxHQUFHLG9CQUEwQyxDQUFDO1NBRTdEO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFaEUsTUFBTSxzQkFBc0IsR0FBUyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXZGLElBQUksWUFBWSxHQUFTLEVBQUUsQ0FBQztRQUM1QixJQUFJLGFBQWEsR0FBd0MsRUFBRSxDQUFDO1FBRTVELE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFPLEdBQVksRUFBRSxNQUFZLEVBQUUsR0FBUyxFQUFFLFdBQWlCLEVBQWtCLEVBQUU7WUFFekgsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV4QyxJQUFJLE9BQU8sRUFDWDtnQkFDSSxJQUFJLGVBQWUsR0FBZ0MsU0FBUyxDQUFDO2dCQUU3RCxNQUFNLFVBQVUsR0FBRyxHQUFTLEVBQUU7b0JBRTFCLElBQUksZUFBZSxLQUFLLFNBQVMsRUFDakM7d0JBQ0ksSUFDQTs0QkFDSSxlQUFlLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFFcEQsTUFBTSxlQUFlLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBRXRELElBQUksUUFBUTtnQ0FDUixNQUFNLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDMUM7d0JBQ0QsT0FBTSxDQUFDLEVBQ1A7NEJBQ0ksSUFBSSxjQUFjO2dDQUNkLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxDQUFDOztnQ0FFNUcsTUFBTSxJQUFJLGVBQU0sQ0FBQyxFQUFDLElBQUksRUFBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLEVBQUUsMEJBQTBCLEdBQUcsR0FBRyxDQUFDLENBQUM7eUJBQ2hIO3FCQUNKO29CQUVELE9BQU8sZUFBaUMsQ0FBQztnQkFDN0MsQ0FBQyxDQUFBLENBQUE7Z0JBRUQsSUFBSSxpQkFBaUIsR0FBa0MsR0FBRyxFQUFFLEdBQUUsT0FBTyxVQUFVLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQztnQkFFbkYsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDWCxNQUFNLFFBQVEsR0FBSSxNQUFNLFVBQVUsRUFBRSxDQUFDO29CQUNyQyxpQkFBaUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUN2RDtnQkFFRCxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRyxpQkFBaUIsRUFBRSxDQUFDLENBQUM7YUFDaEU7aUJBRUQ7Z0JBQ0ksSUFBSSxhQUFhLEdBQWtCLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQztnQkFFckQsSUFBSSxjQUFjLEVBQ2xCO29CQUNJLElBQ0E7d0JBQ0ksTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDdkQsYUFBYSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztxQkFDL0I7b0JBQ0QsT0FBTSxDQUFDLEVBQ1A7d0JBQ0ksYUFBYSxHQUFHLEdBQUcsRUFBRSxHQUFFLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO3FCQUN2STtpQkFDSjtnQkFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsYUFBYSxFQUFFLENBQUMsQ0FBQzthQUM1RDtRQUNMLENBQUMsQ0FBQSxFQUNELENBQUMsR0FBWSxFQUFFLEdBQVMsRUFBRSxFQUFFO1lBQ3hCLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQyxFQUNELENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUVwQixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUMsRUFDRCxZQUFZLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUV0QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSwwQkFBMEIsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDO0NBQUE7QUE3TkQsZ0NBNk5DIn0=