import * as CT from '../config-options/config-types';
import * as CFT from './config-factory-types'

export interface IConfigFactory extends CFT.IConfigFactoryDef
{
    optionsDef : CT.ConfigOptionsDef;

    create (config : CFT.IConfigFactoryDef) : IConfigFactory;

    run () : void;
}