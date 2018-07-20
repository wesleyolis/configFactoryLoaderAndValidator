"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_factories_1 = require("../../config-factory/config-factories");
const MongoDB = require("../mongodb/mongodb");
const MongoDBCS = require("../mongodb/mongodb/configSchema");
const InMemory = require("../mongodb/mongodb-in-memory");
const InMemoryCS = require("../mongodb/mongodb-in-memory/configSchema");
const JoiX = require("../../joi-x");
exports.mongoDBSchema = MongoDBCS.configSchema.keys({
    factory: JoiX.kind(MongoDBCS.factoryName)
}).required();
exports.inMemorySchema = InMemoryCS.configSchema.keys({
    factory: JoiX.kind(InMemoryCS.factoryName)
}).required();
exports.configSchema = JoiX.Factory(JoiX.FactoryType.issolated, NewFactory).try([exports.mongoDBSchema, exports.inMemorySchema]).required();
const factories = [
    {
        configFactoryName: MongoDBCS.factoryName,
        configFactoryNew: MongoDB.MongoDBConfigFactory.NewInstance
    },
    {
        configFactoryName: InMemoryCS.factoryName,
        configFactoryNew: InMemory.MongoInMemoryConfigFactory.NewInstance
    }
];
function NewFactory(settings) {
    return config_factories_1._NewFactory(factories, settings);
}
exports.NewFactory = NewFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0RUFBMkU7QUFFM0UsOENBQThDO0FBQzlDLDZEQUE2RDtBQUM3RCx5REFBeUQ7QUFDekQsd0VBQXdFO0FBR3hFLG9DQUFvQztBQVd2QixRQUFBLGFBQWEsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztJQUNyRCxPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0NBQzdDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUlELFFBQUEsY0FBYyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3ZELE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7Q0FDOUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBT0QsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMscUJBQWEsRUFBRSxzQkFBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVqSixNQUFNLFNBQVMsR0FBZ0M7SUFDM0M7UUFDSSxpQkFBaUIsRUFBRyxTQUFTLENBQUMsV0FBVztRQUN6QyxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsV0FBVztLQUM3RDtJQUNEO1FBQ0ksaUJBQWlCLEVBQUUsVUFBVSxDQUFDLFdBQVc7UUFDekMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLDBCQUEwQixDQUFDLFdBQVc7S0FDcEU7Q0FDSixDQUFDO0FBRUYsb0JBQTJCLFFBQTBCO0lBQ2pELE9BQU8sOEJBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUZELGdDQUVDIn0=