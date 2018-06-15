import * as chai from 'chai';
import {JoiX, JoiV, CFT} from '../../../src/index';
import {MongoDBConfigFactory, CS} from '../../../src/factories/mongodb/mongodb'
import {ConfigSchema} from '../../../src/factories/mongodb/mongodb/configSchema'

async function returnCaughtErrorAsync (resultsPromise : Promise<any>)
{
    try
    {
        await resultsPromise;
    }
    catch(err)
    {
        return err;
    }
}


describe("MongoDBFactory:\n", function () {

    describe("MongoDB", function() {

        it("CreateAsync, start, stop and can get connection String.", async function() {

            const settings : ConfigSchema = {
                class : CFT.ConfigFactoryClass.netService,
                type : CFT.ConfigFactoryTypes.production,
                provider : "mongodb",
                credentials : {
                    username : 'myusername',
                    password : {
                        phrase : 'mypassword',
                        type : JoiV.PassType.plainText
                    }
                },
                database : 'database',
                hosts : [{hostname:'myhostname', port : 3465}, {hostname:'myhostname2', port : 3467}],
                options : {
                    op1 : 'opVal1',
                    op2 : 'opVal2'
                }
            };

            const dbInstance = MongoDBConfigFactory.NewInstance();
            await dbInstance.createAsync(settings);

            chai.expect(dbInstance.getConnectionString())
            .equals("mongodb://myusername:mypassword@myhostname:3465,myhostname2:3465/database?op1=opVal1&op2=opVal2");
            chai.expect(() => dbInstance.startAsync()).not.to.throw();
            chai.expect(() => dbInstance.stopAsync()).not.to.throw();
        });

        describe("getConnectionString:\n", function ()
        {
            it("hosts missing", async function() {

                const settings : ConfigSchema = {
                    class : CFT.ConfigFactoryClass.netService,
                    type : CFT.ConfigFactoryTypes.production,
                    provider : "mongodb",
                    credentials : undefined,
                    database : undefined,
                    hosts : [],
                    options : undefined
                };
    
                const dbInstance = MongoDBConfigFactory.NewInstance();

                chai.expect(await returnCaughtErrorAsync(dbInstance.createAsync(settings)))
                .property('jse_cause').property('name').eq('ValidationError');
            });

            it("all, with host & credentials & database & options", async function() {

                const settings : ConfigSchema = {
                    class : CFT.ConfigFactoryClass.netService,
                    type : CFT.ConfigFactoryTypes.production,
                    provider : "mongodb",
                    credentials : {
                        username : 'myusername',
                        password : {
                            phrase : 'mypassword',
                            type : JoiV.PassType.plainText
                        }
                    },
                    database : 'database',
                    hosts : [{hostname:'myhostname', port : 3465}, {hostname:'myhostname2', port : 3467}],
                    options : {
                        op1 : 'opVal1',
                        op2 : 'opVal2'
                    }
                };
    
                const dbInstance = MongoDBConfigFactory.NewInstance();
                await dbInstance.createAsync(settings);
    
                chai.expect(dbInstance.getConnectionString())
                .equals("mongodb://myusername:mypassword@myhostname:3465,myhostname2:3465/database?op1=opVal1&op2=opVal2");
            });

            it("with host", async function() {

                const settings : ConfigSchema = {
                    class : CFT.ConfigFactoryClass.netService,
                    type : CFT.ConfigFactoryTypes.production,
                    provider : "mongodb",
                    credentials : undefined,
                    database : undefined,
                    hosts : [{hostname:'myhostname', port : 3465}],
                    options : undefined
                };
    
                const dbInstance = MongoDBConfigFactory.NewInstance();
                await dbInstance.createAsync(settings);
    
                chai.expect(dbInstance.getConnectionString()).equals("mongodb://myhostname:3465");
            });

            it("with host & credentials", async function() {

                const settings : ConfigSchema = {
                    class : CFT.ConfigFactoryClass.netService,
                    type : CFT.ConfigFactoryTypes.production,
                    provider : "mongodb",
                    credentials : {
                        username : 'myusername',
                        password : {
                            phrase : 'mypassword',
                            type : JoiV.PassType.plainText
                        }
                    },
                    database : undefined,
                    hosts : [{hostname:'myhostname', port : 3465}],
                    options : undefined
                };
    
                const dbInstance = MongoDBConfigFactory.NewInstance();
                await dbInstance.createAsync(settings);
    
                chai.expect(dbInstance.getConnectionString())
                .equals("mongodb://myusername:mypassword@myhostname:3465");
            });

            it("with host & credentials & database", async function() {

                const settings : ConfigSchema = {
                    class : CFT.ConfigFactoryClass.netService,
                    type : CFT.ConfigFactoryTypes.production,
                    provider : "mongodb",
                    credentials : {
                        username : 'myusername',
                        password : {
                            phrase : 'mypassword',
                            type : JoiV.PassType.plainText
                        }
                    },
                    database : 'database',
                    hosts : [{hostname:'myhostname', port : 3465}],
                    options : undefined
                };
    
                const dbInstance = MongoDBConfigFactory.NewInstance();
                await dbInstance.createAsync(settings);
    
                chai.expect(dbInstance.getConnectionString())
                .equals("mongodb://myusername:mypassword@myhostname:3465/database");
            });

        });
    });
});