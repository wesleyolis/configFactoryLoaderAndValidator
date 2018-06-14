import * as JoiV from '../../../joi-x-validators';
import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
import {baseConfigSchema} from '../../../config-factory/abase-config-factory-schema'
import * as CFT from '../../../config-factory/config-factory-types'
import {ObjectClean} from 'typelevel-ts'

export const factoryName = "Network";

export type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
  
export type Credentials = JoiX.ExtractFromSchema<typeof credentials>;

export type Password = JoiX.ExtractFromSchema<typeof password>;

export const password = JoiV.password().required();

export const credentials = JoiX.object().keys({
    username : JoiX.string().required(),
    password : password
}).required();

export const configSchema = JoiX.object().keys({
    class : JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type : JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required(),
    provider : JoiX.LiteralString(['mongodb']).label('Database Provider').description('MongoDB, MSQL, Mysql, Postgress').required(),
    hosts : JoiX.array().items(JoiX.object().keys({
                hostname: JoiX.string().required(),
                port: JoiV.port(JoiV.DPorts.mongo).required()
            }).required()
        ).required(),
    credentials : credentials,
    database : JoiX.string().required(),
    options : JoiX.object().pattern(/w/, JoiX.string().required()).required(),
  }).required();



