import {ILegacyConfig, InjectConfig} from '../../../config-legacy-gen/iconfig-legacy'
import { MongoDBConfigFactory, CS } from './index';
import { injectConfig } from '../../../config-legacy-gen/inject-legacy-config';
import * as CFT from '../../../config-factory/config-factory-types'
import * as JoiX from '../../../joi-x'
import * as Joi from 'joi'


export function NewInstance(injectKey : string)
{
    return new MongoDBConfigFactoryWithLegacy<any>(undefined, injectKey) as MongoDBConfigFactoryWithLegacy<CS.ConfigSchema>
}

export class MongoDBConfigFactoryWithLegacy<T extends CS.ConfigSchema> extends MongoDBConfigFactory<CS.ConfigSchema> implements ILegacyConfig
{
    readonly injectConfig : InjectConfig;    

    constructor(settings : T, injectKey : string)
    {
        super(settings);

        this.injectConfig = function (rawConfig : string)
        {
            return injectConfig(rawConfig, 'mongoConnectionString', this.getConnectionString());
        }
    }
}