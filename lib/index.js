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
class Errors {
}
Errors.configurationMissing = "ConfigurationMissing:" + Math.round(Math.random() * 1000);
Errors.failedToNewFactory = "FailedToLoadFactory";
function LoadConfig(configSettings, configSchema, lazyLoad = false, configOptional = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalConfigSchema = _.cloneDeep(configSchema);
        if (configOptional) {
            const children = JoiX.getXObjectChildrens(configSchema);
            JoiX.OperateOnXObjectKeys(children, (key, schema, acc, config) => __awaiter(this, void 0, void 0, function* () {
                schema.optional();
            }), (key, acc) => { }, null);
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
                                throw new VError_1.VError({ name: Errors.configurationMissing, cause: e }, `factory at key [${key}] missing`);
                            else
                                throw new VError_1.VError({ name: Errors.failedToNewFactory, cause: e }, `failed to new factory [${key}]`);
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
                        propertyValue = () => { throw new VError_1.VError({ name: Errors.configurationMissing, cause: e }, `factory at key [${key}] missing`); };
                    }
                }
                Object.defineProperty(acc, key, { get: propertyValue });
            }
        }), (key, acc) => {
            acc[key] = {};
            return acc[key];
        }, loadedConfig, validateConfigSettings);
        return Promise.resolve(new FactoriesInstancesResolver(loadedConfig, factoryConfig));
    });
}
exports.LoadConfig = LoadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9EQUFtRDtBQUN4QiwwQ0FBZTtBQUUxQyw2REFBNEQ7QUFDN0Msa0JBQUc7QUFHbEIseUNBQXdDO0FBQ25CLDhCQUFTO0FBRTlCLDJCQUEwQjtBQUNYLGtCQUFHO0FBRWxCLGdDQUErQjtBQUNmLG9CQUFJO0FBRXBCLDJDQUEwQztBQUUxQixvQkFBSTtBQUNwQixvREFBcUQ7QUFDckQsbUNBQXlDO0FBRXpDLGtEQUFtSDtBQUEzRyx3Q0FBQSxRQUFRLENBQXdCO0FBQUUsNENBQUEsYUFBYSxDQUE0QjtBQUVuRiw0QkFBNEI7QUFFNUI7SUFFSSxNQUFNLENBQU8sOEJBQThCLENBQUUsV0FBeUMsU0FBUyxFQUFFLFlBQWlDLEVBQUUsZ0JBQXVDLE9BQU8sQ0FBQyxRQUFRLENBQUM7O1lBRXhMLElBQUksUUFBUSxJQUFJLFNBQVMsRUFDekI7Z0JBQ0ksSUFBSSxNQUFNLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLHNCQUFhLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLE1BQU0sQ0FBQTthQUVoQjtZQUNELE9BQU8sUUFBUSxDQUFDO1FBQ3BCLENBQUM7S0FBQTtDQUtKO0FBbEJELHNDQWtCQztBQWdCRDtJQUtJLFlBQW9CLE1BQVcsRUFBVSxnQkFBb0Q7UUFBekUsV0FBTSxHQUFOLE1BQU0sQ0FBSztRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBb0M7SUFFN0YsQ0FBQztJQUVELFVBQVU7UUFFTixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxTQUFTO1FBRUwsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0NBQ0o7QUFsQkQsZ0VBa0JDO0FBRUQ7O0FBQ29CLDJCQUFvQixHQUFZLHVCQUF1QixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzNGLHlCQUFrQixHQUFZLHFCQUFxQixDQUFDO0FBR3hFLG9CQUVDLGNBQW9CLEVBQUUsWUFBZ0IsRUFBRSxXQUFxQixLQUFLLEVBQUUsaUJBQTJCLEtBQUs7O1FBRWpHLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2RCxJQUFJLGNBQWMsRUFDbEI7WUFDSSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFPLEdBQVksRUFBRSxNQUFZLEVBQUUsR0FBUyxFQUFFLE1BQVksRUFBRSxFQUFFO2dCQUM3RixNQUF3QixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pDLENBQUMsQ0FBQSxFQUFFLENBQUMsR0FBWSxFQUFFLEdBQVMsRUFBRSxFQUFFLEdBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdDO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFaEUsTUFBTSxzQkFBc0IsR0FBUyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXZGLElBQUksWUFBWSxHQUFTLEVBQUUsQ0FBQztRQUM1QixJQUFJLGFBQWEsR0FBd0MsRUFBRSxDQUFDO1FBRTVELE1BQU0sSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxDQUFPLEdBQVksRUFBRSxNQUFZLEVBQUUsR0FBUyxFQUFFLFdBQWlCLEVBQWtCLEVBQUU7WUFFekgsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV4QyxJQUFJLE9BQU8sRUFDWDtnQkFDSSxJQUFJLGVBQWUsR0FBZ0MsU0FBUyxDQUFDO2dCQUU3RCxNQUFNLFVBQVUsR0FBRyxHQUFTLEVBQUU7b0JBRTFCLElBQUksZUFBZSxLQUFLLFNBQVMsRUFDakM7d0JBQ0ksSUFDQTs0QkFDSSxlQUFlLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs0QkFFcEQsTUFBTSxlQUFlLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBRXRELElBQUksUUFBUTtnQ0FDUixNQUFNLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQzt5QkFDMUM7d0JBQ0QsT0FBTSxDQUFDLEVBQ1A7NEJBQ0ksSUFBSSxjQUFjO2dDQUNkLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBRSxtQkFBbUIsR0FBRyxXQUFXLENBQUMsQ0FBQzs7Z0NBRWxHLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsRUFBRSwwQkFBMEIsR0FBRyxHQUFHLENBQUMsQ0FBQzt5QkFDdEc7cUJBQ0o7b0JBRUQsT0FBTyxlQUFpQyxDQUFDO2dCQUM3QyxDQUFDLENBQUEsQ0FBQTtnQkFFRCxJQUFJLGlCQUFpQixHQUFrQyxHQUFHLEVBQUUsR0FBRSxPQUFPLFVBQVUsRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFDO2dCQUVuRixJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNYLE1BQU0sUUFBUSxHQUFJLE1BQU0sVUFBVSxFQUFFLENBQUM7b0JBQ3JDLGlCQUFpQixHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3ZEO2dCQUVELGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFHLGlCQUFpQixFQUFFLENBQUMsQ0FBQzthQUNoRTtpQkFFRDtnQkFDSSxJQUFJLGFBQWEsR0FBa0IsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUVyRCxJQUFJLGNBQWMsRUFDbEI7b0JBQ0ksSUFDQTt3QkFDSSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUN2RCxhQUFhLEdBQUcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO3FCQUMvQjtvQkFDRCxPQUFNLENBQUMsRUFDUDt3QkFDSSxhQUFhLEdBQUcsR0FBRyxFQUFFLEdBQUUsTUFBTSxJQUFJLGVBQU0sQ0FBQyxFQUFDLElBQUksRUFBQyxNQUFNLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxFQUFFLG1CQUFtQixHQUFHLFdBQVcsQ0FBQyxDQUFBLENBQUEsQ0FBQyxDQUFDO3FCQUM3SDtpQkFDSjtnQkFFRCxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUcsYUFBYSxFQUFFLENBQUMsQ0FBQzthQUM1RDtRQUNMLENBQUMsQ0FBQSxFQUNELENBQUMsR0FBWSxFQUFFLEdBQVMsRUFBRSxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDZCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDLEVBQUUsWUFBWSxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFFekMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksMEJBQTBCLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztDQUFBO0FBM0ZELGdDQTJGQyJ9