import {ABaseConfigFactory} from '../config-factory/abase-config-factory';
import {ConfigOptionsDef} from '../config-options/config-types';
import {IConfigFactoryDef} from '../config-factory/config-factory-types';
import {IConfigFactory} from '../config-factory/iconfig-factory';

var MongoInMemory = require('mongo-in-memory');

export const ConnectionStringConst : string = 'MongoConnectionString';

export class MongoInMemoryConfigFactory extends ABaseConfigFactory
{
    OptionsDef : ConfigOptionsDef = {
        'port' : {
         title : 'TCP/IP Port',
         description : 'TCPI/IP Port on which mongo will listern for new client connections, default: 8000',
         type : 'string',   // typically one could use json validator for this.
         optional : true
        },
        'database' : {
         title : 'Database Name',
         description : "Database Name, default 'redblade-test'",
         type : 'string',
         optional : true
        }
    };
    
    private port : number = 8000;
    private mongoServerInstance : any = null;

    create(options : IConfigFactoryDef) : Promise<IConfigFactory>
    {
        super.create(options);
        
        this.mongoServerInstance = new MongoInMemory(this.port);

        return Promise.resolve(this);
    }

    public async start () : Promise<any>
    {
        if (this.mongoServerInstance === null)
            throw new Error('Mongo failed to start or you have yet to call create.');

        super.start();

        const config = await this.mongoServerInstance.start();

        return config;
    }

    public teardown() : Promise<any>
    {
        return this.mongoServerInstance.stop();
    }
}