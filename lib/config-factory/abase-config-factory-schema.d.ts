import * as JoiX from '../joi-x';
import { ConfigFactoryClass, ConfigFactoryTypes } from './config-factory-types';
export * from './config-factory-types';
export declare type BaseConfigSchema = JoiX.ExtractFromObject<typeof baseConfigSchema>;
export declare const baseConfigSchema: {
    class: JoiX.XPrimitive<ConfigFactoryClass> & JoiX.StringSchema & {
        __isRequired: "T";
    };
    type: JoiX.XPrimitive<ConfigFactoryTypes> & JoiX.StringSchema & {
        __isRequired: "T";
    };
};
