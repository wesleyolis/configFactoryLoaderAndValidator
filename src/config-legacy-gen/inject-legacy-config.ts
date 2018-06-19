
export function injectConfig(rawConfig : any, pathInSchema : string, value : any)
{
    const keys = pathInSchema.split('.');

    let insertKey = rawConfig;

    keys.forEach((key) => {

        insertKey = rawConfig[key];
        if(insertKey == undefined)
            insertKey = rawConfig[key] = {};
    });

    insertKey = value;
}