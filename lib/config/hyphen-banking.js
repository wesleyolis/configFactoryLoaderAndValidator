"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwaGVuLWJhbmtpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2h5cGhlbi1iYW5raW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXdEO0FBRzNDLFFBQUEsVUFBVSxHQUFZLGdCQUFnQixDQUFDO0FBSXBEOzs7Ozs7RUFNRTtBQUVXLFFBQUEsWUFBWSxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsa0JBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzRCxTQUFTLEVBQUcsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNyQyxnQ0FBZ0M7SUFDNUIseUJBQXlCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUN0RSxhQUFhLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDMUUsYUFBYSxFQUFHLFlBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsd0JBQXdCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQ25ILGdCQUFnQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDM0MsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsOEJBQThCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDN0Usa0JBQWtCLEVBQUksWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUN2Rix3QkFBd0IsRUFBRyxZQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3BELGVBQWUsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztJQUN4RCxzQkFBc0IsRUFBRyxZQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDOUQsaUJBQWlCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUM1QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN6QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN6QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUN6QyxvQkFBb0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQy9DLGdCQUFnQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDM0MsSUFBSSxFQUFHLFlBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDN0IsMEJBQTBCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNyRCxvQ0FBb0MsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQy9ELFNBQVMsRUFBRyxZQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBRXpDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyJ9