"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_factory_loader_1 = require("../../config-factory/config-factory-loader");
const CFT = require("../../config-factory/config-factory-types");
const mongodb_1 = require("./mongodb");
class MongoDbConfigFactoryLoader {
    static fromJsonConfig(configSettings) {
        try {
            let configFactoryInstance = config_factory_loader_1.ConfigFactoryLoader.fromConfigGetJson(configSettings);
            return configFactoryInstance;
        }
        catch (e) {
            if (e instanceof (config_factory_loader_1.ErrorNoFactoryConfigFound)) {
                // The we attempt to use the default configuration mongo configuration loader for backwards compatibility.
                let config = {
                    FactoryClass: CFT.ConfigFactoryClass.Service,
                    Type: CFT.ConfigFactoryTypes.Vanilla,
                    ConfigSettings: configSettings
                };
                let instance = new mongodb_1.MongoDBConfigFactory();
                instance.create(config);
                return instance;
            }
            else {
                throw e;
            }
        }
    }
}
exports.MongoDbConfigFactoryLoader = MongoDbConfigFactoryLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi1jb25maWctbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItY29uZmlnLWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNGQUEyRztBQUUzRyxpRUFBaUU7QUFDakUsdUNBQWlEO0FBSWpEO0lBRUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxjQUErQjtRQUVuRCxJQUNBO1lBQ0UsSUFBSSxxQkFBcUIsR0FBb0IsMkNBQW1CLENBQUMsaUJBQWlCLENBQWlCLGNBQWMsQ0FBQyxDQUFDO1lBRW5ILE9BQU8scUJBQXFCLENBQUM7U0FDOUI7UUFDRCxPQUFPLENBQUMsRUFDUjtZQUNFLElBQUksQ0FBQyxZQUFXLENBQUMsaURBQXlCLENBQUMsRUFDM0M7Z0JBQ0UsMEdBQTBHO2dCQUMxRyxJQUFJLE1BQU0sR0FBMkI7b0JBQ25DLFlBQVksRUFBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FBTztvQkFDN0MsSUFBSSxFQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO29CQUNyQyxjQUFjLEVBQUcsY0FBYztpQkFDaEMsQ0FBQztnQkFFRixJQUFJLFFBQVEsR0FBRyxJQUFJLDhCQUFvQixFQUFFLENBQUM7Z0JBRTFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXhCLE9BQU8sUUFBUSxDQUFDO2FBQ2pCO2lCQUVEO2dCQUNFLE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtJQUVILENBQUM7Q0FDRjtBQWxDRCxnRUFrQ0MifQ==