import * as chai from 'chai';
import * as JoiX from '../../../lib/joi-x';
import * as JoiV from '../../../lib/joi-x-validators'
import {ConfigSchema, configSchema, NewFactoryWithLegacy} from '../../../lib/factories/sftp/index'
import * as CFT from '../../../lib/config-factory/config-factory-types'
import * as Ssh2 from 'ssh2';
import * as redbladeTypes from 'redblade-types'

global.rbLog = {} as any;
// global.rbLog.debug = console.debug as any;
// global.rbLog.error = console.error as any;
// global.rbLog.fatal = console.error as any;
// global.rbLog.info = console.info as any;
// global.rbLog.trace = console.debug as any;
// global.rbLog.warn = console.warn as any;

global.rbLog.debug = () => undefined as any;
global.rbLog.error = () => undefined as any;
global.rbLog.fatal = () => undefined as any;
global.rbLog.info = () => undefined as any;
global.rbLog.trace = () => undefined as any;
global.rbLog.warn = () => undefined as any;

describe("Factories - Sftp", function()
{
    it("Launch and connect to sftp server", async function() {

        const settings = {
            factory : "InMemoryClientWrapper",
            class : CFT.ConfigFactoryClass.service,
            type : CFT.ConfigFactoryTypes.mock,
            credentials : {
                username : "TestUserName",
                auth : {
                    type : JoiV.AuthType.password,
                    password : "UserPassword"
                }
            },
            host : "localhost",
            port : 4000
        } as ConfigSchema;

        const factoryInstance = NewFactoryWithLegacy(settings);

        await factoryInstance.createFactoryAsync(settings);

        await factoryInstance.startAsync();

        const sftpLegacyConfig = factoryInstance.getLegacyConfig();


        let waitResolve : () => any;
        let waitReject : () => any;

        const client = new Ssh2.Client();

        client.on('ready', async function () {

            await factoryInstance.stopAsync();
            waitResolve();
            
        }).on('error', async function( err : Error)
        {
            await factoryInstance.stopAsync();
            chai.expect(err).to.eq(undefined);
            waitReject();
        }).connect({
            host: sftpLegacyConfig.host,
            port: sftpLegacyConfig.port,
            username: sftpLegacyConfig.username,
            password: sftpLegacyConfig.password ? sftpLegacyConfig.password : "",
            readyTimeout : 30000
        });

        await new Promise(function(resolve, reject) {

            waitResolve = resolve;
            waitReject = reject;
        });
    }).timeout(150)
});
