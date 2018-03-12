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
