import * as JoiX from '../../../joi-x';
import * as CS from './config-schema';
import { ABaseConfigFactory } from '.././../../../src/config-factory/abase-config-factory';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { ISftpSettings, ILegacyConfig } from '../isftp-config-factory';
export { CS as CS };
export declare class SftpClient<T extends CS.ConfigSchema> extends ABaseConfigFactory implements ISftpSettings {
    configSettings: T;
    factoryName: string;
    factoryClass: ConfigFactoryClass;
    type: ConfigFactoryTypes;
    configSchema: JoiX.XObject & JoiX.ObjectSchema & {
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
    static NewInstance(): SftpClient<JoiX.ExtractFromSchema<JoiX.XObject & JoiX.ObjectSchema & {
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
    }>>;
    constructor(configSettings: T);
    createAsync(config: JoiX.XJSchemaMap): Promise<void>;
    startAsync(): Promise<void>;
    stopAsync(): Promise<void>;
    getLegacyConfig(): ILegacyConfig;
}
