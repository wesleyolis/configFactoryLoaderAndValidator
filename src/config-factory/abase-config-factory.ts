import {ConfigOptions, ConfigOptionsDef, OptionsDefErrors} from '../config-options/config-types'
import {ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef} from './config-factory-types'
import {IConfigFactory} from './iconfig-factory'

export abstract class ABaseConfigFactory implements IConfigFactory
{
    abstract OptionsDef : ConfigOptionsDef;
    FactoryClass : ConfigFactoryClass = ConfigFactoryClass.Factory;
    Type : ConfigFactoryTypes = ConfigFactoryTypes.Vanilla;
    Options: ConfigOptions = {};

    private _created : boolean = false;

    create(options : IConfigFactoryDef) : Promise<IConfigFactory>
    {
        this.FactoryClass = options.FactoryClass;
        this.Type = options.Type;
        this.Options = options.Options;

        this.validate(this.Options);
        
        this._created = true;

        return Promise.resolve(this);
    }

    start () : Promise<any>
    {
        if (!this._created)
            return Promise.reject('Factory has yet to be created.');

        return Promise.resolve();
    }

    stop () : Promise<any>
    {
        return Promise.resolve();
    }

    public describe() : ConfigOptionsDef
    {
        return this.OptionsDef;
    }

    public validate(options : ConfigOptions) : OptionsDefErrors []
    {
        return ABaseConfigFactory.validate(options, this.OptionsDef);
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