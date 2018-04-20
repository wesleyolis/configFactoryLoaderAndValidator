import {IConfigOptionDef, ConfigOptionsDef, OptionsDefErrors} from './config-types';

export class ConfigDisplayHelper
{
    static describeOptions(optionsDef : ConfigOptionsDef) : string
    {
        let str = Object.keys(optionsDef).reduce((acc, param) => {

            let optionDef = optionsDef[param];

            /*
            if (optionDef instanceof ConfigOptionsDef)
            {
                acc += this.describeOptions(optionsDef);

                return acc;
            }*/

            let optionsIDef = <IConfigOptionDef>(optionDef);

            acc += "-" + param + " : " + optionsIDef.title + "\n";
            acc += " ".repeat(param.length + 4) + optionsIDef.description + "\n\n";
            
            return acc;

        }, "");

        return str;
    };

    static describeErrors(optionsErrors : OptionsDefErrors []) : string
    {
        let str = optionsErrors.reduce((acc, error) => {

            acc += error.message + "\n";

            return acc;
        }, "");

        return str;
    }
}