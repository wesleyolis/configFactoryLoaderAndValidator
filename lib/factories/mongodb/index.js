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
});
exports.inMemorySchema = InMemoryCS.configSchema.keys({
    factory: JoiX.kind(InMemoryCS.factoryName)
});
exports.configSchema = JoiX.alternatives().try([exports.mongoDBSchema, exports.inMemorySchema]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0RUFBOEY7QUFFOUYsOENBQThDO0FBQzlDLDZEQUE2RDtBQUM3RCx5REFBeUQ7QUFDekQsd0VBQXdFO0FBR3hFLG9DQUFvQztBQVF2QixRQUFBLGFBQWEsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztJQUNyRCxPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0NBQzdDLENBQUMsQ0FBQztBQUtVLFFBQUEsY0FBYyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3ZELE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7Q0FDOUMsQ0FBQyxDQUFDO0FBT1UsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFhLEVBQUUsc0JBQWMsQ0FBQyxDQUFDLENBQUM7QUFFckYsTUFBTSxTQUFTLEdBQWdCO0lBQzNCO1FBQ0ksaUJBQWlCLEVBQUcsU0FBUyxDQUFDLFdBQVc7UUFDekMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLFdBQVc7S0FDN0Q7SUFDRDtRQUNJLGlCQUFpQixFQUFFLFVBQVUsQ0FBQyxXQUFXO1FBQ3pDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxXQUFXO0tBQ3BFO0NBQ0osQ0FBQztBQUVGLG9CQUEyQixRQUEwQjtJQUNqRCxNQUFNLENBQUMsOEJBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUZELGdDQUVDIn0=