"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factories = require("../factories");
const JoiX = require("../joi-x");
const JoiV = require("../joi-x-validators");
const hyphenBanking = require("./hyphen-banking");
// As far as we know.
exports.globalConfigSchema = {
    mongodb: Factories.MongoDB.configSchema.required().tags('mongoConnectionString'),
    mongoConnectionString: JoiX.string().required().description("Mongo connection string, for legacy support, typically gets inject from a factory instance."),
    agenda: JoiX.object().keys({
        mongoConnectionString: JoiV.mongoConnectionString().required()
    }).required(),
    mongoRemoteConnectionString: JoiV.mongoConnectionString().required(),
    mongoRemoteAuditConnectionString: JoiV.mongoConnectionString().required(),
    mongoAuditConnectionString: JoiV.mongoConnectionString().required(),
    mongoLocalIpAddress: JoiV.mongoConnectionString().required(),
    postgresReadonlyConnectionString: JoiV.mongoConnectionString().required(),
    mongo: JoiX.object().keys({
        mms_group_id: JoiX.string().required(),
        mss_api_key: JoiX.string().required()
    }).required(),
    oplog: JoiX.object().keys({
        db: JoiX.string().required(),
        host: JoiX.string().required()
    }).required(),
};
exports.configSchema = JoiX.object().keys({
    banking: hyphenBanking.configSchema
}).keys(exports.globalConfigSchema).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy9nbG9iYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSwwQ0FBeUM7QUFFekMsaUNBQWdDO0FBQ2hDLDRDQUEyQztBQUczQyxrREFBaUQ7QUFJakQscUJBQXFCO0FBQ1IsUUFBQSxrQkFBa0IsR0FBRztJQUM5QixPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDO0lBQ2hGLHFCQUFxQixFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsNkZBQTZGLENBQUM7SUFDM0osTUFBTSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDeEIscUJBQXFCLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ2pFLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDYiwyQkFBMkIsRUFBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckUsZ0NBQWdDLEVBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFFLDBCQUEwQixFQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwRSxtQkFBbUIsRUFBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDN0QsZ0NBQWdDLEVBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzFFLEtBQUssRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLFlBQVksRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ3hDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDYixLQUFLLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN2QixFQUFFLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM3QixJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtLQUNsQyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQ2hCLENBQUM7QUFJVyxRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLE9BQU8sRUFBRyxhQUFhLENBQUMsWUFBWTtDQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUFrQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMifQ==