"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
const CFT = require("../../../config-factory/config-factory-types");
exports.factoryName = "Network";
exports.credentials = JoiX.object().keys({
    username: JoiX.string().required(),
    password: JoiV.password().required()
}).required();
exports.configSchema = JoiX.object().keys({
    class: JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type: JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider: JoiX.LiteralString(['mongodb']).label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').required(),
    hosts: JoiX.array().items(JoiX.object().keys({
        hostname: JoiX.string().required(),
        port: JoiV.port(JoiV.DPorts.mongo).required()
    }).required()).required(),
    credentials: exports.credentials,
    database: JoiX.string().required(),
    options: JoiX.object().pattern(/w/, JoiX.string().required()).required(),
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUd2QyxvRUFBbUU7QUFHdEQsUUFBQSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBTXhCLFFBQUEsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDMUMsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDeEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRUQsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUMzQyxLQUFLLEVBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMxRSxJQUFJLEVBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUN6RSxRQUFRLEVBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsV0FBVyxDQUFDLGlDQUFpQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQy9ILEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoQixDQUFDLFFBQVEsRUFBRTtJQUNoQixXQUFXLEVBQUcsbUJBQVc7SUFDekIsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsT0FBTyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUMxRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMifQ==