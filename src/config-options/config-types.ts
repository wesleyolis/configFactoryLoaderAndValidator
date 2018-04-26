export type ConfigOptions = {[param : string] : (string | number | boolean)};

export type ConfigOptionsDef = {[param : string] : (IConfigOptionDef | (ConfigOptionsDef[]) | undefined)};

var test : ConfigOptionsDef = 
{
'test' : {
    title:'',
    description:'',
    type:'string',
    optional:false
  },
  'param2' : [{
    'test' : {
        title:'',
        description:'',
        type:'string',
        optional:false
    }
}]
};



export interface IConfigOptionDef
{
    title : string,
    description : string,
    type: ('string' | 'number' | 'boolean' | 'array'),
    optional : boolean 
    child? : ConfigOptionsDef  
}

export type OptionsDefErrors = Error;