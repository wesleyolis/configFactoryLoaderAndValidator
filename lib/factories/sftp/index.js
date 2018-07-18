"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_factories_1 = require("../../config-factory/config-factories");
const sftpClient = require("./client");
const sftpClientCS = require("./client/config-schema");
const sftpInMem = require("./client-in-mem-server");
const sftpInMemCS = require("./client-in-mem-server/config-schema");
const JoiX = require("../../joi-x");
exports.sftpClientSchema = sftpClientCS.configSchema.keys({
    factory: JoiX.kind(sftpClientCS.factoryName)
}).required();
exports.sftpInMemSchema = sftpInMemCS.configSchema.keys({
    factory: JoiX.kind(sftpInMemCS.factoryName)
}).required();
exports.configSchema = JoiX.Factory(JoiX.FactoryType.issolated, NewFactory).try([exports.sftpClientSchema, exports.sftpInMemSchema]).required();
const factories = [
    {
        configFactoryName: sftpClientCS.factoryName,
        configFactoryNew: sftpClient.SftpClient.NewInstance
    },
    {
        configFactoryName: sftpClientCS.factoryName,
        configFactoryNew: sftpInMem.SftpInMemoryClientWrapper.NewInstance
    }
];
function NewFactory(settings) {
    return config_factories_1._NewFactory(factories, settings);
}
exports.NewFactory = NewFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0RUFBMkU7QUFFM0UsdUNBQXVDO0FBQ3ZDLHVEQUF1RDtBQUV2RCxvREFBbUQ7QUFDbkQsb0VBQW1FO0FBR25FLG9DQUFvQztBQVV2QixRQUFBLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQzNELE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUM7Q0FDL0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBSUQsUUFBQSxlQUFlLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDekQsT0FBTyxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztDQUMvQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFPRCxRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyx3QkFBZ0IsRUFBRSx1QkFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVwSixNQUFNLFNBQVMsR0FBK0I7SUFDMUM7UUFDSSxpQkFBaUIsRUFBRyxZQUFZLENBQUMsV0FBVztRQUM1QyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLFdBQVc7S0FDdEQ7SUFDRDtRQUNJLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxXQUFXO1FBQzNDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXO0tBQ3BFO0NBQ0osQ0FBQztBQUVGLG9CQUEyQixRQUEwQjtJQUNqRCxPQUFPLDhCQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFGRCxnQ0FFQyJ9