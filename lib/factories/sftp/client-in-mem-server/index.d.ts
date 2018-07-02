import * as JoiX from '../../../joi-x';
import * as CS from './config-schema';
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types';
import { SftpClient } from '../client/index';
import * as Ssh2 from 'ssh2';
export { Ssh2 };
export declare class SftpInMemoryClientWrapper<T extends CS.ConfigSchema> extends SftpClient<T> {
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
    private server?;
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
    private ServerConnectionListern(clientConnection, info);
}
