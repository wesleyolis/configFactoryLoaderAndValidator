import * as CFT from './config-factory-types';
export declare function CreateConfigFactoryInstance<A extends IConfigFactory>(ctor: new () => A): A;
export interface IConfigFactoryConstructor<T extends IConfigFactory> {
    new (): T;
}
export interface IConfigFactory extends CFT.IConfigFactoryDef {
    FactoryClass: CFT.ConfigFactoryClass;
    Type: CFT.ConfigFactoryTypes;
    create(config: CFT.IConfigFactoryDef): void;
    start(): void;
    stop(): void;
    validate(): void;
    describe(): string;
}
