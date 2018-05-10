
export class ErrorSettings extends Error
{
    constructor(msg : string)
    {
        super(msg);
    }
}

export class ErrorSettingMissing extends ErrorSettings
{
    static readonly errorDescription = 'Missing parameter';

    constructor(public parameter : string)
    {   
        super(`${ErrorSettingMissing.errorDescription} [${parameter}]`);
    }
}

export class ErrorSettingsMissing extends ErrorSettings
{
    static readonly errorDescription = 'Missing Multiple Parameter';

    constructor(private errors : ErrorSettingMissing [])
    {
        super(`${ErrorSettingsMissing.errorDescription} (${errors.length}) => ${JSON.stringify(errors)}`);
    }
}

export class ErrorValidationFailed extends Error
{
    constructor(private error : ErrorSettings)
    {
        super(error.message);
    }
}