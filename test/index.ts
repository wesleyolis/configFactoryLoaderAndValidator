import {ConfigSchema, configSchema, IMongoSettings} from "../src/factories/mongodb";
import { CFT, JoiV, JoiX, IConfigBundle, Factories, IConfigFactoriesInstances } from "../src/index";

const mongoDBSettings : ConfigSchema = {
    factory : 'Network',     
    class : CFT.ConfigFactoryClass.netService,
    type : CFT.ConfigFactoryTypes.production,
    provider : "mongodb",
    credentials : {
        username : 'myusername',
        password : {
            phrase : 'mypassword',
            type : JoiV.PassType.plainText
        }
    },
    database : 'database',
    hosts : [{hostname:'myhostname', port : 3465}, {hostname:'myhostname2', port : 3467}],
    options : {
        op1 : 'opVal1',
        op2 : 'opVal2'
    }
};

const staticConfig : FactoryConfigSchema = {
    a:'a',
    mongodb:  mongoDBSettings,
    b: 'b'
}

export type FactoryConfigSchema = JoiX.ExtractFromSchema<typeof factoryConfigSchema>;

export const factoryConfigSchema = JoiX.object().keys({
    a: JoiX.string().required(),
    mongodb : configSchema,
    b: JoiX.string().required()
});

export class ConfigBundle implements IConfigBundle
{
    async newBundleAndResolveConfigAsync(settings : JoiX.XJSchemaMap | undefined = undefined) : Promise<ConfigFactoryInstance>
    {
        const requireConfig = function (file : string) {
            return staticConfig;
        }

        let rawConfig = await IConfigBundle.newBundleAndResolveConfigAsync(settings, factoryConfigSchema, requireConfig);

        const config = JSON.parse(JSON.stringify(rawConfig)) as FactoryConfigSchema;

        const mongodbInstance = Factories.MongoDB.NewFactory(config.mongodb);

        await mongodbInstance.createFactoryAsync(config.mongodb);

        const mongoConnectionStr : string = mongodbInstance.getConnectionString();

        rawConfig['mongoConnectionString'] = mongoConnectionStr;

        return new ConfigFactoryInstance(config, mongodbInstance);
    }
}

export class ConfigFactoryInstance implements IConfigFactoriesInstances
{
    constructor(private config : FactoryConfigSchema, private mongodbInstance : IMongoSettings){

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

describe("Mongo Network Factory ConfigLoad and Inject\n", function()
{
    it("ensure always overwrite values in config, backwards compatability.", function() {
        let config = require('config');
        chai.expect(delete config.deletableKey).eq(true);

        chai.expect(config).not.have.property('deletableKey');
        chai.expect(config).to.have.property('a');
        chai.expect(config).to.have.property('b');
    });

    it("Resolves Configuration, returning ConfigBundleInstance, using passed in settings", async function () {

        const factoryInstances = await new ConfigBundle().newBundleAndResolveConfigAsync(staticConfig);

        chai.expect((<any>staticConfig)['mongoConnectionString'])
        .eql("mongodb://myusername:mypassword@myhostname:3465,myhostname2:3465/database?op1=opVal1&op2=opVal2");
    });

    it("Resolves Configuration, returning ConfigBundleInstance, using a mock config load", async function () {

        const factoryInstances = await new ConfigBundle().newBundleAndResolveConfigAsync();

        chai.expect((<any>staticConfig)['mongoConnectionString'])
        .eql("mongodb://myusername:mypassword@myhostname:3465,myhostname2:3465/database?op1=opVal1&op2=opVal2"); 
    });
    
});
