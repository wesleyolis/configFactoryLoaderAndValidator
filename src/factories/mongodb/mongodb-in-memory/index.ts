import {ABaseConfigFactory} from '../../../config-factory/abase-config-factory';
import {IConfigFactoryDef, ConfigFactoryClass, ConfigFactoryTypes} from '../../../config-factory/config-factory-types';
import {IConfigFactory} from '../../../config-factory/iconfig-factory';
import {IMongoSettings} from '.././amongodb-config-factory'
import * as CS from './configSchema';
import {VError} from 'verror';

var MongoInMemory = require('mongo-in-memory');

export class MongoInMemoryConfigFactory extends ABaseConfigFactory implements IMongoSettings
{   
    configFactoryName : string = "MongoInMemory";
    factoryClass : ConfigFactoryClass = ConfigFactoryClass.Factory
    type : ConfigFactoryTypes = ConfigFactoryTypes.Mock
    configSchema : typeof CS.configSchema = CS.configSchema;
    readonly configSettings? : CS.ConfigSchema;

    private mongoServerInstance : any = null;

    async createAsync(options : IConfigFactoryDef)
    {
        await super.createAsync(options);
        
        this.mongoServerInstance = new MongoInMemory(this.ConfigSettings);
    }

    public async startAsync ()
    {
        if (this.mongoServerInstance === null)
            throw new VError('Mongo failed to start or you have yet to call create.');

       await super.startAsync();

        const config = await this.mongoServerInstance.start();

        return config;
    }

    public stopAsync()
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

*/