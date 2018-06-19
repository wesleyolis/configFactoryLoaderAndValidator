import * as Joi from 'joi';
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'

export const factoryName : string = "Client";

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    host : JoiX.string().required(),
    port : JoiV.port(JoiV.DPorts.sftp).required(),
    credentials : JoiX.object().keys({
        username : JoiX.string().required(),
        password : JoiV.password(JoiV.PassType.encrypt).required()
    })
}).required();

/*
host: config.hyphenSftpHost,
port: config.hyphenSftpPort,
username: config.hyphenSftpUser,
privateKey: require('fs').readFileSync(config.hyphenSftpPrivateKey)
}
*/