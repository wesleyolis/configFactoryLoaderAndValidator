"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
const CFT = require("../../../config-factory/config-factory-types");
exports.factoryName = "Network";
exports.configSchema = JoiX.object().keys({
    class: JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type: JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider: JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
    hosts: JoiX.array().items(JoiX.object().keys({
        hostname: JoiX.string().required(),
        port: JoiV.port(JoiV.DPorts.mongo).required()
    }).required()).required(),
    credentials: JoiX.object().keys({
        username: JoiX.string().required(),
        password: JoiX.object().keys({
            phrase: JoiX.string().required(),
            type: JoiX.enumString([JoiV.PassType.plainText, JoiV.PassType.encrypt]).description("spesified preprocessor, adapter transform to apply, support adapters:'encrypt'")
        }).description("Password, which consists of a phrase and type, were type is adapter tranformation.").required()
    }).required(),
    database: JoiX.string().required(),
    options: JoiX.object().pattern(/w/, JoiX.string().required()).required(),
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUd2QyxvRUFBbUU7QUFFdEQsUUFBQSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBSXhCLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsS0FBSyxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDMUUsSUFBSSxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDekUsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ25ILEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDbEMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoQixDQUFDLFFBQVEsRUFBRTtJQUNoQixXQUFXLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUM3QixRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztZQUMxQixNQUFNLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0ZBQWdGLENBQUM7U0FDekssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxvRkFBb0YsQ0FBQyxDQUFDLFFBQVEsRUFBRTtLQUNsSCxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsT0FBTyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUMxRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMifQ==