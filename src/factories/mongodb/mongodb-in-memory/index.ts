import {ABaseConfigFactory, ErrorFactory} from '../../../config-factory/abase-config-factory';
import {ConfigFactoryClass, ConfigFactoryTypes} from '../../../config-factory/config-factory-types';
import {IConfigFactory} from '../../../config-factory/iconfig-factory';
import {IMongoSettings} from '.././amongodb-config-factory'
import {VError} from 'verror';
import {promisify} from 'bluebird';

import * as CS from './configSchema';
import * as Joi from 'joi';
import * as JoiX from '../../../joi-x'
import * as JoiV from '../../../joi-x-validators'

export {CS as CS}

class MongoInMemoryErrors
{
    static FailedToStart = "FailedToStart";
}

export class MongoInMemoryConfigFactory<T extends CS.ConfigSchema> extends ABaseConfigFactory implements IMongoSettings
{   
    readonly factoryName : string = CS.factoryName;
    readonly factoryClass : ConfigFactoryClass = ConfigFactoryClass.service
    readonly type : ConfigFactoryTypes = ConfigFactoryTypes.mock
    readonly configSchema : typeof CS.configSchema = CS.configSchema;
    private connectionHost? : string;
    private connectionPort? : number;

    private mongoServerInstance : any = null;

    static NewInstance()
    {
        return new MongoInMemoryConfigFactory<any>(undefined) as MongoInMemoryConfigFactory<CS.ConfigSchema>;
    }

    constructor(readonly configSettings : T)
    {
        super();
    }

    public async createAsync(conf : CS.ConfigSchema) : Promise<void>
    {
        await super.createAsync(conf);

        const MongoInMemory = require('mongo-in-memory');
        
        this.mongoServerInstance = new MongoInMemory(this.configSettings.port);
        
        this.connectionHost = this.mongoServerInstance.host;
        this.connectionPort = this.mongoServerInstance.port;
    }

    public async startAsync() : Promise<void>
    {
        if (this.mongoServerInstance === null)
            throw new VError({name:MongoInMemoryErrors.FailedToStart}, 'Mongo failed to start or you have yet to call create.');

        await super.startAsync();

        await promisify(this.mongoServerInstance.start).bind(this.mongoServerInstance)();
    }

    public async stopAsync() : Promise<void>
    {
        await promisify(this.mongoServerInstance.stop).bind(this.mongoServerInstance)();
    }

    getConnectionString() : string
    {
        if (this._created)
            return "mongodb://" + this.connectionHost + ":" + this.connectionPort;
        else 
            throw ErrorFactory.NotCreated;
    }
}