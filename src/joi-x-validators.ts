import * as JoiX from './joi-x'


export interface Port extends JoiX.XNumberSchema {}

export enum DPorts
{
    Undefined = -1,
    Mongo = 27017
}

export const port = (port : DPorts = DPorts.Undefined) => {

    const joi = JoiX.number().min(0).max(65535);

    let desc = 'Typically value must be in Range [0-65535], ports lower than 1024 are reserved.';
    if (port != -1)
        joi.default(port);
    else
        desc += 'Default Port [' + port + ']';

    return joi.description(desc) as Port;
}