import { ILegacyConfig, InjectConfig } from '../../../config-legacy-gen/iconfig-legacy';
import { SftpInMemoryClientWrapper, CS } from './index';
import * as JoiX from '../../../joi-x';
export declare function NewInstance(injectKey: string): SftpInMemoryClientWrapper<JoiX.ExtractFromSchema<JoiX.XObject & JoiX.ObjectSchema & {
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
export declare class SftpInMemoryClientWrapperWithLegacy<T extends CS.ConfigSchema> extends SftpInMemoryClientWrapper<CS.ConfigSchema> implements ILegacyConfig {
    readonly injectConfig: InjectConfig;
    constructor(settings: T, injectKey: string);
}
