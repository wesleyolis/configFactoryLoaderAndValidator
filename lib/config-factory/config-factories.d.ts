import { IConfigFactory } from './iconfig-factory';
import * as JoiX from '../joi-x';
export interface Factory {
    configFactoryName: string;
    configFactoryNew: () => IConfigFactory;
}
export declare function _NewFactory<T extends {
    factory: string;
}>(factories: Factory[], settings: T): IConfigFactory;
export declare function StartFactoryAsync<T extends ({
    factory: string;
} & JoiX.XTSchema)>(factory: IConfigFactory, settings: T): Promise<void>;
