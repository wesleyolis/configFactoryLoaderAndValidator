import {ILegacyConfig, InjectConfig, IsLegacyConfig} from '../../../config-legacy-gen/iconfig-legacy'
import { SftpClient, CS } from './index';
import {ILegacyConfig as ISftpLegacyConfig} from '../isftp-config-factory'

import { injectConfig } from '../../../config-legacy-gen/inject-legacy-config';
import * as CFT from '../../../config-factory/config-factory-types'
import * as JoiX from '../../../joi-x'
import * as Joi from 'joi'
import * as JoiV from '../../../joi-x-validators'


export function NewInstance(injectKey : string)
{
    return new SftpClientFactoryWithLegacy<any>(undefined, injectKey) as SftpClient<CS.ConfigSchema>
}

export class SftpClientFactoryWithLegacy<T extends CS.ConfigSchema> extends SftpClient<CS.ConfigSchema> implements ILegacyConfig
{
    readonly injectConfig : InjectConfig;    

    constructor(settings : T, injectKey : string)
    {
        super(settings);

        this.injectConfig = function (rawConfig : string)
        {
            const legacyConfig : ISftpLegacyConfig = this.getLegacyConfig();

            injectConfig(rawConfig,'banking.hyphenSftpHost', legacyConfig.host);
            //injectConfig(rawConfig,'banking.notBackwardsCompatible', legacyConfig.password);
            //injectConfig(rawConfig,'banking.notBackwardCompatible', legacyConfig.phrase);
            injectConfig(rawConfig,'banking.hyphenSftpPort', legacyConfig.port);
            injectConfig(rawConfig,'banking.hyphenSftpPrivateKey', legacyConfig.privateKey);
            injectConfig(rawConfig,'banking.hyphenSftpUser', legacyConfig.username);
        }
    }
}