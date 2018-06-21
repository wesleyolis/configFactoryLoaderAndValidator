"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoDBCS = require("../mongodb/mongodb/configSchema");
const InMemoryCS = require("../mongodb/mongodb-in-memory/configSchema");
const JoiX = require("../../joi-x");
const JoiV = require("../../joi-x-validators");
const CFT = require("../../config-factory/config-factory-types");
exports.mongoDBSchema = MongoDBCS.configSchema.keys({
    factory: JoiX.kind(MongoDBCS.factoryName)
}).required();
exports.inMemorySchema = InMemoryCS.configSchema.keys({
    factory: JoiX.kind(InMemoryCS.factoryName)
}).required();
// type MongoDBSchemda = InMemory.CS._ExtractFromObject<{
//     class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     provider: InMemory.CS.XPrimitive<"mongodb"> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     hosts: InMemory.CS.XArray & InMemory.CS.ArraySchema & {
//         __tsTypeAr: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//             __tsTypeO: {
//                 hostname: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//                     __isRequired: "T";
//                 };
//                 port: InMemory.CS.XPrimitive<number> & InMemory.CS.NumberSchema & {
//                     __isRequired: "T";
//                 };
//             };
//         } & {
//             __isRequired: "T";
//         };
//     } & {
//         __isRequired: "T";
//     };
//     credentials: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//         __tsTypeO: {
//             username: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//                 __isRequired: "T";
//             };
//             password: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any & {
//                 __isRequired: "T";
//             };
//         };
//     };
//     database: InMemory.CS.XStringSchema<string>;
//     options: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//         __tsTypeOP: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//             __isRequired: "T";
//         };
//     };
// } & {
//     factory: InMemory.CS.XPrimitive<"Network"> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
// }> & InMemory.CS.XTSchema
exports.configSchema = JoiX.alternatives().try([exports.mongoDBSchema, exports.inMemorySchema]).required();
// type ConfigSchemakk = (InMemory.CS._ExtractFromObject<{
//     class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.service> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.mock> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     port: InMemory.CS.XPrimitive<number> & InMemory.CS.NumberSchema & {
//         __isRequired: "T";
//     };
// } & {
//     factory: InMemory.CS.XPrimitive<"InMemory"> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
// }> & InMemory.CS.XTSchema) | (InMemory.CS._ExtractFromObject<{
//     class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     provider: InMemory.CS.XPrimitive<"mongodb"> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
//     hosts: InMemory.CS.XArray & InMemory.CS.ArraySchema & {
//         __tsTypeAr: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//             __tsTypeO: {
//                 hostname: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//                     __isRequired: "T";
//                 };
//                 port: InMemory.CS.XPrimitive<number> & InMemory.CS.NumberSchema & {
//                     __isRequired: "T";
//                 };
//             };
//         } & {
//             __isRequired: "T";
//         };
//     } & {
//         __isRequired: "T";
//     };
//     credentials: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//         __tsTypeO: {
//             username: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//                 __isRequired: "T";
//             };
//             password: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any & {
//                 __isRequired: "T";
//             };
//         };
//     };
//     database: InMemory.CS.XStringSchema<string>;
//     options: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
//         __tsTypeOP: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
//             __isRequired: "T";
//         };
//     };
// } & {
//     factory: InMemory.CS.XPrimitive<"Network"> & InMemory.CS.StringSchema & {
//         __isRequired: "T";
//     };
// }> & InMemory.CS.XTSchema)
const mongoDBSettings = {
    factory: 'Network',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFHQSw2REFBNkQ7QUFFN0Qsd0VBQXdFO0FBR3hFLG9DQUFvQztBQUNwQywrQ0FBK0M7QUFFL0MsaUVBQWdFO0FBUW5ELFFBQUEsYUFBYSxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3JELE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUM7Q0FDN0MsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBSUQsUUFBQSxjQUFjLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDdkQsT0FBTyxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQztDQUM5QyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFPZCx5REFBeUQ7QUFDekQsc0dBQXNHO0FBQ3RHLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QscUdBQXFHO0FBQ3JHLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsaUZBQWlGO0FBQ2pGLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsOERBQThEO0FBQzlELHlFQUF5RTtBQUN6RSwyQkFBMkI7QUFDM0IsMEZBQTBGO0FBQzFGLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsc0ZBQXNGO0FBQ3RGLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQjtBQUNoQixpQ0FBaUM7QUFDakMsYUFBYTtBQUNiLFlBQVk7QUFDWiw2QkFBNkI7QUFDN0IsU0FBUztBQUNULHNFQUFzRTtBQUN0RSx1QkFBdUI7QUFDdkIsc0ZBQXNGO0FBQ3RGLHFDQUFxQztBQUNyQyxpQkFBaUI7QUFDakIsaUZBQWlGO0FBQ2pGLHFDQUFxQztBQUNyQyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVCxtREFBbUQ7QUFDbkQsa0VBQWtFO0FBQ2xFLG9GQUFvRjtBQUNwRixpQ0FBaUM7QUFDakMsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRO0FBQ1IsZ0ZBQWdGO0FBQ2hGLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsNEJBQTRCO0FBRWYsUUFBQSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLHFCQUFhLEVBQUUsc0JBQWMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFaEcsMERBQTBEO0FBQzFELG1HQUFtRztBQUNuRyw2QkFBNkI7QUFDN0IsU0FBUztBQUNULCtGQUErRjtBQUMvRiw2QkFBNkI7QUFDN0IsU0FBUztBQUNULDBFQUEwRTtBQUMxRSw2QkFBNkI7QUFDN0IsU0FBUztBQUNULFFBQVE7QUFDUixpRkFBaUY7QUFDakYsNkJBQTZCO0FBQzdCLFNBQVM7QUFDVCxpRUFBaUU7QUFDakUsc0dBQXNHO0FBQ3RHLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QscUdBQXFHO0FBQ3JHLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsaUZBQWlGO0FBQ2pGLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsOERBQThEO0FBQzlELHlFQUF5RTtBQUN6RSwyQkFBMkI7QUFDM0IsMEZBQTBGO0FBQzFGLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsc0ZBQXNGO0FBQ3RGLHlDQUF5QztBQUN6QyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQjtBQUNoQixpQ0FBaUM7QUFDakMsYUFBYTtBQUNiLFlBQVk7QUFDWiw2QkFBNkI7QUFDN0IsU0FBUztBQUNULHNFQUFzRTtBQUN0RSx1QkFBdUI7QUFDdkIsc0ZBQXNGO0FBQ3RGLHFDQUFxQztBQUNyQyxpQkFBaUI7QUFDakIsaUZBQWlGO0FBQ2pGLHFDQUFxQztBQUNyQyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVCxtREFBbUQ7QUFDbkQsa0VBQWtFO0FBQ2xFLG9GQUFvRjtBQUNwRixpQ0FBaUM7QUFDakMsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRO0FBQ1IsZ0ZBQWdGO0FBQ2hGLDZCQUE2QjtBQUM3QixTQUFTO0FBQ1QsNkJBQTZCO0FBRTdCLE1BQU0sZUFBZSxHQUFrQjtJQUNuQyxPQUFPLEVBQUcsU0FBUztJQUNuQixLQUFLLEVBQUcsR0FBRyxDQUFDLGtCQUFrQixDQUFDLFVBQVU7SUFDekMsSUFBSSxFQUFHLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVO0lBQ3hDLFFBQVEsRUFBRyxTQUFTO0lBQ3BCLFdBQVcsRUFBRztRQUNWLFFBQVEsRUFBRyxVQUFVO1FBQ3JCLFFBQVEsRUFBRztZQUNQLE1BQU0sRUFBRyxRQUFRO1lBQ2pCLElBQUksRUFBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVM7U0FDakM7S0FDSjtJQUNELFFBQVEsRUFBRyxXQUFXO0lBQ3RCLEtBQUssRUFBRyxDQUFDLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUcsR0FBRyxFQUFDLENBQUM7SUFDM0MsT0FBTyxFQUFHO1FBQ04sR0FBRyxFQUFHLEdBQUc7UUFDVCxHQUFHLEVBQUcsR0FBRztLQUNaO0NBQ0osQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXNDRSJ9