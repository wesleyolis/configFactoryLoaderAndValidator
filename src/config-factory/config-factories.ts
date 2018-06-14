import { IConfigFactory } from './iconfig-factory'
import * as JoiX from '../joi-x'
import * as Joi from 'joi'
import { VError } from 'verror'

class ConfigErrors
{
    static FactoryLoadingFail = "FactoryLoadingFailed";
}

export interface Factory<T extends IConfigFactory>
{
    configFactoryName : string
    configFactoryNew: () => T
}

export function _NewFactory<F extends IConfigFactory, T extends {factory : string}>(factories : Factory<F>[], settings : T) : F
{
    const factory = factories.filter(f => f.configFactoryName == settings.factory);

    if (factory)
        return factory[0].configFactoryNew();

    throw new VError({name:ConfigErrors.FactoryLoadingFail}, `Factory: '$settings.factory'`);
}