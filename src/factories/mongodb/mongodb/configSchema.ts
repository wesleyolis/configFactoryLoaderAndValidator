import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    type : JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
    hosts : JoiX.array().items(JoiX.object().keys({
                hostname: JoiX.string().required(),
                port: JoiV.port(JoiV.DPorts.mongo).required()
            }).required()
        ).required(),
    credentials : JoiX.object().keys({
        username : JoiX.string().required(),
        password : JoiV.password().required()
    }).required(),
    database : JoiX.string().required(),
    options : JoiX.object().pattern(/w/, JoiX.string().required()).required(),
  }).required();

