import { ABaseConfigFactory } from '../../../config-factory/abase-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { IMongoSettings } from '.././amongodb-config-factory';
import * as CS from './configSchema';
import * as Joi from 'joi';
import * as JoiX from '../../../joi-x';
export { CS as CS };
export declare class MongoInMemoryConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings {
    readonly configSettings: T;
    readonly factoryName: string;
    readonly factoryClass: ConfigFactoryClass;
    readonly type: ConfigFactoryTypes;
    readonly configSchema: typeof CS.configSchema;
    private mongoServerInstance;
    static NewInstance(): MongoInMemoryConfigFactory<JoiX.ExtractFromSchema<{
        __tsType: JoiX._ExtractFromObject<{
            class: JoiX.XPrimitive<ConfigFactoryClass.service> & Joi.StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<ConfigFactoryTypes.mock> & Joi.StringSchema & {
                __isRequired: "T";
            };
            port: JoiX.XPrimitive<number> & Joi.NumberSchema & {
                __isRequired: "T";
            };
        }>;
    } & JoiX.XObject & Joi.ObjectSchema & {
        __isRequired: "T";
    }>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<any>;
    stopAsync(): any;
    describe(): string;
    validate(): Error[];
    getConnectionString(): string;
}
