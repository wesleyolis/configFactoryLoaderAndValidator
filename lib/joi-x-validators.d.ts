import * as JoiX from './joi-x';
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
export declare const password: (passType?: PassType) => JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        phrase: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XStringSchema<PassType>;
    };
};
export declare const mongoConnectionString: () => JoiX.XStringSchema<string>;
export declare const postgress: () => JoiX.XStringSchema<string>;
export declare const Url: () => JoiX.XStringSchema<string>;
