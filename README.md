```
{
	"mongo_master" :
	{
		"type" : "mongodb",
		"host" : "mongodb.example.com",
		"database": "mydb"
	},
	"mongo_audit" : 
	{
		"type" : "mongodb",
		"host" : "mongodb.example.com",
		"port" : "37017",
		"username": "jim",
		"password": 'sup3r$/\|cretp@ssw0rd!',
		"e_password": "anencryptedpassword",
		"database": "audit",
		"options": {
			"authenticationdb" : "admin"
		}
	}
}

console.log(getdbsettings('mongo_audit'));

```