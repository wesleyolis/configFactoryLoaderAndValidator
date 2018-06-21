import {} from 'redblade-types'
const rbLog = global.rbLog;

import * as JoiX from '../../../joi-x'
import { promisify } from 'bluebird'

import * as CS from './config-schema'
import { ConfigFactoryClass, ConfigFactoryTypes } from '../../../config-factory/config-factory-types'
import { SftpClient } from '../client/index'

import * as Ssh2 from 'ssh2';
import { Connection, ClientInfo, ServerConfig } from 'ssh2';
export {Ssh2}



export class SftpInMemoryClientWrapper<T extends CS.ConfigSchema> extends SftpClient<T>
{
    factoryName: string = CS.factoryName;
    factoryClass: ConfigFactoryClass = ConfigFactoryClass.netService;
    type: ConfigFactoryTypes = ConfigFactoryTypes.production;
    configSchema = CS.configSchema;

    private server? : Ssh2.Server = undefined;

    static NewInstance()
    {
        return new SftpClient<any>(undefined) as SftpClient<CS.ConfigSchema>; 
    }

    constructor(public configSettings : T)
    {
        super(configSettings);
    }

    async createAsync(config : JoiX.XJSchemaMap) : Promise<void>
    {
        await super.createAsync(config);
    }
    
    public async startAsync()
    {
        await super.startAsync();
        /*

        this.configSettings.credentials.

        // The base class already handles this and check that createAsync has been called.
        const sftpSettings : ServerConfig = {
            ident : CS.factoryName,
            algorithms = {
                kex?: string[];
                cipher?: string[];
                serverHostKey?: string[];
                hmac?: string[];
                compress?: string[];
            } as Algorithms,
            debug : rbLog.info
        };
        */
        //static createServer(config: ServerConfig, connectionListener?: (client: Connection, info: ClientInfo) => void): Server;

        // this.server = Ssh2.Server.createServer(sftpSettings, this.ServerConnectionListern);
    
        // const listernAsync = promisify(this.server.listen).bind(this.server);

        // await listernAsync(this.configSettings.port, this.configSettings.host);

        // rbLog.info({InMemsftp : {
        //     status: 'listerning', 
        //     address: this.server.address().address,
        //     port: this.server.address().port
        //     }
        // }, `Listerning on host: [${this.server.address().address}], port : [${this.server.address().port}]`);
    }

    public async stopAsync()
    {
        await super.stopAsync();
    }

    private ServerConnectionListern(client: Connection, info: ClientInfo) : void
    {

    }
}