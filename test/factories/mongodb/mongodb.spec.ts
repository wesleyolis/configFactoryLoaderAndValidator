// import { expect } from 'chai';
// import { IConfigFactoryDef, ConfigFactoryClass, ConfigFactoryTypes } from '../../../lib/config-factory/config-factory-types';
// import { MongoDBConfigFactory, ConfigOptionsTypes } from '../../../lib/factories/mongodb/mongodb';
// import * as CSE from '../../../lib/config-options/config-settings-errors';
// import VError, { MultiError } from 'verror'
// import * as _ from 'lodash';


// const testing = require('redblade-testing');
// const returnCaughtError = testing.returnCaughtError;

// describe("MongoDBFactory", () => {

//     let mongoDBFactoryInstance : MongoDBConfigFactory;

//     before(() => {
//         mongoDBFactoryInstance = new MongoDBConfigFactory();
//     });

//     describe("Config Validation", async () => {

//         const configFactoryDefault : IConfigFactoryDef = {
//             FactoryClass : ConfigFactoryClass.Factory,
//             Type: ConfigFactoryTypes.Mock,
//             ConfigSettings: <ConfigOptionsTypes> {
//                 type : 'mongodb',
//                 hosts: [{
//                     hostname: 'test.host',
//                     port: 30000
//                 }],
//                 database : 'database' 
//             }
//         };

//         // Typically create implicity calls validation on the base class implementation.
//         it("Create implicitly calls validate, has sucessfully validation", async () =>
//         {   
//             const configFactory = Object.assign({}, configFactoryDefault);
//             configFactory.ConfigSettings = null;

//             let caughtError = await testing.returnCaughtError(mongoDBFactoryInstance.create(configFactory));
//             expect(CSE.EVErrors.errors(caughtError).length).to.eq(0);         
//         });

//         it("Create implicitly calls validate, fails with all parameters missing", async () =>
//         {   
//             const configFactory = Object.assign({}, configFactoryDefault);

//             let caughtError = await testing.returnCaughtError(mongoDBFactoryInstance.create(configFactory));

//             let errorNames = [CSE.ErrorSettingMissing]

//             _.intersection(CSE.EVErrors.errors(caughtError),[])

//             ).to.instanceof(CSE.ErrorValidationFailed);            
//         });

//         describe("Missing Settings", () => {

//             it.only("", async () => {

//                 const configFactory = Object.assign({}, configFactoryDefault);

//                 configFactory.ConfigSettings = {
//                     type : 'databaseType'
//                 }; 

//                 let caughtError : VError = await testing.returnCaughtError(mongoDBFactoryInstance.create(configFactoryDefault));
                

//                 expect(caughtError).to.instanceof(CSE.ErrorValidationFailed);
//                 CSE.EVErrors.errors(caughtError).
//                 expect(caughtError
//             });
//         });

//     });
// /*
//     it.only("Sucessfully loads the config module, overwrite config connection string.", () =>
//     {
//         let mongoDBFactoryInstance = new MongoDBConfigFactory();

//         let configFactory : IConfigFactoryDef = {
//             FactoryClass : ConfigFactoryClass.Factory,
//             Type : ConfigFactoryTypes.Mock,
//             ConfigSettings : <ConfigOptionsTypes>
//             {
//                 type : 'mongodb',
//                 hosts : [
//                     {
//                         hostname : "mongodb.example.com",
//                         port : "27017"
//                     }
//                 ]
//             }
//         };

//         mongoDBFactoryInstance.create(configFactory);

//         let connectionString = mongoDBFactoryInstance.getConnectionString();

//         expect(connectionString).to.eq('mongodb');
//     });
//    */ 
// });

