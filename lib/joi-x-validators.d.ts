import * as JoiX from './joi-x';
import * as Joi from 'joi';
export interface Port extends JoiX.XNumberSchema {
}
export declare enum DPorts {
    undefined = -1,
    mongo = 27017,
}
export declare const port: (port?: DPorts) => JoiX.XNumberSchema<number>;
export declare enum PassType {
    plainText = "plainText",
    encrypt = "encrypt",
}
export declare const password: (passType?: PassType) => JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX._ExtractFromObject<{
        phrase: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<PassType>;
    }>;
};
