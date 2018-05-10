"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const config_factory_types_1 = require("../../config-factory/config-factory-types");
const mongodb_1 = require("./mongodb");
const CSE = require("../../config-options/config-settings-errors");
const testing = require('redblade-testing');
const returnCaughtError = testing.returnCaughtError;
describe("MongoDBFactory", () => {
    let mongoDBFactoryInstance;
    before(() => {
        mongoDBFactoryInstance = new mongodb_1.MongoDBConfigFactory();
    });
    describe("Config Validation", () => __awaiter(this, void 0, void 0, function* () {
        let configFactoryDefault = {
            FactoryClass: config_factory_types_1.ConfigFactoryClass.Factory,
            Type: config_factory_types_1.ConfigFactoryTypes.Mock,
            ConfigSettings: {}
        };
        // Typically create implicity calls validation on the base class implementation.
        it("Create implicitly calls validate", () => __awaiter(this, void 0, void 0, function* () {
            chai_1.expect(yield testing.returnCaughtError(mongoDBFactoryInstance.create(configFactoryDefault))).to.instanceof(CSE.ErrorValidationFailed);
        }));
        describe("Missing Settings", () => {
            it.only("", () => __awaiter(this, void 0, void 0, function* () {
                const configFactory = Object.assign({}, configFactoryDefault);
                configFactory.ConfigSettings = {
                    type: 'databaseType'
                };
                chai_1.expect(yield testing.returnCaughtError(mongoDBFactoryInstance.create(configFactoryDefault)))
                    .to.instanceof(CSE.ErrorValidationFailed).and.to.have.property('message')
                    .contain(CSE.ErrorSettingMissing.errorDescription);
            }));
        });
    }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQThCO0FBQzlCLG9GQUFzSDtBQUN0SCx1Q0FBcUU7QUFDckUsbUVBQW1FO0FBQ25FLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzVDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDO0FBRXBELFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLEVBQUU7SUFFNUIsSUFBSSxzQkFBNkMsQ0FBQztJQUVsRCxNQUFNLENBQUMsR0FBRyxFQUFFO1FBQ1Isc0JBQXNCLEdBQUcsSUFBSSw4QkFBb0IsRUFBRSxDQUFDO0lBQ3hELENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQVMsRUFBRTtRQUVyQyxJQUFJLG9CQUFvQixHQUF1QjtZQUMzQyxZQUFZLEVBQUcseUNBQWtCLENBQUMsT0FBTztZQUN6QyxJQUFJLEVBQUUseUNBQWtCLENBQUMsSUFBSTtZQUM3QixjQUFjLEVBQXVCLEVBQUU7U0FDMUMsQ0FBQztRQUVGLGdGQUFnRjtRQUNoRixFQUFFLENBQUMsa0NBQWtDLEVBQUUsR0FBUyxFQUFFO1lBRTlDLGFBQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUMxSSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtZQUU5QixFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFTLEVBQUU7Z0JBRW5CLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLG9CQUFvQixDQUFDLENBQUM7Z0JBRTlELGFBQWEsQ0FBQyxjQUFjLEdBQUc7b0JBQzNCLElBQUksRUFBRyxjQUFjO2lCQUN4QixDQUFDO2dCQUVGLGFBQU0sQ0FBQyxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO3FCQUN2RixFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7cUJBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1A7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMEJLO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==