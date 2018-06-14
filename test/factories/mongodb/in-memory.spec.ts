import * as chai from 'chai';
import * as JoiX from '../../../src/joi-x'
import {MongoInMemoryConfigFactory, CS} from '../../../src/factories/mongodb/mongodb-in-memory'

describe("Factory Loading Testing", function () {

    describe("InMemory", function() {

        it("CreateAsync,start, stop and can get connection String.", async function() {
    
            const settings : JoiX.XJSchemaMap = {
                class : "service",
                type : "mock",
                port : 34
            } 

            const dbInstance = MongoInMemoryConfigFactory.NewInstance();
            await dbInstance.createAsync(settings as CS.ConfigSchema);

            chai.expect(dbInstance.getConnectionString()).eql("mongodb://127.0.0.1:34");
            chai.expect(() => dbInstance.startAsync()).not.to.throw();
            chai.expect(() => dbInstance.stopAsync()).not.to.throw();
        });
    });
});