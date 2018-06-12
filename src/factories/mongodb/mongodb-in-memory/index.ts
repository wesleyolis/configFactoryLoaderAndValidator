import {ABaseConfigFactory} from '../../../config-factory/abase-config-factory';
import {ConfigFactoryClass, ConfigFactoryTypes} from '../../../config-factory/config-factory-types';
import {IConfigFactory} from '../../../config-factory/iconfig-factory';
import {IMongoSettings} from '.././amongodb-config-factory'
import {VError} from 'verror';

import * as CS from './configSchema';
import * as Joi from 'joi';
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'

var MongoInMemory = require('mongo-in-memory');

export class MongoInMemoryConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings
{   
    readonly factoryName : string = "InMemory";
    readonly factoryClass : ConfigFactoryClass = ConfigFactoryClass.service
    readonly type : ConfigFactoryTypes = ConfigFactoryTypes.mock
    readonly configSchema : typeof CS.configSchema = CS.configSchema;

    private mongoServerInstance : any = null;

    static NewInstance()
    {
        return new MongoInMemoryConfigFactory<any>(undefined) as MongoInMemoryConfigFactory<CS.ConfigSchema>;
    }

    constructor(readonly configSettings : T)
    {
        super();
    }

    public async createAsync(conf : CS.ConfigSchema)
    {
        await super.createAsync(conf);
        
        this.mongoServerInstance = new MongoInMemory(this.configSettings.port);
    }

    public async startAsync()
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

