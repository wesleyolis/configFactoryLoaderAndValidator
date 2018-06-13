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
function StartFactoryAsync(factory, settings) {
    const unWrappedSettings = delete settings.factory;
    return factory.createAsync(unWrappedSettings);
}
exports.StartFactoryAsync = StartFactoryAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3Rvcmllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctZmFjdG9yeS9jb25maWctZmFjdG9yaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsbUNBQStCO0FBRS9COztBQUVXLCtCQUFrQixHQUFHLHNCQUFzQixDQUFDO0FBU3ZELHFCQUEwRCxTQUFxQixFQUFFLFFBQVk7SUFFekYsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFL0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBRXpDLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFDLEVBQUUsOEJBQThCLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBUkQsa0NBUUM7QUFFRCwyQkFBaUYsT0FBd0IsRUFBRSxRQUFZO0lBRW5ILE1BQU0saUJBQWlCLEdBQUcsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBRWxELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUxELDhDQUtDIn0=