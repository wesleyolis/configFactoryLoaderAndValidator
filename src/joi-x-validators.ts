import * as JoiX from './joi-x'
import * as Joi from 'joi'

// this can be fixed in version 2.9 if I recall, were generic template parameter can be used to instaniate a base class,
// in which case we can preserve the settings.
export interface Port extends JoiX.XNumberSchema {}

export enum DPorts
{
    undefined = -1,
    mongo = 27017,
    sftp = 22
}

export const port = (port : DPorts = DPorts.undefined) => {

    const joi = JoiX.number().min(0).max(65535);

    let desc = 'Typically value must be in Range [0-65535], ports lower than 1024 are reserved.';
    if (port != -1)
        joi.default(port);
    else
        desc += 'Default Port [' + port + ']';

    return joi.description(desc);   // Remeber that you are overiding the super impose type value build ups.
}

export enum PassType
{
    plainText = 'plainText',
    encrypt = "encrypt"
}

export const password = (passType : PassType = PassType.plainText) => {
    
    return JoiX.object().keys({
        phrase : JoiX.string().required(),
        type : JoiX.enumString([PassType.plainText, PassType.encrypt]).description("spesified preprocessor, adapter transform to apply, support adapters:'encrypt'")
    }).description("Password, which consists of a phrase and type, were type is adapter tranformation.");
}

export const mongoConnectionString = () =>
{
    return JoiX.string();
}

export const postgress = () =>
{
    return JoiX.string()
}

export const Url = () =>
{
    return JoiX.string()
}
