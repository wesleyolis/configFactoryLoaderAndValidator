import * as JoiX from './joi-x'
import * as Joi from 'joi'
import * as _ from 'lodash'
import { CFT } from '.';

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

export enum AuthType
{
    password = 'password',
    publicKey = "publicKey",
    any = 'any'
}

export enum PassType
{
    plainText = 'plainText',
    encrypt = "encrypt"
}

export type AuthTypes = AuthPassword | AuthPublicKey | AuthAny;

export type AuthPassword = JoiX.ExtractFromSchema<typeof authPassword>
export type AuthPublicKey = JoiX.ExtractFromSchema<typeof authPublicKey>
export type AuthAny = JoiX.ExtractFromSchema<typeof authAny>

export const password = (passType : PassType = PassType.plainText) => {
    return JoiX.object().keys({
        phrase : JoiX.string().required(),
        type : JoiX.enumString([PassType.plainText, PassType.encrypt]).description("spesified preprocessor, adapter transform to apply, support adapters:'encrypt'")
    }).description("Password, which consists of a phrase and type, were type is adapter tranformation.");
}

export const authPassword = JoiX.object().keys({
    type : JoiX.kind(AuthType.password),
    password : JoiX.string().required()
}).required()

export const authPublicKey = JoiX.object().keys(
{
    type : JoiX.kind(AuthType.publicKey),
    phrase : JoiX.string().required(),
    passKey : JoiX.string().required()
}).required();

export const authAny = JoiX.object().keys({
    type : JoiX.kind(AuthType.any),
    password : JoiX.string().required(),
    phrase : JoiX.string().required(),
    passKey : JoiX.string().required()   
}).required();


export function isAuthPassword(x : AuthTypes) : x is AuthPassword
{
    return x.type === AuthType.password;
}

export function isAuthPublicKey(x : AuthTypes) : x is AuthPublicKey
{
    return x.type === AuthType.publicKey;
}

export function isAuthAny(x : AuthTypes) : x is AuthAny
{
    return x.type === AuthType.any;
}

export const authPasswordOnly = () => {

    return _.cloneDeep(authPassword);
};

export const authentication = () => {
    
    return JoiX.alternatives().try([authPassword, authPublicKey, authAny]).required();
}

export const credentials = () =>
{
    return JoiX.object().keys({
        username : JoiX.string().required(),
        auth : authentication()
    });
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


const test = credentials();

type test = JoiX.ExtractFromSchema<typeof test>;

let impl : test = {
    username : "sdfsdf",
    auth : {
        type : AuthType.password,
        password : "sdf"
    }
}