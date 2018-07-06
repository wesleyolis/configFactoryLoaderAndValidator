import {ConfigSchema, configSchema, IMongoSettings} from "../src/factories/mongodb";
import { CFT, JoiV, JoiX, IConfigBundle, Factories, IConfigFactoriesInstances, LoadConfig, LoadConfigErrors } from "../src/index";
import { IConfigFactory } from "../src/joi-x";
import { ABaseConfigFactory } from "../src/config-factory/abase-config-factory";
import { Factory, _NewFactory } from "../src/config-factory/config-factories";
import * as chai from 'chai'
import * as _ from 'lodash'

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

    async startAsync() : Promise<void []>
    {
        return Promise.all([this.mongodbInstance.startAsync()]);
    }

    async stopAsync() : Promise<void []>
    {
        return Promise.all([this.mongodbInstance.stopAsync()]);
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

export interface IConfigFactoryMongo extends IConfigFactory, MockConfigInterface
{

}

export interface MockConfigInterface
{
    valueA : string,
    valueB : number
}

export type FactoryAConfigSchema = JoiX.ExtractFromSchema<typeof factoryAConfigSchemaKind>;

export const factoryAName : string = "MockFactoryA";

export const factoryAConfigSchema = JoiX.object().keys({
    FactoryA : JoiX.string().required(),
    class : JoiX.LiteralString([CFT.ConfigFactoryClass.netService]).required(),
    type : JoiX.LiteralString([CFT.ConfigFactoryTypes.production]).required()
});

export const factoryAConfigSchemaKind = factoryAConfigSchema.keys({
    factory : JoiX.kind(factoryAName)
});

export class FactoryA<T extends FactoryAConfigSchema> extends ABaseConfigFactory implements MockConfigInterface, IConfigFactoryMongo
{ 
    valueA: string = "FactoryValueA";
    valueB: number = 234;
    
    readonly factoryName = factoryAName;
    readonly factoryClass: CFT.ConfigFactoryClass = CFT.ConfigFactoryClass.netService;
    readonly type: CFT.ConfigFactoryTypes = CFT.ConfigFactoryTypes.production;
    readonly configSchema  = factoryAConfigSchema;

    static NewInstance()
    {
        return new FactoryA<any>(undefined) as FactoryA<FactoryAConfigSchema>;
    }

    constructor(public configSettings : T)
    {
        super();
    }

    async createAsync(conf : FactoryAConfigSchema)
    {
        await super.createAsync(conf);
    }

    public async startAsync ()
    {
        await super.startAsync();
    }

    public async stopAsync ()
    {
        await super.stopAsync();
    }
}


export const factoryBName : string = "MockFactoryB";

export type FactoryBConfigSchema = JoiX.ExtractFromSchema<typeof factoryBConfigSchemaKind>;

export const factoryBConfigSchema = JoiX.object().keys({
    FactoryB : JoiX.string().required(),
    class : JoiX.LiteralString([CFT.ConfigFactoryClass.module]).required(),
    type : JoiX.LiteralString([CFT.ConfigFactoryTypes.mock]).required(),
})

export const factoryBConfigSchemaKind = factoryBConfigSchema.keys({
    factory : JoiX.kind(factoryBName)
});

export class FactoryB<T extends FactoryBConfigSchema> extends ABaseConfigFactory implements MockConfigInterface, IConfigFactoryMongo
{ 
    valueA: string = "FactoryValueB";
    valueB: number = 768;

    readonly factoryName = factoryBName;
    readonly factoryClass: CFT.ConfigFactoryClass = CFT.ConfigFactoryClass.module;
    readonly type: CFT.ConfigFactoryTypes = CFT.ConfigFactoryTypes.mock;
    readonly configSchema  = factoryBConfigSchema;

    static NewInstance()
    {
        return new FactoryB<any>(undefined) as FactoryB<FactoryBConfigSchema>;
    }

    constructor(public configSettings : T)
    {
        super();
    }

    async createAsync(conf : FactoryAConfigSchema)
    {
        await super.createAsync(conf);
    }

    public async startAsync ()
    {
        await super.startAsync();
    }

    public async stopAsync ()
    {
        await super.stopAsync();
    }
}


export const mockFactories : Factory<IConfigFactoryMongo> [] = [
{
    configFactoryName : factoryAName,
    configFactoryNew: FactoryA.NewInstance
},
{
    configFactoryName: factoryBName,
    configFactoryNew: FactoryB.NewInstance
}
];
    
export function NewABFactory(settings : any) : IConfigFactoryMongo {
    return _NewFactory(mockFactories, settings);
}


    
export const factoryABConfigSchema = JoiX.Factory<MockConfigInterface>(JoiX.FactoryType.issolated, NewABFactory).try([factoryAConfigSchemaKind, factoryBConfigSchemaKind]).required();

describe("Configurations loader and validator routines", () => {

    const schema = JoiX.object().keys({
        a : JoiX.string().required(),
        b : JoiX.number().required(),
        c : {
            g : JoiX.string().required(),
            h : JoiX.string().required()
        },
        p : {
            Mockfactory : factoryABConfigSchema
        }
    });

    const settings = {
        a : "abc",
        b : 555,
        c : {
            g : "def",
            h : "hij"
        },
        p : {
            Mockfactory : undefined as any
        }
    };

    const factoryA = {
        factory : "MockFactoryA",
        class : "NetworkService",
        type: "Production",
        FactoryA : "FactoryAAA"
    } as FactoryAConfigSchema

    const factoryB = {
        factory : "MockFactoryB",
        class : "Module",
        type: "Mock",
        FactoryB : "FactoryBBB"
    } as FactoryBConfigSchema


    function validateAll(instances : any)
    {
        chai.expect(instances.config).to.have.property('a').eq('abc');
        chai.expect(instances.config).to.have.property('b').equal(555);
        chai.expect(instances.config).to.have.property('c');
        chai.expect(instances.config.c).to.have.property('g').equal('def');
        chai.expect(instances.config.c).to.have.property('h').equal('hij');
        chai.expect(instances.config).to.have.property('p');
        chai.expect(instances.config.p).to.have.property('Mockfactory');
    }

    async function validateFactoryAAsync(instances : any)
    {
        chai.expect(await instances.config.p.Mockfactory).to.have.property('valueA').to.equal('FactoryValueA');
        chai.expect(await instances.config.p.Mockfactory).to.have.property('valueB').to.equal(234);
    }

    async function validateFactoryBAsync(instances : any)
    {

        chai.expect(await instances.config.p.Mockfactory).to.have.property('valueA').to.equal('FactoryValueB');
        chai.expect(await instances.config.p.Mockfactory).to.have.property('valueB').to.equal(768);
    }

    it("FactoryA - upfront", async function() {
        
        let settingsWithFactoryA = _.cloneDeep(settings);
        settingsWithFactoryA.p.Mockfactory = factoryA;

        const instances = await LoadConfig(settingsWithFactoryA, schema);

        validateAll(instances);
        await validateFactoryAAsync(instances);
    });


    it("FactoryA - lazy", async function() {
        
        let settingsWithFactoryA = _.cloneDeep(settings);
        settingsWithFactoryA.p.Mockfactory = factoryA;

        const instances = await LoadConfig(settingsWithFactoryA, schema, true);
       
        validateAll(instances);
        await validateFactoryAAsync(instances);
    });


    it("FactoryB - upfront", async function() {
        
        let settingsWithFactoryA = _.cloneDeep(settings);
        settingsWithFactoryA.p.Mockfactory = factoryB;

        const instances = await LoadConfig(settingsWithFactoryA, schema)
        
        validateAll(instances);
        await validateFactoryBAsync(instances);
    });

    it("FactoryB - lazy", async function() {
        
        let settingsWithFactoryA = _.cloneDeep(settings);
        settingsWithFactoryA.p.Mockfactory = factoryB;

        const instances = await LoadConfig(settingsWithFactoryA, schema, true);
        
        validateAll(instances);
        await validateFactoryBAsync(instances);
    });


    // describe("lazy loading, and throw error is config parameter missing", () =>
    // {
    //     it("FactoryA - all config present", async function() {
            
    //         let settingsWithFactoryA = _.cloneDeep(settings);
    //         settingsWithFactoryA.p.Mockfactory = factoryA;

    //         const instances = await LoadConfig(settingsWithFactoryA, schema, true, true);
        
    //         validateAll(instances);
    //         await validateFactoryAAsync(instances);
    //     });

    //     it("FactoryB - all config present", async function() {
            
    //         let settingsWithFactoryA = _.cloneDeep(settings);
    //         settingsWithFactoryA.p.Mockfactory = factoryB;

    //         const instances = await LoadConfig(settingsWithFactoryA, schema, true, true);
            
    //         validateAll(instances);
    //         await validateFactoryBAsync(instances);
    //     });

    //     it("FactoryA - config key 'a' mising", async function() {
            
    //         let settingsWithFactoryA = _.cloneDeep(settings) as any;
    //         settingsWithFactoryA.p.Mockfactory = factoryA;
    //         settingsWithFactoryA.a = undefined;

    //         try
    //         {
    //             const instances = await LoadConfig(settingsWithFactoryA, schema, true, true);
    //             console.log("ConfigDump" + instances.config);

    //             chai.expect(() => instances.config.a).to.throw(LoadConfigErrors.configurationMissing);
    //         }
    //         catch(e)
    //         {
    //             JSON.stringify(e);
    //         }
    //     });

    //     it("FactoryA - config key 'c' mising", async function() {
            
    //         let settingsWithFactoryA = _.cloneDeep(settings) as any;
    //         settingsWithFactoryA.p.Mockfactory = factoryA;
    //         settingsWithFactoryA.a = undefined;

    //         const instances = await LoadConfig(settingsWithFactoryA, schema, true, true);
        
    //         chai.expect(() => instances.config.c).to.throw(LoadConfigErrors.configurationMissing);
    //     });

    //     it("Factory config missing", async function() {
            
    //         let settingsWithFactoryA = _.cloneDeep(settings);
    //         settingsWithFactoryA.p.Mockfactory = null;

    //         const instances = await LoadConfig(settingsWithFactoryA, schema, true, true);

    //         chai.expect(() => instances.config.a).to.throw(LoadConfigErrors.configurationMissing);
    //     });
    // });
});

