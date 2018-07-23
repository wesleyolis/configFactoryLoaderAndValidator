import * as Joi from 'joi';
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'

export const factoryName = "Client";

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    host : JoiX.string().required(),
    port : JoiV.port(JoiV.DPorts.sftp).required(),
    credentials : JoiV.credentials().required()
}).required();