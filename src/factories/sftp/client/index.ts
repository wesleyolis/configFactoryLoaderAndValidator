import * as CS from './config-schema'
import {ABaseConfigFactory} from '.././../../../src/config-factory/abase-config-factory'
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types'

import * as Joi from 'joi'
import * as JoiX from '../../../joi-x'

class SftpClient<T extends CS.ConfigSchema> extends ABaseConfigFactory
{
    factoryName: string = CS.factoryName;
    factoryClass: ConfigFactoryClass = ConfigFactoryClass.netService;
    type: ConfigFactoryTypes = ConfigFactoryTypes.production;
    configSchema = CS.configSchema;

    static NewInstance()
    {
        return new SftpClient<any>(undefined) as SftpClient<CS.ConfigSchema>; 
    }

    constructor(public configSettings : T)
    {
        super();
    }

    async createAsync(config : JoiX.XJSchemaMap) : Promise<void>
    {
        await super.createAsync(config);
    }
    
    public async startAsync()
    {
        await super.startAsync();
    }

    public async stopAsync()
    {
        await super.stopAsync();
    }
}