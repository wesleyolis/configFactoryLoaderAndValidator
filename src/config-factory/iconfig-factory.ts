import * as CT from '../config-options/config-types';
import * as CFT from './config-factory-types';
import {ConfigOptions, ConfigOptionsDef, OptionsDefErrors} from '../config-options/config-types';

export interface IConfigFactory extends CFT.IConfigFactoryDef
{
    OptionsDef : CT.ConfigOptionsDef;

    create (config : CFT.IConfigFactoryDef) : Promise<IConfigFactory>;

    start () : Promise<any>;

    stop () : Promise<any>;

    validate(options : ConfigOptions) : OptionsDefErrors [];

    describe() : ConfigOptionsDef;
}