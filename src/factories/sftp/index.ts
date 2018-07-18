import {Factory, _NewFactory} from '../../config-factory/config-factories';

import * as sftpClient from './client';
import * as sftpClientCS from './client/config-schema';

import * as sftpInMem from './client-in-mem-server'
import * as sftpInMemCS from './client-in-mem-server/config-schema'

import * as Joi from 'joi';
import * as JoiX from '../../joi-x';
import * as JoiV from '../../joi-x-validators';
import { IConfigFactory } from '../../config-factory/iconfig-factory';
import * as CFT from '../../config-factory/config-factory-types'
import { ConfigFactories } from '../../config-factory/index';
import {ISftpSettings} from './isftp-config-factory'
export {ISftpSettings}

export type SftpClientSchema = JoiX.ExtractFromSchema<typeof sftpClientSchema>

export const sftpClientSchema = sftpClientCS.configSchema.keys({
    factory: JoiX.kind(sftpClientCS.factoryName)
}).required();

export type SftpInMemSchema = JoiX.ExtractFromSchema<typeof sftpInMemSchema>;

export const sftpInMemSchema = sftpInMemCS.configSchema.keys({
    factory : JoiX.kind(sftpInMemCS.factoryName)
}).required();


export type ConfigFactories = SftpClientSchema | SftpInMemSchema;

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.Factory<ISftpSettings>(JoiX.FactoryType.issolated, NewFactory).try([sftpClientSchema, sftpInMemSchema]).required();

const factories : Factory<ISftpSettings> [] = [
    {
        configFactoryName : sftpClientCS.factoryName,
        configFactoryNew: sftpClient.SftpClient.NewInstance
    },
    {
        configFactoryName: sftpClientCS.factoryName,
        configFactoryNew: sftpInMem.SftpInMemoryClientWrapper.NewInstance
    }
];

export function NewFactory(settings : ConfigFactories) : ISftpSettings {
    return _NewFactory(factories, settings);
}


