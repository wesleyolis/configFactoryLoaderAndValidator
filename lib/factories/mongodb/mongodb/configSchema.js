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
exports.hosts = JoiX.array().items(JoiX.object().keys({
    hostname: JoiX.string().required(),
    port: JoiV.port(JoiV.DPorts.mongo).required()
}).required()).required().min(1);
exports.configSchema = JoiX.object().keys({
    class: JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type: JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider: JoiX.LiteralString(['mongodb']).label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').required(),
    hosts: exports.hosts,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUd2QyxvRUFBbUU7QUFHdEQsUUFBQSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBTXhCLFFBQUEsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUl0QyxRQUFBLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzFDLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25DLFFBQVEsRUFBRyxnQkFBUTtDQUN0QixDQUFDLENBQUM7QUFJVSxRQUFBLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdkQsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDNUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUNoQixDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVQLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsS0FBSyxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDMUUsSUFBSSxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDekUsUUFBUSxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMvSCxLQUFLLEVBQUcsYUFBSztJQUNiLFdBQVcsRUFBRyxtQkFBVztJQUN6QixRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN4QixPQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0NBQ2pFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVkLE1BQU0sUUFBUSxHQUFHO0lBQ2YsS0FBSyxFQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3pDLElBQUksRUFBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVTtJQUN4QyxRQUFRLEVBQUcsU0FBUztJQUNwQixXQUFXLEVBQUc7UUFDVixRQUFRLEVBQUcsVUFBVTtRQUNyQixRQUFRLEVBQUc7WUFDUCxNQUFNLEVBQUcsUUFBUTtZQUNqQixJQUFJLEVBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1NBQ2pDO0tBQ0o7SUFDRCxRQUFRLEVBQUcsV0FBVztJQUN0QixLQUFLLEVBQUcsQ0FBQyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFHLEdBQUcsRUFBQyxDQUFDO0lBQzNDLE9BQU8sRUFBRztRQUNOLEdBQUcsRUFBRyxHQUFHO1FBQ1QsR0FBRyxFQUFHLEdBQUc7S0FDWjtDQUNKLENBQUMifQ==