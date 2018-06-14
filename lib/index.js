"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configFactories = require("./config-factory");
exports.ConfigFactories = configFactories;
const CFT = require("./config-factory/config-factory-types");
exports.CFT = CFT;
const factories = require("./factories");
exports.Factories = factories;
const Joi = require("Joi");
exports.Joi = Joi;
const JoiX = require("./joi-x");
exports.JoiX = JoiX;
const JoiV = require("./joi-x-validators");
exports.JoiV = JoiV;
var config_1 = require("./config-factory/config");
exports.describeConfigSchema = config_1.describe;
exports.validatConfigSchemaAsync = config_1.validateAsync;
/*
export abstract class IConfigBundle
{
    static async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined = undefined) : Promise<any>
    {
        if (settings == undefined)
        {
            await validatConfigSchemaAsync(require('config'), configSchema);
            settings = require('config');
        }
        return settings;
    }

    // Typically were you would inject any configuraiton for other modules.
    // For instance resolving encrypted passwords for mutiple factories async.
    abstract async newBundleAndResolveConfigAsync (settings: JoiX.XJSchemaMap | undefined) : Promise<IConfigFactoryInstance>
}

export interface IConfigFactoryInstance
{
    startAsync() : Promise<void>;
    stopAsync() : Promise<void>;
}


export class ConfigBundle implements IConfigBundle
{
    async newBundleAndResolveConfigAsync(settings : JoiX.XJSchemaMap | undefined = undefined) : Promise<ConfigFactoryInstance>
    {
        let rawConfig = await IConfigBundle.newBundleAndResolveConfigAsync(settings);

        const config = settings as ConfigSchema;

        const mongodbInstance = Factories.MongoDB.NewFactory(config.mongodb);

        await mongodbInstance.createFactoryAsync(config.mongodb);

        const mongoConnectionStr : string = mongodbInstance.getConnectionString();

        rawConfig['mongoConnectionString'] = mongoConnectionStr;

        return new ConfigFactoryInstance(config, mongodbInstance);
    }
}

export class ConfigFactoryInstance implements IConfigFactoryInstance
{
    constructor(private config : ConfigSchema, private mongodbInstance : IMongoSettings){

    }

    async startAsync() : Promise<void>
    {
        await this.mongodbInstance.startAsync();
    }

    async stopAsync() : Promise<void>
    {
        await this.mongodbInstance.stopAsync();
    }
}
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxvREFBbUQ7QUFDeEIsMENBQWU7QUFFMUMsNkRBQTREO0FBQzdDLGtCQUFHO0FBR2xCLHlDQUF3QztBQUNuQiw4QkFBUztBQUU5QiwyQkFBMEI7QUFDWCxrQkFBRztBQUVsQixnQ0FBK0I7QUFDZixvQkFBSTtBQUVwQiwyQ0FBMEM7QUFFMUIsb0JBQUk7QUFFcEIsa0RBQW1IO0FBQTNHLHdDQUFBLFFBQVEsQ0FBd0I7QUFBRSw0Q0FBQSxhQUFhLENBQTRCO0FBRW5GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBNkRFIn0=