import * as configFactories from './config-factory'
export {configFactories as ConfigFactories}

import * as CFT from './config-factory/config-factory-types'
export {CFT as CFT}


import * as factories from './factories'
export {factories as Factories}

import * as Joi from 'Joi'
export {Joi as Joi}

import * as JoiX from './joi-x'
export {JoiX as JoiX}

import * as JoiV from './joi-x-validators'
import { ConfigFactories } from './config-factory';
export {JoiV as JoiV}

export  {describe as DescribeConfigSchema, validateAsync as ValidatConfigSchemaeAsync} from './config-factory/config'