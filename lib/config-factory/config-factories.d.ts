import { IConfigFactory } from './iconfig-factory';
export interface Factory<T extends IConfigFactory> {
    configFactoryName: string;
    configFactoryNew: () => T;
}
export declare function _NewFactory<F extends IConfigFactory, T extends {
    factory: string;
}>(factories: Factory<F>[], settings: T): F;
