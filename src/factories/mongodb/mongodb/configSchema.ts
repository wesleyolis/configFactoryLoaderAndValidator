import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import {baseConfigSchema} from '../../../config-factory/abase-config-factory-schema'
import * as CFT from '../../../config-factory/config-factory-types'

export const factoryName = "Network";

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;

export const configSchema = JoiX.object().keys({
    class : JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type : JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider : JoiX.string().label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').valid('mongodb'),
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

