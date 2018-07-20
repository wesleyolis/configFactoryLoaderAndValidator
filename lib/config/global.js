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
}).keys(exports.globalConfigSchema).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBeUY7QUFDekYsa0RBQWlEO0FBSWpELHFCQUFxQjtBQUNSLFFBQUEsa0JBQWtCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLGlCQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUM7SUFDaEYscUJBQXFCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyw2RkFBNkYsQ0FBQztJQUMzSixNQUFNLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN4QixxQkFBcUIsRUFBRSxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDakUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNiLDJCQUEyQixFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNyRSxnQ0FBZ0MsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDMUUsMEJBQTBCLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BFLG1CQUFtQixFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM3RCxnQ0FBZ0MsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDMUUsS0FBSyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdkIsWUFBWSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDdkMsV0FBVyxFQUFFLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDeEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNiLEtBQUssRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLEVBQUUsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQzdCLElBQUksRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ2xDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDaEIsQ0FBQztBQUlXLFFBQUEsWUFBWSxHQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsT0FBTyxFQUFHLGFBQWEsQ0FBQyxZQUFZO0NBQ3ZDLENBQUMsQ0FBQyxJQUFJLENBQUMsMEJBQWtCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyJ9