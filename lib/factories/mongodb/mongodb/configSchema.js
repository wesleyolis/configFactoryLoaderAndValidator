"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
const CFT = require("../../../config-factory/config-factory-types");
exports.factoryName = "Network";
exports.password = JoiV.password().required();
exports.credentials = JoiX.object().keys({
    username: JoiX.string().required(),
    password: exports.password
});
exports.configSchema = JoiX.object().keys({
    class: JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type: JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider: JoiX.LiteralString(['mongodb']).label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').required(),
    hosts: JoiX.array().items(JoiX.object().keys({
        hostname: JoiX.string().required(),
        port: JoiV.port(JoiV.DPorts.mongo).required()
    }).required()).required().min(1),
    credentials: exports.credentials,
    database: JoiX.string(),
    options: JoiX.object().pattern(/\w?/, JoiX.string().required()),
}).required();
const settings = {
    class: CFT.ConfigFactoryClass.netService,
    type: CFT.ConfigFactoryTypes.production,
    provider: 'mongodb',
    credentials: {
        username: 'username',
        password: {
            phrase: 'sdfsdf',
            type: JoiV.PassType.plainText
        }
    },
    database: 'databsase',
    hosts: [{ hostname: 'hostname', port: 237 }],
    options: {
        op1: '1',
        op2: '2'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUd2QyxvRUFBbUU7QUFHdEQsUUFBQSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBUXhCLFFBQUEsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUV0QyxRQUFBLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzFDLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25DLFFBQVEsRUFBRyxnQkFBUTtDQUN0QixDQUFDLENBQUM7QUFFVSxRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLEtBQUssRUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzFFLElBQUksRUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ3pFLFFBQVEsRUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxXQUFXLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDL0gsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRTtLQUNoRCxDQUFDLENBQUMsUUFBUSxFQUFFLENBQ2hCLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QixXQUFXLEVBQUcsbUJBQVc7SUFDekIsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7SUFDeEIsT0FBTyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztDQUNqRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFJZCxNQUFNLFFBQVEsR0FBRztJQUNmLEtBQUssRUFBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVTtJQUN6QyxJQUFJLEVBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVU7SUFDeEMsUUFBUSxFQUFHLFNBQVM7SUFDcEIsV0FBVyxFQUFHO1FBQ1YsUUFBUSxFQUFHLFVBQVU7UUFDckIsUUFBUSxFQUFHO1lBQ1AsTUFBTSxFQUFHLFFBQVE7WUFDakIsSUFBSSxFQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztTQUNqQztLQUNKO0lBQ0QsUUFBUSxFQUFHLFdBQVc7SUFDdEIsS0FBSyxFQUFHLENBQUMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRyxHQUFHLEVBQUMsQ0FBQztJQUMzQyxPQUFPLEVBQUc7UUFDTixHQUFHLEVBQUcsR0FBRztRQUNULEdBQUcsRUFBRyxHQUFHO0tBQ1o7Q0FDSixDQUFDIn0=