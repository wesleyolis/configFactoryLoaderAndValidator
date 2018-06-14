import * as CFT from './config-factory-types';
import * as JoiX from '../joi-x';

export interface IConfigFactory
{
    readonly factoryName : String;
    readonly factoryClass : CFT.ConfigFactoryClass;
    readonly type : CFT.ConfigFactoryTypes;

    createFactoryAsync<T extends ({factory: string} & JoiX.XTSchema)>(settings : T) : Promise<void>

    createAsync (config : JoiX.XJSchemaMap) : Promise<void>;

    startAsync () : Promise<void>;

    stopAsync () : Promise<void>;

    validateAsync(configSettings : JoiX.XTSchema) : Promise<JoiX.ValidationErrorItem[]>;

    describe() : string;
}
