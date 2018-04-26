For **getdbsettings**, ensure you have a section such as the following in your config.json:
```
{
  "dbConfigs": {
    "myLittleDB": {
      "type": "mongodb",
      "hosts": [
        {
          "hostname": "mongodb.example.com",
          "port": "27017"
        }
      ],
      "database": "test",
      "options": {
        "replicaSet": "myTestRs"
      }
    },
    "myEncryptedDBSettings": {
      "type": "mongodb",
      "hosts": [
        {
          "hostname": "mongo1.example.com",
          "port": "27017"
        },
        {
          "hostname": "mongo2.example.com",
          "port": "27017"
        }
      ],
      "username": "jim",
      "password": "mysecretpassword",
      "e_password": "anencryptedpassword",
      "database": "audit",
      "options": {
        "authenticationdb": "admin"
      }
    }
  }
}
```

The above example provides 2 config sets. One for "myLittleDB" and "myEncryptedDBSettings".
If a setting is immited, sensible defaults will be assumed.

Then you only need:
```
const rbPlatform = require('redblade-platform');

rbPlatform.getdbsettings('myEncryptedDBSettings').then((dbString) => {
    console.log (dbString);
	}
).catch( (error) => {
    console.log (error);
  }
);
```
---------------------
Configuration Loader
---------------------
ResolveConfig([primary] = json.url)

----

Parameters that are all required are to be grouped into a single document and parameters
that are optional, will not have to be present in that objects keys.


The example below is a full configuration file, with tag-selectors, were the strongest matching
tags configuration will be used.
It will require a validate tags method, to ensure that for each factory, their is only one
possible tag configuration outcome.
{
 "mongo":[
            {
                // their is no selector tag, so their is this default.
                "options" : {
                    "base":"example"
                },
                "extends" :
                {
                    "selector-tags" : ["dev","prod"],
                    "MockFactory" : "name of factory class",
                    "options" : {
                        // what ever you want to add here.
                        // can negate options by assigning them undefined.
                        "child":"example2"
                    }    
                }
            },
            {
                "selector-tags" : ["test"],
                "MockFactory" : "name of factory class",
                "options" : {
                    // what ever you want to add here.
                    "op3":"value3"
                }
            }
         ]
}


A select processor will take in a js object and a set of selector-tags and then produce a final
output file that is the composition of everything for that set of tags with out the selectors.
As in the example output below after processing the example above.

selector-tags = "prod"
{
    "mongo":
    {
        "MockFactory" : "name of factory class",
        options :{
            "base":"example"
            "child":"example2"
        }
    }
}

selector-tags = ""
{
    "mongo":{
        "options" : 
        {
            "base":"example"
            
        },
        "MockFactory" : "default",
    }
}

selector-tags = "test"
{
    "mongo":{
        "MockFactory" : "name of factory class",
        "options" : {
            "base":"example"
            "op3":"value3"
        }
    }            
}

The final output configuration file after the selector-tags, will be read in by require('config') module..
This is were this module is going to build from, it will be required to setup all the configuration 
for this program. The program will have a single entry point and a list of defined registered factories,
with the life cycle management, I must request a basic factory from the global factory manager,
which will then go read the configuration file and produce the output.

The global manager must have a validate configuration and describe configuration method,
that will iterate all the config factories and then agregate their output.



