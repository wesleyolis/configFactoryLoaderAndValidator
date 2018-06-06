import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    type : JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
    host : JoiX.array().items(JoiX.object().keys({
                hostname: JoiX.string().required(),
                port: JoiV.port(JoiV.DPorts.Mongo).required()
            }).required()
        ),
    database : JoiX.string().required(),
    options : JoiX.object().keys({
        replicaSet : JoiX.string().required()
    })
  }).required();  