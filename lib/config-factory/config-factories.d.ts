import { IConfigFactory } from './iconfig-factory';
export interface Factory {
    configFactoryName: string;
    configFactoryNew: () => IConfigFactory;
}
export declare function _NewFactory<T extends {
    factory: string;
}>(factories: Factory[], settings: T): IConfigFactory;
