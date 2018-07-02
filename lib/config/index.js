"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const hyphenBanking = require("./hyphen-banking");
// As far as we know.
exports.globalConfigSchema = {
    mongodb: index_1.Factories.MongoDB.configSchema.required().tags('mongoConnectionString'),
    mongoConnectionString: index_1.JoiX.string().required().description("Mongo connection string, for legacy support, typically gets inject from a factory instance."),
    agenda: index_1.JoiX.object().keys({
        mongoConnectionString: index_1.JoiV.mongoConnectionString().required()
    }).required(),
    mongoRemoteConnectionString: index_1.JoiV.mongoConnectionString().required(),
    mongoRemoteAuditConnectionString: index_1.JoiV.mongoConnectionString().required(),
    mongoAuditConnectionString: index_1.JoiV.mongoConnectionString().required(),
    mongoLocalIpAddress: index_1.JoiV.mongoConnectionString().required(),
    postgresReadonlyConnectionString: index_1.JoiV.mongoConnectionString().required(),
    mongo: index_1.JoiX.object().keys({
        mms_group_id: index_1.JoiX.string().required(),
        mss_api_key: index_1.JoiX.string().required()
    }).required(),
    oplog: index_1.JoiX.object().keys({
        db: index_1.JoiX.string().required(),
        host: index_1.JoiX.string().required()
    }).required(),
};
exports.configSchema = index_1.JoiX.object().keys({
    banking: hyphenBanking.configSchema
}).keys(exports.globalConfigSchema);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQTJEO0FBQzNELGtEQUFpRDtBQU1qRCxxQkFBcUI7QUFDUixRQUFBLGtCQUFrQixHQUFHO0lBQzlCLE9BQU8sRUFBRSxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2hGLHFCQUFxQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkZBQTZGLENBQUM7SUFDM0osTUFBTSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDeEIscUJBQXFCLEVBQUUsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ2pFLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDYiwyQkFBMkIsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckUsZ0NBQWdDLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFFLDBCQUEwQixFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwRSxtQkFBbUIsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDN0QsZ0NBQWdDLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFFLEtBQUssRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLFlBQVksRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3ZDLFdBQVcsRUFBRSxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ3hDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDYixLQUFLLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN2QixFQUFFLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM3QixJQUFJLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNsQyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2hCLENBQUM7QUFJVyxRQUFBLFlBQVksR0FBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLE9BQU8sRUFBRyxhQUFhLENBQUMsWUFBWTtDQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUFrQixDQUFDLENBQUM7QUFLNUI7Ozs7Ozs7Ozs7Ozs7O0VBY0UifQ==