import { MongoDB, ConnectionStringConst } from '../factories/mongodb';
import { expect } from 'chai';
import { IConfigFactory } from '../config-factory/iconfig-factory';
import { IConfigFactoryDef, ConfigFactoryClass, ConfigFactoryTypes } from '../config-factory/config-factory-types'


describe("MongoDBFactory", () => {

    it("Sucessfully loads the config module, overwrite config connection string.", () =>
    {
        let mongoDBFactoryInstance = new MongoDB();

        let configFactory : IConfigFactoryDef = {
            FactoryClass : ConfigFactoryClass.Factory,
            Type : ConfigFactoryTypes.Mock,
            Options : {
                'mongoconnection' : 'testConnectionString'
            }
        };

        mongoDBFactoryInstance.create(configFactory);

        let config = require('config');
        expect(config).to.have.property(ConnectionStringConst);
        expect(config).property(ConnectionStringConst).to.eql('testConnectionString');


    });
});