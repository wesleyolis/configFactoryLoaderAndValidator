"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CFT = require("./config-factory-types");
const iconfig_factory_1 = require("./iconfig-factory");
class ErrorNoFactoryConfigFound extends Error {
    constructor() {
        super("No factory configuration has been found for stem key word 'factory'.");
    }
}
exports.ErrorNoFactoryConfigFound = ErrorNoFactoryConfigFound;
class ErrorAmbiguousFactoryConfig extends Error {
    constructor() {
        super("Ambiguous Factory, more than one match has been found for stem key word 'factory'.");
    }
}
exports.ErrorAmbiguousFactoryConfig = ErrorAmbiguousFactoryConfig;
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
            throw new ErrorNoFactoryConfigFound();
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
            throw new ErrorAmbiguousFactoryConfig();
        }
    }
}
exports.ConfigFactoryLoader = ConfigFactoryLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3RvcnktbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy1mYWN0b3J5LWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDhDQUE4QztBQUU5Qyx1REFBMkc7QUFFM0csK0JBQXVDLFNBQVEsS0FBSztJQUVoRDtRQUVJLEtBQUssQ0FBQyxzRUFBc0UsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7Q0FDSjtBQU5ELDhEQU1DO0FBRUQsaUNBQXlDLFNBQVEsS0FBSztJQUVsRDtRQUVJLEtBQUssQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDO0lBQ2hHLENBQUM7Q0FDSjtBQU5ELGtFQU1DO0FBRUQ7SUFFSSxNQUFNLENBQUMsaUJBQWlCLENBQTJCLE1BQXVCO1FBRXRFLElBQUksY0FBYyxHQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQStCLEVBQUUsZUFBZSxFQUFFLEVBQUU7WUFFNUgsR0FBRyxDQUFDLDBCQUEwQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUV0RCxJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRXhELElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQztvQkFDYixPQUFPO2dCQUVYLElBQUksS0FBSyxHQUFZLE1BQU0sQ0FBQyxlQUFlLENBQVcsQ0FBQztnQkFFdkQsSUFBSSxXQUFXLEdBQTRCLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7Z0JBRTFFLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQ2xDO29CQUNJLElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUVuRCxXQUFXLEdBQUcsR0FBRyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQztpQkFDckU7Z0JBRUQsR0FBRyxDQUFDLElBQUksQ0FBd0I7b0JBQzVCLFlBQVksRUFBRyxHQUFHLENBQUMsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNELElBQUksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsS0FBSztvQkFDZCxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztpQkFDcEMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLEdBQUcsQ0FBQztRQUVmLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVOLElBQUksY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQzlCO1lBQ0ksTUFBTSxJQUFJLHlCQUF5QixFQUFFLENBQUM7U0FDekM7YUFDSSxJQUFJLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUNuQztZQUNJLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQiwrQkFBK0I7WUFDL0IsSUFBSSxjQUFjLEdBQWtDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFNUUsSUFBSSxxQkFBcUIsR0FBRyw2Q0FBMkIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtZQUV2RSxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFckMsT0FBTyxxQkFBcUIsQ0FBQztTQUNoQzthQUVEO1lBQ0ksTUFBTSxJQUFJLDJCQUEyQixFQUFFLENBQUM7U0FDM0M7SUFDTCxDQUFDO0NBQ0o7QUF6REQsa0RBeURDIn0=