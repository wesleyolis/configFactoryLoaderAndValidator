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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItaW4tbWVtb3J5L3dpdGgtbGVnYWN5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUF5RDtBQUN6RCwwRkFBK0U7QUFLL0UsU0FBZ0IsV0FBVyxDQUFDLFNBQWtCO0lBRTFDLE9BQU8sSUFBSSxvQ0FBb0MsQ0FBTSxTQUFTLEVBQUUsU0FBUyxDQUEwRCxDQUFBO0FBQ3ZJLENBQUM7QUFIRCxrQ0FHQztBQUVELE1BQWEsb0NBQWdFLFNBQVEsa0NBQTJDO0lBSTVILFlBQVksUUFBWSxFQUFFLFNBQWtCO1FBRXhDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsU0FBa0I7WUFFNUMsT0FBTyxtQ0FBWSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztRQUMxRSxDQUFDLENBQUE7SUFDTCxDQUFDO0NBQ0o7QUFiRCxvRkFhQyJ9