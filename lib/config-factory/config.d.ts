import * as JoiX from '../joi-x';
export declare function validateAsync(configSchema: JoiX.XObjectSchema, configSettings: JoiX.XTSchema): Promise<JoiX.ValidationErrorItem[]>;
export declare function describe(configSchema: JoiX.XObjectSchema): string;
export declare abstract class Config {
    readonly abstract configSchema: JoiX.XObjectSchema;
    validateAsync(configSettings: JoiX.XTSchema): Promise<JoiX.ValidationErrorItem[]>;
    describe(): string;
}
