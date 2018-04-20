import {ConfigOptions, ConfigOptionsDef, OptionsDefErrors} from '../config-options/config-types'
import {ConfigFactoryClass, ConfigFactoryTypes} from './config-factory-types'
import {IConfigFactory} from './iconfig-factory'

export abstract class ABaseConfigFactory implements IConfigFactory
{
    abstract optionsDef : ConfigOptionsDef;
    abstract FactoryClass : ConfigFactoryClass;
    abstract Type : ConfigFactoryTypes;
    abstract Options : ConfigOptions;

    abstract create() : IConfigFactory;
    abstract run () : void;

    public validate(options : ConfigOptions)
    {
        return ABaseConfigFactory.validate(options, this.optionsDef);
    }
   
    static validate(options : ConfigOptions, optionsDef : ConfigOptionsDef) : OptionsDefErrors []
    {
        let errors : Error [] = Object.keys(options).reduce((accErrors, param) => {
           
            let optionDef = optionsDef[param];

            if (optionDef == undefined)
                accErrors.push(new Error("[" + param + "] is an unrecognized config parameter, check your spelling."));

            let value = options[param];

            /*
            if (optionDef.type != (typeof value))
                accErrors.push(new Error("[" + param + "] is of type [" + (typeof value) + "], but should be of type '" + optionDef.type + "'"));
            */

            return accErrors;
        },<Error []>([]));

        // [ToDo] still required to check if all parameters have been supplied for each document level are present.
        // options arguments for a set are just ignore if they are missing.

        return errors;
    }
}