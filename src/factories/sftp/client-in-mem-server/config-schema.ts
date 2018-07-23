import * as Joi from 'joi'
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'
import * as CS from '../client/config-schema'

export const factoryName = "InMemoryClientWrapper";

export type ConfigSchema = CS.ConfigSchema

export const configSchema = CS.configSchema