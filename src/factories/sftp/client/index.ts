import * as JoiX from '../../../joi-x'
import * as CS from './config-schema'
import { ABaseConfigFactory } from '.././../../../src/config-factory/abase-config-factory'
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types'


import {ISftpSettings, ILegacyConfig} from '../isftp-config-factory'
import { JoiV } from '../../..';

export class SftpClient<T extends CS.ConfigSchema> extends ABaseConfigFactory implements ISftpSettings 
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

    public getLegacyConfig() : ILegacyConfig
    {
        return {
        host : this.configSettings.host,
        port : this.configSettings.port,
        username : this.configSettings.credentials? this.configSettings.credentials.username : "",
        password : this.configSettings.credentials.auth.type == JoiV.AuthType.password 
        || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.password : null,
        phrase : this.configSettings.credentials.auth.type == JoiV.AuthType.publicKey
        || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.phrase : "",
        privateKey : this.configSettings.credentials.auth.type == JoiV.AuthType.publicKey
            || this.configSettings.credentials.auth.type == JoiV.AuthType.any ? this.configSettings.credentials.auth.passKey : ""
        };
    }
}