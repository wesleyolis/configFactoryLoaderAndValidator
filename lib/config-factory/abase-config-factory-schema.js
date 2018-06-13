"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("../joi-x");
const config_factory_types_1 = require("./config-factory-types");
__export(require("./config-factory-types"));
exports.baseConfigSchema = {
    class: JoiX.enumString([config_factory_types_1.ConfigFactoryClass.factory,
        config_factory_types_1.ConfigFactoryClass.module,
        config_factory_types_1.ConfigFactoryClass.netService,
        config_factory_types_1.ConfigFactoryClass.service]).required(),
    type: JoiX.enumString([config_factory_types_1.ConfigFactoryTypes.mock, config_factory_types_1.ConfigFactoryTypes.production]).required()
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3Rvcnktc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2FiYXNlLWNvbmZpZy1mYWN0b3J5LXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUFpQztBQUVqQyxpRUFBNkU7QUFDN0UsNENBQXNDO0FBSXpCLFFBQUEsZ0JBQWdCLEdBQUc7SUFDNUIsS0FBSyxFQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyx5Q0FBa0IsQ0FBQyxPQUFPO1FBQy9DLHlDQUFrQixDQUFDLE1BQU07UUFDekIseUNBQWtCLENBQUMsVUFBVTtRQUM3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMzQyxJQUFJLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHlDQUFrQixDQUFDLElBQUksRUFBRSx5Q0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUM5RixDQUFDIn0=