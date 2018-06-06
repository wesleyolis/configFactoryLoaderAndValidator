"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
__export(require("../../../joi-x-validators"));
__export(require("../../../joi-x"));
exports.configSchema = JoiX.object().keys({
    type: JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
    host: JoiX.array().items(JoiX.object().keys({
        hostname: JoiX.string().required(),
        port: JoiV.port(JoiV.DPorts.Mongo).required()
    }).required()),
    database: JoiX.string().required(),
    options: JoiX.object().keys({
        replicaSet: JoiX.string().required()
    })
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUV2QywrQ0FBMEM7QUFDMUMsb0NBQStCO0FBSWxCLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsSUFBSSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQy9HLElBQUksRUFBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDaEQsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoQjtJQUNMLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25DLE9BQU8sRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3pCLFVBQVUsRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ3hDLENBQUM7Q0FDSCxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMifQ==