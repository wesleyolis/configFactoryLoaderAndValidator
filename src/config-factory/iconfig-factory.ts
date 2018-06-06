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

export interface IConfigFactory extends CFT.IConfigFactoryDef
{
    readonly configFactoryName : String;
    factoryClass : CFT.ConfigFactoryClass;
    type : CFT.ConfigFactoryTypes;
    readonly configSchema : JoiX.Schema;

    createAsync (config : CFT.IConfigFactoryDef) : Promise<void>;

    startAsync () : Promise<void>;

    stopAsync () : Promise<void>;

    validateAsync(configSettings : ConfigSettings) : Promise<JoiX.ValidationErrorItem[]>;

    describe() : string;
}

