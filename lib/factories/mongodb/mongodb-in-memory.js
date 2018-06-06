"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
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

*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi1pbi1tZW1vcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFxREUifQ==