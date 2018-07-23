"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("../../../joi-x");
const JoiV = require("../../../joi-x-validators");
const abase_config_factory_schema_1 = require("../../../config-factory/abase-config-factory-schema");
const CFT = require("../../../config-factory/abase-config-factory-schema");
exports.CFT = CFT;
exports.factoryName = "Client";
exports.configSchema = JoiX.object().keys({
    host: JoiX.string().required(),
    port: JoiV.port(JoiV.DPorts.sftp).required(),
    credentials: JoiV.credentials().required()
}).keys(abase_config_factory_schema_1.baseConfigSchema).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvc2Z0cC9jbGllbnQvY29uZmlnLXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFzQztBQUN0QyxrREFBaUQ7QUFDakQscUdBQW9GO0FBQ3BGLDJFQUEwRTtBQUMzRCxrQkFBRztBQUVMLFFBQUEsV0FBVyxHQUFHLFFBQVEsQ0FBQztBQUl2QixRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQUksRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQy9CLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzdDLFdBQVcsRUFBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQzlDLENBQUMsQ0FBQyxJQUFJLENBQUMsOENBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyJ9