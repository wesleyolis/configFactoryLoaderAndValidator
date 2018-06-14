import * as mocha from 'mocha';
import * as chai from 'chai';
import * as JoiX from '../../../src/joi-x';
import * as JoiV from '../../../src/joi-x-validators'
import {ConfigSchema, inMemorySchema, InMemorySchema, mongoDBSchema, MongoDBSchema} from '../../../src/factories/mongodb/index'
import * as CFT from '../../../src/config-factory/config-factory-types'
import { configSchema } from '../../../src/factories/mongodb';

describe("Configuration Schema", function()
{
    describe("Joi sucessfully validates varius schema", async function() {

        const inMemorySettings : InMemorySchema = {
            factory : 'InMemory',
            class : CFT.ConfigFactoryClass.service,
            type : CFT.ConfigFactoryTypes.mock,
            port : 34
        };

        it("InMemory", async function() {
    
            chai.expect(await JoiX.validate(inMemorySettings, inMemorySchema)).to.deep.equal(inMemorySettings)
        })

        const mongoDBSettings : ConfigSchema = {
            factory : 'Network',
            class : CFT.ConfigFactoryClass.netService,
            type : CFT.ConfigFactoryTypes.production,
            provider : 'mongodb',
            credentials : {
                username : 'username',
                password : {
                    phrase : 'sdfsdf',
                    type : JoiV.PassType.plainText
                }
            },
            database : 'databsase',
            hosts : [{hostname:'hostname', port : 237}],
            options : {
                op1 : '1',
                op2 : '2'
            }
        };

        it("mongoDB", async function() {
    
            chai.expect(await JoiX.validate(mongoDBSettings, mongoDBSchema)).to.deep.equal(mongoDBSettings)
        })

        describe("identifies the correct factory and schema", function () {

            type FactorySchema  = JoiX.ExtractFromSchema<typeof factorySchema>;

            const factorySchema = JoiX.object().keys(
            {
                factory : configSchema
            });

            it("InMemory", async function() {
        
                const settings : FactorySchema = {
                    factory : inMemorySettings
                }
        
                chai.expect(await JoiX.validate(settings, factorySchema)).to.deep.equal(settings)
            })
    
            it("mongoDB", async function() {
            
                const settings : FactorySchema = {
                    factory : mongoDBSettings
                }
                chai.expect(await JoiX.validate(settings, factorySchema)).to.deep.equal(settings)
            })
        });
    });
})



/*
type FactorySchema = JoiX._ExtractFromObject<{
    factory: JoiX.XAlternatives & AlternativesSchema & {
        __tsType: (JoiX._ExtractFromObject<{
            factory: JoiX.XPrimitive<"InMemory"> & StringSchema & {
                __isRequired: "T";
            };
        }> & JoiX._ExtractFromObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.service> & StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.mock> & StringSchema & {
                __isRequired: "T";
            };
            port: JoiX.XPrimitive<number> & NumberSchema & {
                __isRequired: "T";
            };
        }>) | (JoiX._ExtractFromObject<{
            factory: JoiX.XPrimitive<"Network"> & StringSchema & {
                __isRequired: "T";
            };
        }> & JoiX._ExtractFromObject<{
            class: JoiX.XPrimitive<CFT.ConfigFactoryClass.netService> & StringSchema & {
                __isRequired: "T";
            };
            type: JoiX.XPrimitive<CFT.ConfigFactoryTypes.production> & StringSchema & {
                __isRequired: "T";
            };
            provider: JoiX.XPrimitive<"mongodb"> & StringSchema & {
                __isRequired: "T";
            };
            hosts: JoiX.XArray & ArraySchema & {
                __tsType: JoiX._ExtractFromObject<{
                    hostname: JoiX.XPrimitive<string> & StringSchema & {
                        __isRequired: "T";
                    };
                    port: JoiX.XPrimitive<number> & NumberSchema & {
                        __isRequired: "T";
                    };
                }>[];
            } & {
                __isRequired: "T";
            };
            credentials: {
                __tsType: JoiX._ExtractFromObject<{
                    username: JoiX.XPrimitive<string> & StringSchema & {
                        __isRequired: "T";
                    };
                    password: any & JoiX.XObject & ObjectSchema & {
                        __isRequired: "T";
                    };
                }>;
            } & JoiX.XObject & ObjectSchema & {
                __isRequired: "T";
            };
            database: JoiX.XPrimitive<string> & StringSchema & {
                __isRequired: "T";
            };
            options: JoiX.XObject & ObjectSchema & {
                __tsType: Record<string, string>;
            } & {
                __isRequired: "T";
            };
        }>);
    } & {
        __isRequired: "T";
    };
}> & JoiX.XTSchema
*/

