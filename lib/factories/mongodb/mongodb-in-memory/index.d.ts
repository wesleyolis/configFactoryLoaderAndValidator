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
    private connectionHost?;
    private connectionPort?;
    private mongoServerInstance;
    static NewInstance(): MongoInMemoryConfigFactory<JoiX.ExtractFromSchema<JoiX.XObject<{
        class: JoiX.XPrimitive<ConfigFactoryClass.service, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        type: JoiX.XPrimitive<ConfigFactoryTypes.mock, Joi.StringSchema, "Required", "NotNullable", "T", "P"> & Joi.StringSchema;
        port: JoiX.XPrimitive<number, Joi.NumberSchema, "Required", "NotNullable", "T", "P"> & Joi.NumberSchema;
    }, "Required", "NotNullable", "K", "P"> & Joi.ObjectSchema>>;
    constructor(configSettings: T);
    createAsync(conf: CS.ConfigSchema): Promise<void>;
    startAsync(): Promise<any>;
    stopAsync(): Promise<any>;
    getConnectionString(): string;
}
