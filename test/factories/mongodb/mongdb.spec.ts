import * as chai from 'chai';
import {JoiX, JoiV, CFT} from '../../../src/index';
import {MongoDBConfigFactory, CS} from '../../../src/factories/mongodb/mongodb'
import {ConfigSchema} from '../../../src/factories/mongodb/mongodb/configSchema'

describe("Factory Loading Testing", function () {

    describe("MongoDB", function() {

        it.only("CreateAsync, start, stop and can get connection String.", async function() {

            const settings = {
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

            const dbInstance = MongoDBConfigFactory.NewInstance();
            await dbInstance.createAsync(settings as ConfigSchema);

            chai.expect(dbInstance.getConnectionString()).eql("mongodb://127.0.0.1:34");
            chai.expect(() => dbInstance.startAsync()).not.to.throw();
            chai.expect(() => dbInstance.stopAsync()).not.to.throw();
        });
    });
});