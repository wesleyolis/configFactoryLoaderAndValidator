import {OptionsDefErrors} from '../config-options/config-types';

export class ConfigFactoryDisplayHelper
{
    static describeErrors(optionsErrors : OptionsDefErrors []) : string
    {
        let str = optionsErrors.reduce((acc, error) => {

            acc += error.message + "\n";

            return acc;
        }, "");

        return str;
    }
}