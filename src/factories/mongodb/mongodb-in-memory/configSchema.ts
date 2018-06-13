import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
import {baseConfigSchema} from '../../../config-factory/abase-config-factory-schema'
import * as CFT from '../../../config-factory/config-factory-types'

export const factoryName = "InMemory"

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    port: JoiV.port(JoiV.DPorts.mongo).required()
  }).keys(baseConfigSchema).required();