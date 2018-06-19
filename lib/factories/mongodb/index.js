"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBCS = require("../mongodb/mongodb/configSchema");
const InMemoryCS = require("../mongodb/mongodb-in-memory/configSchema");
const JoiX = require("../../joi-x");
exports.mongoDBSchema = MongoDBCS.configSchema.keys({
    factory: JoiX.kind(MongoDBCS.factoryName)
}).required();
exports.inMemorySchema = InMemoryCS.configSchema.keys({
    factory: JoiX.kind(InMemoryCS.factoryName)
}).required();
exports.configSchema = JoiX.alternatives().try([exports.mongoDBSchema, exports.inMemorySchema]).required();
/*
export const factorySchema = JoiX.Factory(JoiX.FactoryType.issolated).try([mongoDBSchema, inMemorySchema]).required();

export const majorSchema = JoiX.object().keys(
{
    a : JoiX.string(),
    f1 : factorySchema,
    f2 : JoiX.Factory(JoiX.FactoryType.issolated).try([mongoDBSchema, inMemorySchema]).required(),
    b : JoiX.string()
})

type majorSchema = typeof majorSchema;

function generateFactoryTreeInstance<T extends any, R extends JoiX.ExtractFromFa>(schema : T)
{
    const keys = Object.keys(schema);

    keys.forEach(key => {
        console.log(typeof schema[key])
    });
}
const instanceTree = generateFactoryTreeInstance(majorSchema);


const factories : Factory<IMongoSettings> [] = [
    {
        configFactoryName : MongoDBCS.factoryName,
        configFactoryNew: MongoDB.MongoDBConfigFactory.NewInstance
    },
    {
        configFactoryName: InMemoryCS.factoryName,
        configFactoryNew: InMemory.MongoInMemoryConfigFactory.NewInstance
    }
];

export function NewFactory(settings : ConfigFactories) : IMongoSettings {
    return _NewFactory(factories, settings);
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw2REFBNkQ7QUFFN0Qsd0VBQXdFO0FBR3hFLG9DQUFvQztBQVd2QixRQUFBLGFBQWEsR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztJQUNyRCxPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO0NBQzdDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUlELFFBQUEsY0FBYyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3ZELE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7Q0FDOUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBT0QsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFhLEVBQUUsc0JBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFaEc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0NFIn0=