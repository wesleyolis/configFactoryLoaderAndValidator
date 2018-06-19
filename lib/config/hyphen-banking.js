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
    banking: index_1.JoiX.object().keys({
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
    }).required()
}).required();
const parentConfigSchema = {
    mongoConnectionString: Parent.configSchemaGlobal.mongoConnectionString,
};
const standAloneConfigSchema = exports.configSchema.keys(parentConfigSchema);
/*
documents : JoiX.object().keys({
        s3 : JoiX.object().keys({
            expires : JoiX.number().required()
        }).required()
    }).required(),
    pubSubUrl : JoiX.string().required(),
    serviceBus: JoiX.object().keys({
        service : JoiX.LiteralString(["redblade-servicebus-aws"]).required()
    }).required(),
    mongodb: Factories.MongoDB.configSchema.required()
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHlwaGVuLWJhbmtpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2h5cGhlbi1iYW5raW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXdEO0FBQ3hELGtDQUFpQztBQUVwQixRQUFBLFVBQVUsR0FBWSxnQkFBZ0IsQ0FBQztBQUlwRDs7Ozs7O0VBTUU7QUFFVyxRQUFBLFlBQVksR0FBRyxZQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFVLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsU0FBUyxFQUFHLFlBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDckMsT0FBTyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDekIseUJBQXlCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUN0RSxhQUFhLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDMUUsYUFBYSxFQUFHLFlBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDckMsd0JBQXdCLEVBQUcsWUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO1FBQ25ILGdCQUFnQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDM0MsY0FBYyxFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDekMsOEJBQThCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDN0Usa0JBQWtCLEVBQUksWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtRQUN2Rix3QkFBd0IsRUFBRyxZQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ3BELGVBQWUsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUN4RCxzQkFBc0IsRUFBRyxZQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7UUFDOUQsaUJBQWlCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUM1QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN6QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN6QyxjQUFjLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUN6QyxvQkFBb0IsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQy9DLGdCQUFnQixFQUFHLFlBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDM0MsSUFBSSxFQUFHLFlBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDN0IsMEJBQTBCLEVBQUcsWUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNyRCxvQ0FBb0MsRUFBRyxZQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQy9ELFNBQVMsRUFBRyxZQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0tBQ3JDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDaEIsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBR2QsTUFBTSxrQkFBa0IsR0FBRztJQUN2QixxQkFBcUIsRUFBRyxNQUFNLENBQUMsa0JBQWtCLENBQUMscUJBQXFCO0NBQzFFLENBQUE7QUFJRCxNQUFNLHNCQUFzQixHQUFHLG9CQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7O0VBV0UifQ==