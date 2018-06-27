import {Factory, _NewFactory} from '../../config-factory/config-factories';

import * as MongoDB from '../mongodb/mongodb';
import * as MongoDBCS from '../mongodb/mongodb/configSchema';
import * as InMemory from '../mongodb/mongodb-in-memory';
import * as InMemoryCS from '../mongodb/mongodb-in-memory/configSchema';

import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types'
import { ConfigFactories } from '../../config-factory/index';
import { IMongoSettings } from './amongodb-config-factory';

export {IMongoSettings}

export type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;

export const mongoDBSchema = MongoDBCS.configSchema.keys({
    factory : JoiX.kind(MongoDBCS.factoryName)   
}).required();

export type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;

export const inMemorySchema = InMemoryCS.configSchema.keys({
    factory : JoiX.kind(InMemoryCS.factoryName)   
}).required();

export type ConfigFactories = MongoDBSchema | InMemorySchema;


export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

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

export const configSchema = JoiX.alternatives().try([mongoDBSchema, inMemorySchema]).required();

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

const mongoDBSettings : ConfigSchema = {
    factory : 'Network',
    class : CFT.ConfigFactoryClass.netService,
    type : CFT.ConfigFactoryTypes.production,
    provider : 'mongodb',
    credentials : {
        username : 'username',
        password : {
            phrase : 'sdfsdf',
            type : JoiV.PassType.plainText
        }
    },
    database : 'databsase',
    hosts : [{hostname:'hostname', port : 237}],
    options : {
        op1 : '1',
        op2 : '2'
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
