"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache = {};
/*
export class MongoDBConfigFactory extends ABaseConfigFactory implements IMongoSettings
{
    readonly configSchema = CS.configSchema;
    readonly ConfigFactoryName = 'MongoDB';

    async createAsync(conf : IConfigFactoryDef) : Promise<void>
    {
      await super.createAsync(conf); // This is genraic abstract procedure.

      let settings = conf.ConfigSettings;

      if (settings.type && settings.type === 'mongodb' ) {
       
        await this.makeMongoDBConnString(settings);

        return Promise.resolve();
      }
      else
      {
        throw new Error('Unsupported Type in db setting config.');
      }
    }

    public async startAsync () : Promise<any>
    {
      return Promise.resolve();
    }

    public stopAsync () : Promise<any>
    {
      return Promise.resolve();
    }

   
    getConnectionString() : string
    {
      return ""
    }

    private async makeMongoDBConnString(settings: any ): Promise<string> {
      let connString = 'mongodb://';
      let password = '';
    
      if (settings.username && (settings.password || settings.e_password)) {
        if (settings.e_password && cache[settings.e_password]) {
          password = cache[settings.e_password];
        } else if (settings.e_password && !cache[settings.e_password]) {
    
          const buf = new Buffer(settings.e_password, 'base64');
          let data: Buffer;
    
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
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLE1BQU0sS0FBSyxHQUEyQixFQUFFLENBQUM7QUFDekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0dFIn0=