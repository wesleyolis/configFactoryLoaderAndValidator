import { Factories, CFT, JoiX, JoiV, Joi } from '../index';
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
}).keys(globalConfigSchema);




/*
other config that I don't know were it belongs.
banking : JoiX.object().keys({
        bankingSystem : JoiX.LiteralString(["redblade-hyphen-banking"]).required()
    }).required(),
    documents : JoiX.object().keys({
        s3 : JoiX.object().keys({
            expires : JoiX.number().required()
        }).required()
    }).required(),
    pubSubUrl : hyphenBanking.configSchema.required(),
    serviceBus: JoiX.object().keys({
        service : JoiX.LiteralString(["redblade-servicebus-aws"]).required()
    }).required(),
*/