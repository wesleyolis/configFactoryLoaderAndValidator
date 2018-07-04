import * as InMemory from '../mongodb/mongodb-in-memory';
import * as JoiX from '../../joi-x';
import * as CFT from '../../config-factory/config-factory-types';
import { IMongoSettings } from './amongodb-config-factory';
export { IMongoSettings };
export declare type MongoDBSchema = JoiX.ExtractFromSchema<typeof mongoDBSchema>;
export declare const mongoDBSchema: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
    __tsTypeO: {
        class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
        type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
        provider: InMemory.CS.XPrimitive<"mongodb"> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
        hosts: InMemory.CS.XArray & InMemory.CS.ArraySchema & {
            __tsTypeAr: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any & {
                __isRequired: "T";
            };
        } & {
            __isRequired: "T";
        };
        credentials: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any;
        database: InMemory.CS.XStringSchema<string>;
        options: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
            __tsTypeOP: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
        };
    };
} & {
    __isRequired: "T";
} & {
    __tsTypeO: {
        factory: InMemory.CS.XPrimitive<"Network"> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
    };
};
export declare type InMemorySchema = JoiX.ExtractFromSchema<typeof inMemorySchema>;
export declare const inMemorySchema: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
    __tsTypeO: {
        class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.service> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
        type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.mock> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
        port: InMemory.CS.XPrimitive<number> & InMemory.CS.NumberSchema & {
            __isRequired: "T";
        };
    };
} & {
    __isRequired: "T";
} & {
    __tsTypeO: {
        factory: InMemory.CS.XPrimitive<"InMemory"> & InMemory.CS.StringSchema & {
            __isRequired: "T";
        };
    };
};
export declare type ConfigFactories = MongoDBSchema | InMemorySchema;
export declare type ConfigSchema = JoiX.ExtractFromSchema<typeof configSchema>;
export declare const configSchema: InMemory.CS.XAlternatives & InMemory.CS.AlternativesSchema & {
    __factoryType: IMongoSettings;
    __NewFactory: <T extends {
        factory: string;
    } & InMemory.CS.XTSchema>(settings: T) => InMemory.CS.IConfigFactory;
    configSchema: InMemory.CS.XObjectSchema;
    configSettings: InMemory.CS.XTSchema;
} & {
    __tsTypeAl: (InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
        __tsTypeO: {
            class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.netService> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
            type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.production> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
            provider: InMemory.CS.XPrimitive<"mongodb"> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
            hosts: InMemory.CS.XArray & InMemory.CS.ArraySchema & {
                __tsTypeAr: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any & {
                    __isRequired: "T";
                };
            } & {
                __isRequired: "T";
            };
            credentials: InMemory.CS.XObject & InMemory.CS.ObjectSchema & any;
            database: InMemory.CS.XStringSchema<string>;
            options: InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
                __tsTypeOP: InMemory.CS.XPrimitive<string> & InMemory.CS.StringSchema & {
                    __isRequired: "T";
                };
            };
        };
    } & {
        __isRequired: "T";
    } & {
        __tsTypeO: {
            factory: InMemory.CS.XPrimitive<"Network"> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
        };
    }) | (InMemory.CS.XObject & InMemory.CS.ObjectSchema & {
        __tsTypeO: {
            class: InMemory.CS.XPrimitive<CFT.ConfigFactoryClass.service> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
            type: InMemory.CS.XPrimitive<CFT.ConfigFactoryTypes.mock> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
            port: InMemory.CS.XPrimitive<number> & InMemory.CS.NumberSchema & {
                __isRequired: "T";
            };
        };
    } & {
        __isRequired: "T";
    } & {
        __tsTypeO: {
            factory: InMemory.CS.XPrimitive<"InMemory"> & InMemory.CS.StringSchema & {
                __isRequired: "T";
            };
        };
    });
} & {
    __isRequired: "T";
};
export declare function NewFactory(settings: ConfigFactories): IMongoSettings;
