export declare class ErrorSettings extends Error {
    constructor(msg: string);
}
export declare class ErrorSettingMissing extends ErrorSettings {
    parameter: string;
    static readonly errorDescription: string;
    constructor(parameter: string);
}
export declare class ErrorSettingsMissing extends ErrorSettings {
    private errors;
    static readonly errorDescription: string;
    constructor(errors: ErrorSettingMissing[]);
}
export declare class ErrorValidationFailed extends Error {
    private error;
    constructor(error: ErrorSettings);
}
