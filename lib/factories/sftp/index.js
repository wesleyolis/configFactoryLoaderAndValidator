"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_factories_1 = require("../../config-factory/config-factories");
const sftpClient = require("./client");
const sftpClientCS = require("./client/config-schema");
const sftpClientLegacy = require("./client/with-legacy-config");
const sftpInMem = require("./client-in-mem-server");
const sftpInMemCS = require("./client-in-mem-server/config-schema");
const sftpInMemLegacy = require("./client-in-mem-server/with-legacy-config");
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
exports.configSchemaInjectLegacy = JoiX.Factory(JoiX.FactoryType.issolated, NewFactoryWithLegacy).try([exports.sftpClientSchema, exports.sftpInMemSchema]).required();
const factoriesInjectLegacy = [
    {
        configFactoryName: sftpClientCS.factoryName,
        configFactoryNew: sftpClientLegacy.NewInstance
    },
    {
        configFactoryName: sftpInMemCS.factoryName,
        configFactoryNew: sftpInMemLegacy.NewInstance
    }
];
function NewFactoryWithLegacy(settings) {
    return config_factories_1._NewFactory(factoriesInjectLegacy, settings);
}
exports.NewFactoryWithLegacy = NewFactoryWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0RUFBMkU7QUFFM0UsdUNBQXVDO0FBQ3ZDLHVEQUF1RDtBQUN2RCxnRUFBK0Q7QUFFL0Qsb0RBQW1EO0FBQ25ELG9FQUFtRTtBQUNuRSw2RUFBNEU7QUFHNUUsb0NBQW9DO0FBVXZCLFFBQUEsZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDM0QsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQztDQUMvQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFJRCxRQUFBLGVBQWUsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztJQUN6RCxPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0NBQy9DLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQU9ELFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHdCQUFnQixFQUFFLHVCQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRXBKLE1BQU0sU0FBUyxHQUErQjtJQUMxQztRQUNJLGlCQUFpQixFQUFHLFlBQVksQ0FBQyxXQUFXO1FBQzVDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVztLQUN0RDtJQUNEO1FBQ0ksaUJBQWlCLEVBQUUsWUFBWSxDQUFDLFdBQVc7UUFDM0MsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLHlCQUF5QixDQUFDLFdBQVc7S0FDcEU7Q0FDSixDQUFDO0FBRUYsb0JBQTJCLFFBQTBCO0lBQ2pELE9BQU8sOEJBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUZELGdDQUVDO0FBSVksUUFBQSx3QkFBd0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFnQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLHdCQUFnQixFQUFFLHVCQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBRTFLLE1BQU0scUJBQXFCLEdBQStCO0lBQ3REO1FBQ0ksaUJBQWlCLEVBQUcsWUFBWSxDQUFDLFdBQVc7UUFDNUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsV0FBeUM7S0FDL0U7SUFDRDtRQUNJLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxXQUFXO1FBQzFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxXQUF5QztLQUM5RTtDQUNKLENBQUM7QUFFRiw4QkFBcUMsUUFBMEI7SUFDM0QsT0FBTyw4QkFBVyxDQUFDLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGRCxvREFFQyJ9