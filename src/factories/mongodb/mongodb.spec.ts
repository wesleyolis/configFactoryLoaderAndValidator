import { expect } from 'chai';
import { IConfigFactoryDef, ConfigFactoryClass, ConfigFactoryTypes } from '../../config-factory/config-factory-types';
import { MongoDBConfigFactory, ConfigOptionsTypes } from './mongodb';
import * as CSE from '../../config-options/config-settings-errors';
const testing = require('redblade-testing');
const returnCaughtError = testing.returnCaughtError;

describe("MongoDBFactory", () => {

    let mongoDBFactoryInstance : MongoDBConfigFactory;

    before(() => {
        mongoDBFactoryInstance = new MongoDBConfigFactory();
    });

    describe("Config Validation", async () => {

        let configFactoryDefault : IConfigFactoryDef = {
            FactoryClass : ConfigFactoryClass.Factory,
            Type: ConfigFactoryTypes.Mock,
            ConfigSettings: <ConfigOptionsTypes> {}
        };

        // Typically create implicity calls validation on the base class implementation.
        it("Create implicitly calls validate", async () =>
        {   
            expect(await testing.returnCaughtError(mongoDBFactoryInstance.create(configFactoryDefault))).to.instanceof(CSE.ErrorValidationFailed);            
        });

        describe("Missing Settings", () => {

            it.only("", async () => {

                const configFactory = Object.assign({}, configFactoryDefault);
                
                configFactory.ConfigSettings = {
                    type : 'databaseType'
                };

                expect(await testing.returnCaughtError(mongoDBFactoryInstance.create(configFactoryDefault)))
                    .to.instanceof(CSE.ErrorValidationFailed).and.to.have.property('message')
                    .contain(CSE.ErrorSettingMissing.errorDescription);
            });
        });

    });
/*
    it.only("Sucessfully loads the config module, overwrite config connection string.", () =>
    {
        let mongoDBFactoryInstance = new MongoDBConfigFactory();

        let configFactory : IConfigFactoryDef = {
            FactoryClass : ConfigFactoryClass.Factory,
            Type : ConfigFactoryTypes.Mock,
            ConfigSettings : <ConfigOptionsTypes>
            {
                type : 'mongodb',
                hosts : [
                    {
                        hostname : "mongodb.example.com",
                        port : "27017"
                    }
                ]
            }
        };

        mongoDBFactoryInstance.create(configFactory);

        let connectionString = mongoDBFactoryInstance.getConnectionString();

        expect(connectionString).to.eq('mongodb');
    });
   */ 
});

