import { ConfigFactoryClass, ConfigFactoryTypes, IConfigFactoryDef } from './config-factory-types'
import { IConfigFactory } from './iconfig-factory'
import { ConfigSettings } from '../config-options/config-settings-types'
import * as CSE from '../config-options/config-settings-errors'

export abstract class ABaseConfigFactory implements IConfigFactory
{
    FactoryClass : ConfigFactoryClass = ConfigFactoryClass.Factory;
    Type : ConfigFactoryTypes = ConfigFactoryTypes.Vanilla;
    ConfigSettings : ConfigSettings = {};

    private _created : boolean = false;

    create(settings : IConfigFactoryDef)
    {
        this.FactoryClass = settings.FactoryClass;
        this.Type = settings.Type;
        this.ConfigSettings = settings.ConfigSettings;

        try {
            this.validate();
        }
        catch(error)
        {
            if (error instanceof CSE.ErrorSettings)
                throw new CSE.ErrorValidationFailed(error);
            else 
                throw error;
        }
        
        this._created = true;
    }

    start () : void
    {
        if (!this._created)
            throw new Error('Factory has yet to be created.');
    }

    stop () : void
    {
    }

    abstract validate() : void;

    abstract describe() : string;
}