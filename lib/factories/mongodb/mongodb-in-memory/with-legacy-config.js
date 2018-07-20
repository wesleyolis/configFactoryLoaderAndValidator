"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const inject_legacy_config_1 = require("../../../config-legacy-gen/inject-legacy-config");
function NewInstance(injectKey) {
    return new MongoInMemoryConfigFactoryWithLegacy(undefined, injectKey);
}
exports.NewInstance = NewInstance;
class MongoInMemoryConfigFactoryWithLegacy extends index_1.MongoInMemoryConfigFactory {
    constructor(settings, injectKey) {
        super(settings);
        this.injectConfig = function (rawConfig) {
            return inject_legacy_config_1.injectConfig(rawConfig, injectKey, this.getConnectionString());
        };
    }
}
exports.MongoInMemoryConfigFactoryWithLegacy = MongoInMemoryConfigFactoryWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItaW4tbWVtb3J5L3dpdGgtbGVnYWN5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUF5RDtBQUN6RCwwRkFBK0U7QUFLL0UscUJBQTRCLFNBQWtCO0lBRTFDLE9BQU8sSUFBSSxvQ0FBb0MsQ0FBTSxTQUFTLEVBQUUsU0FBUyxDQUEwRCxDQUFBO0FBQ3ZJLENBQUM7QUFIRCxrQ0FHQztBQUVELDBDQUE2RSxTQUFRLGtDQUEyQztJQUk1SCxZQUFZLFFBQVksRUFBRSxTQUFrQjtRQUV4QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLFNBQWtCO1lBRTVDLE9BQU8sbUNBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBYkQsb0ZBYUMifQ==