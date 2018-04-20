export type ConfigOptions = {[param : string] : string};

export type ConfigOptionsDef = {[param : string] : (IConfigOptionDef | undefined | ConfigOptionsDef)};

export interface IConfigOptionDef
{
    title: string;
    description: string;
    type: string | number;
    optional: boolean;
    //reg : string; used for implicity validation of string formats.
}

export type OptionsDefErrors = Error;