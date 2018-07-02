"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Parent = require("./index");
exports.bundleName = "hyphen-banking";
/*
missing configuration in the local copy of config that I had
hyphenPaymentUserProfile
hyphenTrackingDays
ptpTrackingDays
hyphenLoadReportPrefix
*/
exports.configSchema = index_1.JoiX.objectBundle(exports.bundleName).keys({
    pendingNc: index_1.JoiX.boolean().required(),
    //banking : JoiX.object().keys({
    hyphenPaymentDocumentType: index_1.JoiX.LiteralString(["PT", "RC"]).required(),
    bankingSystem: index_1.JoiX.LiteralString(["redblade-hyphen-banking"]).required(),
    hyphenFacsUrl: index_1.JoiV.Url().required(),
    hyphenPaymentUserProfile: index_1.JoiX.LiteralString(['FACRedbladeTest', 'FACDirectAxis', 'FACDirectAxisTest']).required(),
    hyphenPaymentKey: index_1.JoiX.string().required(),
    paymentRetries: index_1.JoiX.string().required(),
    hyphenDebitOrderOutputFileName: index_1.JoiX.string().default('FREDIDBO').required(),
    hyphenTrackingDays: index_1.JoiX.string().valid([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 21, 32]).required(),
    useRuleBasedTrackingDays: index_1.JoiX.boolean().required(),
    ptpTrackingDays: index_1.JoiX.number().required().default('04'),
    hyphenLoadReportPrefix: index_1.JoiX.LiteralString(['LD']).required(),
    hyphenSftpOutPath: index_1.JoiX.string().required(),
    hyphenSftpHost: index_1.JoiX.string().required(),
    hyphenSftpPort: index_1.JoiX.string().required(),
    hyphenSftpUser: index_1.JoiX.string().required(),
    hyphenSftpPrivateKey: index_1.JoiX.string().required(),
    hyphenSftpInPath: index_1.JoiX.string().required(),
    port: index_1.JoiV.port().required(),
    hyphenAccountValidationUrl: index_1.JoiX.string().required(),
    hyphenAccountVerificationUserProfile: index_1.JoiX.string().required(),
    hyphenKey: index_1.JoiV.port().required(),
}).required();
const parentConfigSchema = {
    mongoConnectionString: Parent.globalConfigSchema.mongoConnectionString,
    mongodb: Parent.globalConfigSchema.mongodb
};
const standAloneConfigSchema = exports.configSchema.keys(parentConfigSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwaGVuLWJhbmtpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2h5cGhlbi1iYW5raW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXdEO0FBQ3hELGtDQUFpQztBQUVwQixRQUFBLFVBQVUsR0FBWSxnQkFBZ0IsQ0FBQztBQUlwRDs7Ozs7O0VBTUU7QUFFVyxRQUFBLFlBQVksR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFVLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsU0FBUyxFQUFHLFlBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsZ0NBQWdDO0lBQzVCLHlCQUF5QixFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDdEUsYUFBYSxFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzFFLGFBQWEsRUFBRyxZQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3JDLHdCQUF3QixFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNuSCxnQkFBZ0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzNDLGNBQWMsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3pDLDhCQUE4QixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzdFLGtCQUFrQixFQUFJLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDdkYsd0JBQXdCLEVBQUcsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwRCxlQUFlLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEQsc0JBQXNCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzlELGlCQUFpQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDNUMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsb0JBQW9CLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQyxnQkFBZ0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzNDLElBQUksRUFBRyxZQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdCLDBCQUEwQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckQsb0NBQW9DLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvRCxTQUFTLEVBQUcsWUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUV6QyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFFZCxNQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLHFCQUFxQixFQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxxQkFBcUI7SUFDdkUsT0FBTyxFQUFHLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPO0NBQzlDLENBQUE7QUFJRCxNQUFNLHNCQUFzQixHQUFHLG9CQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMifQ==