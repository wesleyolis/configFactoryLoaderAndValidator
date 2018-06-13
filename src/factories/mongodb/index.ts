import {Factory, _NewFactory, StartFactoryAsync} from '../../config-factory/config-factories';

import * as MongoDB from '../mongodb/mongodb';
import * as MongoDBCS from '../mongodb/mongodb/configSchema';
import * as InMemory from '../mongodb/mongodb-in-memory';
import * as InMemoryCS from '../mongodb/mongodb-in-memory/configSchema';

import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators';
import { IConfigFactory } from '../../config-factory/iconfig-factory';



export type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;

export const mongoDBSchema = MongoDBCS.configSchema.keys({
    factory : JoiX.kind(MongoDBCS.factoryName)   
});


export type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;

export const inMemorySchema = InMemoryCS.configSchema.keys({
    factory : JoiX.kind(InMemoryCS.factoryName)   
});

export type ConfigFactories = MongoDBSchema | InMemorySchema;


export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.alternatives().try([mongoDBSchema, inMemorySchema]);

const factories : Factory [] = [
    {
        configFactoryName : MongoDBCS.factoryName,
        configFactoryNew: MongoDB.MongoDBConfigFactory.NewInstance
    },
    {
        configFactoryName: InMemoryCS.factoryName,
        configFactoryNew: InMemory.MongoInMemoryConfigFactory.NewInstance
    }
];

export function NewFactory(settings : ConfigFactories) : IConfigFactory {
    return _NewFactory(factories, settings);
}