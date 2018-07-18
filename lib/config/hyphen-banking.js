"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const sftp_1 = require("../factories/sftp");
exports.bundleName = "hyphen-banking";
/*
missing configuration in the local copy of config that I had
hyphenPaymentUserProfile
hyphenTrackingDays
ptpTrackingDays
hyphenLoadReportPrefix
*/
exports.configSchema = index_1.JoiX.object().keys({
    pendingNc: index_1.JoiX.boolean().required(),
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
    hyphenSftpPort: index_1.JoiX.number().required(),
    hyphenSftpUser: index_1.JoiX.string().required(),
    hyphenSftpPrivateKey: index_1.JoiX.string().required(),
    hyphenSftpInPath: index_1.JoiX.string().required(),
    port: index_1.JoiV.port().required(),
    hyphenAccountValidationUrl: index_1.JoiX.string().required(),
    hyphenAccountVerificationUserProfile: index_1.JoiX.string().required(),
    hyphenKey: index_1.JoiV.port().required(),
    sftp: sftp_1.configSchema
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwaGVuLWJhbmtpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2h5cGhlbi1iYW5raW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXdEO0FBRXhELDRDQUFpRjtBQUVwRSxRQUFBLFVBQVUsR0FBWSxnQkFBZ0IsQ0FBQztBQUlwRDs7Ozs7O0VBTUU7QUFFVyxRQUFBLFlBQVksR0FBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLFNBQVMsRUFBRyxZQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3JDLHlCQUF5QixFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDdEUsYUFBYSxFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzFFLGFBQWEsRUFBRyxZQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3JDLHdCQUF3QixFQUFHLFlBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtJQUNuSCxnQkFBZ0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzNDLGNBQWMsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ3pDLDhCQUE4QixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzdFLGtCQUFrQixFQUFJLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDdkYsd0JBQXdCLEVBQUcsWUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNwRCxlQUFlLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDeEQsc0JBQXNCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzlELGlCQUFpQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDNUMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDekMsb0JBQW9CLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvQyxnQkFBZ0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzNDLElBQUksRUFBRyxZQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQzdCLDBCQUEwQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckQsb0NBQW9DLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUMvRCxTQUFTLEVBQUcsWUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNsQyxJQUFJLEVBQUcsbUJBQWdCO0NBQzFCLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyJ9