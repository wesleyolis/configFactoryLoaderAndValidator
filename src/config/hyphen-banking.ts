import * as CFT from '../config-factory/config-factory-types'
import * as Factories from '../factories'
import * as Joi from 'joi'
import * as JoiX from '../joi-x'
import * as JoiV from '../joi-x-validators'


import * as Parent from './index'
import {ISftpSettings, configSchema as sftpConfigSchema, configSchemaInjectLegacy as sftpConfigSchemaInjectLegacy} from '../factories/sftp'

export const bundleName : string = "hyphen-banking";

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

/*
missing configuration in the local copy of config that I had
hyphenPaymentUserProfile
hyphenTrackingDays
ptpTrackingDays
hyphenLoadReportPrefix
*/

export const configSchema = JoiX.object().keys({
    pendingNc : JoiX.boolean().required(),
    hyphenPaymentDocumentType : JoiX.LiteralString(["PT","RC"]).required(),
    bankingSystem : JoiX.LiteralString(["redblade-hyphen-banking"]).required(),
    hyphenFacsUrl : JoiV.Url().required(),
    hyphenPaymentUserProfile : JoiX.LiteralString(['FACRedbladeTest', 'FACDirectAxis', 'FACDirectAxisTest']).required(),
    hyphenPaymentKey : JoiX.string().required(),
    paymentRetries : JoiX.string().required(),
    hyphenDebitOrderOutputFileName : JoiX.string().default('FREDIDBO').required(),
    hyphenTrackingDays :  JoiX.string().valid([0,1,2,3,4,5,6,7,8,9,10,14,21,32]).required(),
    useRuleBasedTrackingDays : JoiX.boolean().required(),
    ptpTrackingDays : JoiX.number().required().default('04'),
    hyphenLoadReportPrefix : JoiX.LiteralString(['LD']).required(),
    hyphenSftpOutPath : JoiX.string().required(),
    hyphenSftpHost : JoiX.string().required(),
    hyphenSftpPort : JoiX.number().required(),
    hyphenSftpUser : JoiX.string().required(),
    hyphenSftpPassword : JoiX.string().required(),  // Not support by the current system just yet, only implmented for that that require it for testing.
    hyphenSftpPrivateKey : JoiX.string().required(),
    hyphenSftpInPath : JoiX.string().required(),
    port : JoiV.port().required(),
    hyphenAccountValidationUrl : JoiX.string().required(),
    hyphenAccountVerificationUserProfile : JoiX.string().required(),
    hyphenKey : JoiV.port().required(),
   sftp : sftpConfigSchemaInjectLegacy
}).required();

