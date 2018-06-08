import * as JoiX from '../../../joi-x';
import * as Joi from 'joi';
export * from '../../../joi-x-validators';
export * from '../../../joi-x';
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: JoiX.XObject & Joi.ObjectSchema & {
    __tsType: JoiX.ExtractFromObject<{
        type: JoiX.XStringSchema;
        host: JoiX.XArray & Joi.ArraySchema & {
            __tsType: (Record<string, any> & {
                hostname: string;
                port: number;
            } & JoiX.JoiXSchemaTypes)[];
        };
        database: JoiX.XPrimitive<string> & Joi.StringSchema & {
            __isRequired: "T";
        };
        options: JoiX.XObject & Joi.ObjectSchema & any;
    }>;
} & {
    __isRequired: "T";
};
