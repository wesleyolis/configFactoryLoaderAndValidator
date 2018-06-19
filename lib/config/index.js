"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
exports.configSchemaGlobal = {
    mongoConnectionString: index_1.JoiV.mongoConnectionString().required(),
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
    mongodb: index_1.Factories.MongoDB.configSchema.required().tags('mongoConnectionString'),
    mongoConnectionString: index_1.JoiX.string().required().description("Mongo connection string, for legacy support, typically gets inject from a factory instance."),
}).keys(exports.configSchemaGlobal);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQTJEO0FBRzlDLFFBQUEsa0JBQWtCLEdBQUc7SUFDOUIscUJBQXFCLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQy9ELE1BQU0sRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLHFCQUFxQixFQUFFLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNqRSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsMkJBQTJCLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3JFLGdDQUFnQyxFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMxRSwwQkFBMEIsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEUsbUJBQW1CLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdELGdDQUFnQyxFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMxRSxLQUFLLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN2QixZQUFZLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN2QyxXQUFXLEVBQUUsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUN4QyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsS0FBSyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdkIsRUFBRSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDN0IsSUFBSSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDbEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUNoQixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztJQUMzQyxPQUFPLEVBQUUsaUJBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUNoRixxQkFBcUIsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLDZGQUE2RixDQUFDO0NBQzlKLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQWtCLENBQUMsQ0FBQztBQUc1Qjs7Ozs7Ozs7Ozs7Ozs7RUFjRSJ9