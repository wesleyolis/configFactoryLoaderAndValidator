"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CFT = require("./config-factory-types");
const iconfig_factory_1 = require("./iconfig-factory");
const verror_1 = require("verror");
var Error;
(function (Error) {
    Error["NoConfigFound"] = "NoFactoryFound";
    Error["AmbiguousMutiple"] = "AmbiguousMutiple";
})(Error || (Error = {}));
class ConfigFactoryLoader {
    static fromConfigGetJson(config) {
        let factoryConfigs = Object.keys(config).reduce((acc, configKeyPhrase) => {
            CFT.ConfigFactoryClassStemKeys.forEach(factoryClassStem => {
                let stemPos = configKeyPhrase.indexOf(factoryClassStem);
                if (stemPos == -1)
                    return;
                let value = config[configKeyPhrase];
                let factoryType = CFT.ConfigFactoryTypes.Vanilla;
                if (stemPos !== -1 && stemPos != 0) {
                    let prefix = configKeyPhrase.substring(0, stemPos);
                    factoryType = CFT.ConfigFactoryTypesPrefix[prefix] || factoryType;
                }
                acc.push({
                    FactoryClass: CFT.ConfigFactoryClassStem[factoryClassStem],
                    Type: factoryType,
                    Resouce: value,
                    ConfigSettings: config['options']
                });
            });
            return acc;
        }, []);
        if (factoryConfigs.length == 0) {
            throw new verror_1.VError({ name: Error.NoConfigFound }, "No configuration found matching, Factory stem key work.");
        }
        else if (factoryConfigs.length == 1) {
            let config = factoryConfigs[0];
            // create and load the factory.
            let iConfigFactory = require(config.Resouce);
            let configFactoryInstance = iconfig_factory_1.CreateConfigFactoryInstance(iConfigFactory);
            configFactoryInstance.create(config);
            return configFactoryInstance;
        }
        else {
            throw new verror_1.VError({ name: Error.AmbiguousMutiple }, "Ambiguous Factories, mutiple entries matchin 'Factory'");
        }
    }
}
exports.ConfigFactoryLoader = ConfigFactoryLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3RvcnktbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy1mYWN0b3J5LWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE4QztBQUU5Qyx1REFBeUc7QUFDekcsbUNBQThCO0FBRTlCLElBQUssS0FJSjtBQUpELFdBQUssS0FBSztJQUVOLHlDQUFnQyxDQUFBO0lBQ2hDLDhDQUFxQyxDQUFBO0FBQ3pDLENBQUMsRUFKSSxLQUFLLEtBQUwsS0FBSyxRQUlUO0FBRUQ7SUFFSSxNQUFNLENBQUMsaUJBQWlCLENBQTJCLE1BQXVCO1FBRXRFLElBQUksY0FBYyxHQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQStCLEVBQUUsZUFBZSxFQUFFLEVBQUU7WUFFNUgsR0FBRyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUV0RCxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRXhELEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDZCxNQUFNLENBQUM7Z0JBRVgsSUFBSSxLQUFLLEdBQVksTUFBTSxDQUFDLGVBQWUsQ0FBVyxDQUFDO2dCQUV2RCxJQUFJLFdBQVcsR0FBNEIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQztnQkFFMUUsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FDbkMsQ0FBQztvQkFDRyxJQUFJLE1BQU0sR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFbkQsV0FBVyxHQUFHLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUM7Z0JBQ3RFLENBQUM7Z0JBRUQsR0FBRyxDQUFDLElBQUksQ0FBd0I7b0JBQzVCLFlBQVksRUFBRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNELElBQUksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsS0FBSztvQkFDZCxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBRWYsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FDL0IsQ0FBQztZQUNHLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxFQUFFLHlEQUF5RCxDQUFDLENBQUM7UUFDNUcsQ0FBQztRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUNwQyxDQUFDO1lBQ0csSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLCtCQUErQjtZQUMvQixJQUFJLGNBQWMsR0FBa0MsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUU1RSxJQUFJLHFCQUFxQixHQUFHLDZDQUEyQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBRXZFLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVyQyxNQUFNLENBQUMscUJBQXFCLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksQ0FDSixDQUFDO1lBQ0csTUFBTSxJQUFJLGVBQU0sQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsRUFBRSx3REFBd0QsQ0FBQyxDQUFDO1FBQzlHLENBQUM7SUFDTCxDQUFDO0NBQ0o7QUF6REQsa0RBeURDIn0=