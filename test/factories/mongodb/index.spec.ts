import * as chai from 'chai';
import * as JoiX from '../../../lib/joi-x';
import * as JoiV from '../../../lib/joi-x-validators'
import {ConfigSchema, inMemorySchema, InMemorySchema, mongoDBSchema} from '../../../lib/factories/mongodb/index'
import * as CFT from '../../../lib/config-factory/config-factory-types'
import { configSchema } from '../../../lib/factories/mongodb';
import { MongoInMemoryConfigFactory, CS as InMemoryCS } from '../../../lib/factories/mongodb/mongodb-in-memory';
import * as BlueBird from 'bluebird';
import * as BlueBirdPromisify from '../../../lib/util/bluebird-promisify'
import * as mongoose from 'mongoose';

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

    describe("InMemory", async function() {
        
        it("Connect to InMemory", async function() {

            const inMemorySettings : InMemoryCS.ConfigSchema = {
                class : CFT.ConfigFactoryClass.service,
                type : CFT.ConfigFactoryTypes.mock,
                port : 34001
            };
            
            const mongoInMemory = MongoInMemoryConfigFactory.NewInstance();
            
            await mongoInMemory.createAsync(inMemorySettings);

            await mongoInMemory.startAsync();

            const mongoConnectionStr = await mongoInMemory.getConnectionString();

            mongoose.connection.on('error', (error) =>
            {
                console.log('Error:' + JSON.stringify(error));
            });
    
            mongoose.connection.on('connected', () =>
            {
                console.log("Connected");
            });

            const mongooseConnection = BlueBirdPromisify.Promisify(mongoose, 'connect');

            await mongooseConnection(mongoConnectionStr, {});

            const testDoc = new mongoose.Schema({
                propString : String,
                propNumber : Number,
                propBoolean : Boolean
            });

            const testDocModel = mongoose.model('TestDoc', testDoc);

            const doc = new testDocModel({
                propString : 'propA',
                propNumber : 1234,
                propBoolean : true
            });

            await BlueBird.promisify(doc.save).bind(doc)();

            const results = await testDocModel.find({propString:'propA'}).exec();
            
            chai.expect(results.length).eq(1);
            chai.expect(results[0]).to.have.property('propString').to.eq('propA');
            chai.expect(results[0]).to.have.property('propNumber').to.eq(1234);
            chai.expect(results[0]).to.have.property('propBoolean').to.eq(true);
           
        })
    });
});