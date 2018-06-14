import * as JoiX from '../joi-x';

export async function validateAsync(configSchema : JoiX.XObjectSchema, configSettings : JoiX.XTSchema) : Promise<JoiX.ValidationErrorItem[]>
{
    try {
        await JoiX.validate(configSettings, configSchema);
    }
    catch(e)
    {
        if (JoiX.isJoiError(e)) {
            return Promise.resolve(e.details);
        }

        throw e;
    }

    return Promise.resolve([]);
}

export function describe(configSchema : JoiX.XObjectSchema) : string
{
    return JSON.stringify(JoiX.describe(configSchema));
}

export abstract class Config
{
    abstract readonly configSchema : JoiX.XObjectSchema;

    async validateAsync(configSettings : JoiX.XTSchema) : Promise<JoiX.ValidationErrorItem[]>
    {
        return validateAsync(this.configSchema, configSettings);
    }

    describe() : string
    {
        return describe(this.configSchema);
    }
}