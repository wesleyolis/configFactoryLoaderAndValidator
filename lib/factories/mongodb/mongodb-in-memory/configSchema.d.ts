import * as JoiX from '../../../joi-x';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
import * as CFT from '../../../config-factory/config-factory-types';
export declare const factoryName = "InMemory";
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & JoiX.ObjectSchema & {
    __tsTypeO: {
        class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        port: JoiX.XPrimitive<number> & JoiX.NumberSchema & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
};
