import * as JoiX from '../../../joi-x';
import * as CS from '../client/config-schema';
export declare const factoryName: string;
export declare type ConfigSchema = CS.ConfigSchema;
export declare const configSchema: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        host: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & JoiX.NumberSchema & {
            __isRequired: "T";
        };
        credentials: JoiX.XObject & JoiX.ObjectSchema & any & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
