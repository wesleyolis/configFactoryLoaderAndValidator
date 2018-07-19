"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
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
exports.configSchema = index_1.JoiX.object().keys({}).keys(exports.globalConfigSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvQ0FBMEU7QUFLMUUscUJBQXFCO0FBQ1IsUUFBQSxrQkFBa0IsR0FBRztJQUM5QixPQUFPLEVBQUUsaUJBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztJQUNoRixxQkFBcUIsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsV0FBVyxDQUFDLDZGQUE2RixDQUFDO0lBQzNKLE1BQU0sRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLHFCQUFxQixFQUFFLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNqRSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsMkJBQTJCLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3JFLGdDQUFnQyxFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMxRSwwQkFBMEIsRUFBRyxZQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDcEUsbUJBQW1CLEVBQUcsWUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdELGdDQUFnQyxFQUFHLFlBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMxRSxLQUFLLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN2QixZQUFZLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN2QyxXQUFXLEVBQUUsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUN4QyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ2IsS0FBSyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdkIsRUFBRSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDN0IsSUFBSSxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7S0FDbEMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtDQUNoQixDQUFDO0FBSVcsUUFBQSxZQUFZLEdBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUU5QyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUFrQixDQUFDLENBQUMifQ==