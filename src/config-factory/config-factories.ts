import { IConfigFactory } from './iconfig-factory'
import * as JoiX from '../joi-x'
import * as Joi from 'joi'
import { VError } from 'verror'

class ConfigErrors
{
    static FactoryLoadingFail = "FactoryLoadingFailed";
}

export interface Factory
{
    configFactoryName : string
    configFactoryNew: () => IConfigFactory
}

export function _NewFactory<T extends {factory : string}>(factories : Factory[], settings : T) : IConfigFactory
{
    const factory = factories.filter(f => f.configFactoryName == settings.factory);

    if (factory)
        return factory[0].configFactoryNew();

    throw new VError({name:ConfigErrors.FactoryLoadingFail}, `Factory: '$settings.factory'`);
}

export function StartFactoryAsync<T extends ({factory: string} & JoiX.XTSchema)>(factory : IConfigFactory, settings : T){

    const unWrappedSettings = delete settings.factory;

    return factory.createAsync(unWrappedSettings);
}