import {ABaseConfigFactory} from '../../config-factory/abase-config-factory';
import {IConfigFactoryDef} from '../../config-factory/config-factory-types';
import {IConfigFactory} from '../../config-factory/iconfig-factory';
import {IMongoSettings} from './amongodb-config-factory'

var MongoInMemory = require('mongo-in-memory');

export const ConnectionStringConst : string = 'MongoConnectionString';

export type ConfigSettingsTypes = {};

export class MongoInMemoryConfigFactory extends ABaseConfigFactory implements IMongoSettings
{   
    ConfigOptionsTypes : ConfigSettingsTypes = {};
    private port : number = 8000;
    private mongoServerInstance : any = null;

    create(options : IConfigFactoryDef)
    {
        super.create(options);
        
        this.mongoServerInstance = new MongoInMemory(this.port);
    }

    public async start ()
    {
        if (this.mongoServerInstance === null)
            throw new Error('Mongo failed to start or you have yet to call create.');

        super.start();

        const config = await this.mongoServerInstance.start();

        return config;
    }

    public stop()
    {
        return this.mongoServerInstance.stop();
    }

    describe() : string
    {
        return "";
    }

    validate() : Error []
    {
        return [];
    }

    getConnectionString() : string
    {
        return "";
    }
}