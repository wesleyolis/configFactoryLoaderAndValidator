import * as CFT from './config-factory-types';
import {ErrorSettings} from '../config-options/config-settings-errors'

export function CreateConfigFactoryInstance<A extends IConfigFactory>(ctor : new() => A) : A 
{
    return new ctor();
}

export interface IConfigFactoryConstructor<T extends IConfigFactory>
{
    new () : T
}

export interface IConfigFactory extends CFT.IConfigFactoryDef
{
    FactoryClass : CFT.ConfigFactoryClass;
    Type : CFT.ConfigFactoryTypes;

    create (config : CFT.IConfigFactoryDef) : void;

    start () : void;

    stop () : void;

    validate() : void;

    describe() : string;
}