import * as JoiX from '../joi-x';
import * as Joi from 'joi';
import {ConfigFactoryClass, ConfigFactoryTypes} from './config-factory-types'
export * from './config-factory-types'

export type BaseConfigSchema = JoiX.ExtractFromObject<typeof baseConfigSchema>;

export const baseConfigSchema = {
    class : JoiX.enumString([ConfigFactoryClass.factory,
        ConfigFactoryClass.module,
        ConfigFactoryClass.netService,
        ConfigFactoryClass.service]).required(),
    type : JoiX.enumString([ConfigFactoryTypes.mock, ConfigFactoryTypes.production]).required()
};