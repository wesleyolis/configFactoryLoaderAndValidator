import * as JoiX from './joi-x';
import * as Joi from 'joi';
export interface Port extends JoiX.XNumberSchema {
}
export declare enum DPorts {
    undefined = -1,
    mongo = 27017,
    sftp = 22,
}
export declare const port: (port?: DPorts) => JoiX.XNumberSchema<number>;
export declare enum PassType {
    plainText = "plainText",
    encrypt = "encrypt",
}
export declare const password: (passType?: PassType) => {
    __tsType: JoiX._ExtractFromObject<{
        phrase: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<PassType>;
    }>;
} & JoiX.XObject & Joi.ObjectSchema;
export declare const mongoConnectionString: () => JoiX.XStringSchema<string>;
export declare const postgress: () => JoiX.XStringSchema<string>;
export declare const Url: () => JoiX.XStringSchema<string>;
