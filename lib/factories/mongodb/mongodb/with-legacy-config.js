"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const inject_legacy_config_1 = require("../../../config-legacy-gen/inject-legacy-config");
function NewInstance(injectKey) {
    return new MongoDBConfigFactoryWithLegacy(undefined, injectKey);
}
exports.NewInstance = NewInstance;
class MongoDBConfigFactoryWithLegacy extends index_1.MongoDBConfigFactory {
    constructor(settings, injectKey) {
        super(settings);
        this.injectConfig = function (rawConfig) {
            return inject_legacy_config_1.injectConfig(rawConfig, 'mongoConnectionString', this.getConnectionString());
        };
    }
}
exports.MongoDBConfigFactoryWithLegacy = MongoDBConfigFactoryWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvd2l0aC1sZWdhY3ktY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUNBQW1EO0FBQ25ELDBGQUErRTtBQU8vRSxTQUFnQixXQUFXLENBQUMsU0FBa0I7SUFFMUMsT0FBTyxJQUFJLDhCQUE4QixDQUFNLFNBQVMsRUFBRSxTQUFTLENBQW9ELENBQUE7QUFDM0gsQ0FBQztBQUhELGtDQUdDO0FBRUQsTUFBYSw4QkFBMEQsU0FBUSw0QkFBcUM7SUFJaEgsWUFBWSxRQUFZLEVBQUUsU0FBa0I7UUFFeEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxTQUFrQjtZQUU1QyxPQUFPLG1DQUFZLENBQUMsU0FBUyxFQUFFLHVCQUF1QixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBYkQsd0VBYUMifQ==