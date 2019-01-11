"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verror_1 = require("verror");
class ConfigErrors {
}
ConfigErrors.FactoryLoadingFail = "FactoryLoadingFailed";
function _NewFactory(factories, settings) {
    const factory = factories.filter(f => f.configFactoryName == settings.factory);
    if (factory)
        return factory[0].configFactoryNew();
    throw new verror_1.VError({ name: ConfigErrors.FactoryLoadingFail }, `Factory: '$settings.factory'`);
}
exports._NewFactory = _NewFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctZmFjdG9yeS9jb25maWctZmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsbUNBQStCO0FBRS9CLE1BQU0sWUFBWTs7QUFFUCwrQkFBa0IsR0FBRyxzQkFBc0IsQ0FBQztBQVN2RCxTQUFnQixXQUFXLENBQXlELFNBQXdCLEVBQUUsUUFBWTtJQUV0SCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvRSxJQUFJLE9BQU87UUFDUCxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRXpDLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFDLEVBQUUsOEJBQThCLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBUkQsa0NBUUMifQ==