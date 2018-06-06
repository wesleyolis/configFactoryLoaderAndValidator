import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    port: JoiV.port(JoiV.DPorts.Mongo).required()
  }).required();