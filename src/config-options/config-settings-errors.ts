import {VError, Options, MultiError} from 'verror'
/*
export enum ErrorType {
    MissingParameter = "MissingParameter",
    MalformedParameter = "MalformedParameter"
}

export enum ErrorMissingParameterClass {
    database = "Database Property",
}

export interface ErrorType<EnumType> {
    Type : EnumType;
    msg : string;
}

export interface ErrorClass<EnumClass> {
    Type : EnumClass;
    msg : string
}

export interface Error<Enum, EnumType> {
    ErrorClass : EnumClass,
    ErrorType : EnumType
    msg : string;
}


export class EVErrors
{
    static errors(error : Error) : Error []
    {
        let cause = VError.cause(error);
        
        if (cause instanceof(MultiError))
        {
            return (cause as MultiError).errors();
        }
        else
        {
            let errors : Error [] = [];

            if (cause)
            {
                errors.push(cause);
                return errors;
            }

            return errors;
        }
    }
}



let error : Error;

// ttail and error connection proedure..

//using existing class.
// connection....
// catch(failuer)
// if ( failure instanceof )
// if ( failure.name =

// expect(error.name).to.be.equal(ErrorMissingParameterClass.database))



// Missing Parameter : Database Property : such and such parameters is not formatted correctly

// new TError( new TError(ErrorParamClass,

// let test : TError;


VError

export class ConfigError extends VError
{
    constructor(type : ErrorType, message: string, error: )
    {
        super({
            name: type
        }, message);
    }
}

const e: Error = new ConfigError(ErrorType.MissingParameter, 'Something happened', {});


export class ErrorContext extends VError
{
    constructor(className : string, error : Error, msg : string = "", ...params: any[])
    {
        super({
        'name' : name,
        'cause': error
        }, msg, ...params);
    }
}

export class ErrorSettings extends VError
{
}

export class ErrorSettingMissing extends ErrorSettings
{
    static readonly errorDescription : string = 'Missing parameter';

    constructor(public parameter : string)
    {   
        super({
            'name' : 'SettingMissing',
            'cause': new Error(parameter)
        }, ErrorSettingMissing.errorDescription);
    }
}

export class ErrorSettingsMissing extends ErrorSettings
{
    static readonly errorDescription : string = "Mutiple parameters missing";

    constructor(errors : ErrorSettingMissing [])
    {
        super({
            'name' : 'MutipleSettingsMissing',
            'cause' : new MultiError(errors)
        }, ErrorSettingsMissing.errorDescription);
    }
}

export class ErrorContext extends ErrorSettings
{
    constructor(className : string, error : Error, msg : string = "", ...params: any[])
    {
        super({
        'name' : name,
        'cause': error
        }, msg, ...params);
    }
}

export class ErrorValidationFailed extends VError
{
    static readonly errorDescription = "Validation Failed";

    constructor(error : ErrorSettings)
    {
        super(error, "Failed to created");
        super.name = "ValidationFailed";
    }
}

*/