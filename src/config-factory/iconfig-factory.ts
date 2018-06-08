import * as CFT from './config-factory-types';
import * as JoiX from '../joi-x';
import {ConfigSettings} from '../config-options/config-settings-types';

export function NewConfigFactoryInstance<A extends IConfigFactory>(ctor : new() => A) : A 
{
    return new ctor();
}

export interface IConfigFactoryConstructor<T extends IConfigFactory>
{
    new () : T
}

export interface IConfigFactory
{
    readonly FactoryName : String;
    readonly factoryClass : CFT.ConfigFactoryClass;
    readonly type : CFT.ConfigFactoryTypes;
    readonly configSchema : JoiX.XSchema;

    createAsync (config : JoiX.XJSchemaMap) : Promise<void>;

    startAsync () : Promise<void>;

    stopAsync () : Promise<void>;

    validateAsync(configSettings : ConfigSettings) : Promise<JoiX.ValidationErrorItem[]>;

    describe() : string;
}

