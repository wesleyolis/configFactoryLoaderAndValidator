import {ABaseConfigFactory} from '../../config-factory/abase-config-factory';
import {ConfigOptionsDef} from '../../config-options/config-types';
import {IConfigFactoryDef} from '../../config-factory/config-factory-types';
import * as IConfigFactory from '../../config-factory/iconfig-factory';
import {MongoSettings} from './amongodb-config-factory'

const cache: Record<string, string> = {};

export class MongoDBConfigFactory extends ABaseConfigFactory implements MongoSettings
{
    OptionsDef : ConfigOptionsDef = {
        'type' : {
         title : 'Database Type',
         description : "Database type, legacy support configuration only uses 'mongodb'",
         type : 'string',   // typically one could use json validator for this.
         optional : false
        },
        'hosts': {
          title : "EndPoint Hosts",
          description : "Description",
          type:"array",
          optional : false,
          child : {
            'hostname' : {
            title : "HostName",
            description : "Endpoint hostname",
            type : 'string',
            optional : false
            },
            'port' : {
              title : "Port",
              description : "Endpoint port",
              type : 'number',
              optional : false
            }
          }
        },
        'username' : {
          title : "UserName",
          description : "The username",
          type : "string",
          optional : false
        },
        'password' : {
          title : "Password:",
          description : "The Password",
          type : "string",
          optional : false
        },
        'e_password' : {
          title : "Enctypted Password",
          description : "Enctyped Password",
          type : "string",
          optional : false
        },
        'database' : {
          title : "Database",
          description : "Database to connect to on the hosted endpoint",
          type : "string",
          optional : false
        },
        'options' : {
          title : "Options",
          description : "Options",
          type : "string",
          optional : false,
          child : {
            'authenticationdb' :  {
              title : "Authentication",
              
          }
        }
    };

    async create(conf : IConfigFactoryDef) : Promise<IConfigFactory>
    {
      super.create(conf);

      let settings = conf.Options;

      if (settings.type && settings.type === 'mongodb' ) {
       
        await this.makeMongoDBConnString(settings);

        return Promise.resolve(this);
      }
      else
      {
        throw new Error('Unsupported Type in db setting config.');
      }
    }

    getConnectionString() : string
    {
      return ""
    }

    public start () : Promise<any>
    {
      return Promise.resolve();
    }

    public stop () : Promise<any>
    {
      return Promise.resolve();
    }

    private async makeMongoDBConnString(settings: any ): Promise<string> {
      let connString = 'mongodb://';
      let password = '';
    
      if (settings.username && (settings.password || settings.e_password)) {
        if (settings.e_password && cache[settings.e_password]) {
          password = cache[settings.e_password];
        } else if (settings.e_password && !cache[settings.e_password]) {
    
          const buf = new Buffer(settings.e_password, 'base64');
          let data: NodeBuffer;
    
          try {
            data = await exports.decrypt(buf);
          } catch (err) {
            throw new Error('Unable to decrypt password. Check encrypted string in config.' + err);
          }
          password = data.toString('utf-8');
          cache['settings.e_password'] = password;
    
        } else {
    
          password = settings.password;
    
        }
    
        connString = connString + encodeURI(settings.username) + ':' + encodeURI(password) + '@';
      }
    
      settings.hosts.forEach(function(host: Record<string, string>) {
        connString = connString + host.hostname;
    
        if (host.port) {
          connString = connString + ':' + host.port;
        } else {
          connString = connString + ':27017';
        }
    
        connString = connString + ',';
      });
    
      connString = connString.replace(/,+$/, '');
    
      connString = connString + '/' + settings.database;
    
      if (settings.options) {
        connString = connString + '?';
    
        Object.keys(settings.options).forEach(
          function(key) {
            connString = connString + key + '=' + encodeURI(settings.options[key]);
          }
        );
      }
    
      return connString;
    }
}

