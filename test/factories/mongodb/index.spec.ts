import * as chai from 'chai';
import * as JoiX from '../../../src/joi-x';
import * as JoiV from '../../../src/joi-x-validators'
import {ConfigSchema, inMemorySchema, InMemorySchema, mongoDBSchema} from '../../../src/factories/mongodb/index'
import * as CFT from '../../../src/config-factory/config-factory-types'
import { configSchema } from '../../../src/factories/mongodb';

describe("Factories", function()
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
        });

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
});