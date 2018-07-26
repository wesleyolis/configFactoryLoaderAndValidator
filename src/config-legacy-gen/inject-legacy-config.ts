
export function injectConfig(rawConfig : any, pathInSchema : string, value : any)
{
    const keys = pathInSchema.split('.');

    let parentConfig = rawConfig;

    for (let i = 0; i < keys.length - 1; i++)
    {
        const key = keys[i];
        parentConfig = parentConfig[key];
        if (parentConfig == undefined)
        {
            parentConfig[key] = {};
            parentConfig = parentConfig[key];
        }
    }

    const insertKey = keys[keys.length - 1];

    delete parentConfig[insertKey];

    Object.defineProperty(parentConfig, insertKey, {get : () => value, configurable : true} );
}