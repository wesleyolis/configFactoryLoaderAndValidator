import { IMongoSettings, ISftpSettings } from '../factories/index'
import * as CFT from '../config-factory/config-factory-types'
import * as Factories from '../factories'
import * as Joi from 'joi'
import * as JoiX from '../joi-x'
import * as JoiV from '../joi-x-validators'


import * as hyphenBanking from './hyphen-banking'

export type GlobalConfigSchema = JoiX.ExtractFromObject<typeof globalConfigSchema>

// As far as we know.
export const globalConfigSchema = {
    mongodb: Factories.MongoDB.configSchema.required().tags('mongoConnectionString'),
    mongoConnectionString : JoiX.string().required().description("Mongo connection string, for legacy support, typically gets inject from a factory instance."),
    agenda : JoiX.object().keys({
        mongoConnectionString: JoiV.mongoConnectionString().required()    
    }).required(),
    mongoRemoteConnectionString : JoiV.mongoConnectionString().required(),
    mongoRemoteAuditConnectionString : JoiV.mongoConnectionString().required(),
    mongoAuditConnectionString : JoiV.mongoConnectionString().required(),
    mongoLocalIpAddress : JoiV.mongoConnectionString().required(),
    postgresReadonlyConnectionString : JoiV.mongoConnectionString().required(),
    mongo : JoiX.object().keys({
        mms_group_id : JoiX.string().required(),
        mss_api_key: JoiX.string().required()
    }).required(),
    oplog : JoiX.object().keys({
        db : JoiX.string().required(),
        host : JoiX.string().required()
    }).required(),
};

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>

export const configSchema = JoiX.object().keys({
    banking : hyphenBanking.configSchema
}).keys(globalConfigSchema).required();
