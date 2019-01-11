"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
const abase_config_factory_schema_1 = require("../../../config-factory/abase-config-factory-schema");
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
    // class : JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    // type : JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider: JoiX.LiteralString(['mongodb']).label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').required(),
    hosts: exports.hosts,
    credentials: exports.credentials,
    database: JoiX.string(),
    options: JoiX.object().pattern(/\w?/, JoiX.string().required()),
}).keys(abase_config_factory_schema_1.baseConfigSchema).required();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIvY29uZmlnU2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0RBQWtEO0FBQ2xELHVDQUF1QztBQUV2QyxxR0FBb0Y7QUFDcEYsb0VBQW1FO0FBRXRELFFBQUEsV0FBVyxHQUFHLFNBQVMsQ0FBQztBQU14QixRQUFBLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7QUFJdEMsUUFBQSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUMxQyxRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyxRQUFRLEVBQUcsZ0JBQVE7Q0FDdEIsQ0FBQyxDQUFDO0FBSVUsUUFBQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ3ZELFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2xDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQzVDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDaEIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFUCxRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzVDLDhFQUE4RTtJQUM5RSw2RUFBNkU7SUFDNUUsUUFBUSxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUMvSCxLQUFLLEVBQUcsYUFBSztJQUNiLFdBQVcsRUFBRyxtQkFBVztJQUN6QixRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTtJQUN4QixPQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0NBQ2pFLENBQUMsQ0FBQyxJQUFJLENBQUMsOENBQWdCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVyQyxNQUFNLFFBQVEsR0FBRztJQUNmLEtBQUssRUFBRyxHQUFHLENBQUMsa0JBQWtCLENBQUMsVUFBVTtJQUN6QyxJQUFJLEVBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVU7SUFDeEMsUUFBUSxFQUFHLFNBQVM7SUFDcEIsV0FBVyxFQUFHO1FBQ1YsUUFBUSxFQUFHLFVBQVU7UUFDckIsUUFBUSxFQUFHO1lBQ1AsTUFBTSxFQUFHLFFBQVE7WUFDakIsSUFBSSxFQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUztTQUNqQztLQUNKO0lBQ0QsUUFBUSxFQUFHLFdBQVc7SUFDdEIsS0FBSyxFQUFHLENBQUMsRUFBQyxRQUFRLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRyxHQUFHLEVBQUMsQ0FBQztJQUMzQyxPQUFPLEVBQUc7UUFDTixHQUFHLEVBQUcsR0FBRztRQUNULEdBQUcsRUFBRyxHQUFHO0tBQ1o7Q0FDSixDQUFDIn0=