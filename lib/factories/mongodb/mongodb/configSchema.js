"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
const abase_config_factory_schema_1 = require("../../../config-factory/abase-config-factory-schema");
exports.factoryName = "Network";
exports.configSchema = JoiX.object().keys({
    type: JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
    hosts: JoiX.array().items(JoiX.object().keys({
        hostname: JoiX.string().required(),
        port: JoiV.port(JoiV.DPorts.mongo).required()
    }).required()).required(),
    credentials: JoiX.object().keys({
        username: JoiX.string().required(),
        password: JoiV.password().required()
    }).required(),
    database: JoiX.string().required(),
    options: JoiX.object().pattern(/w/, JoiX.string().required()).required(),
}).keys(abase_config_factory_schema_1.baseConfigSchema).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUV2QyxxR0FBb0Y7QUFHdkUsUUFBQSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBSXhCLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsSUFBSSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQy9HLEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoQixDQUFDLFFBQVEsRUFBRTtJQUNoQixXQUFXLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUM3QixRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxRQUFRLEVBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUN4QyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsT0FBTyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUMxRSxDQUFDLENBQUMsSUFBSSxDQUFDLDhDQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMifQ==