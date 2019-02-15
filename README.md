# configFactoryLoaderAndValidator

This is a simple libary that allows you to define your configuration schema.
the configuration support factories, which will allow you to build
you own variants, which can then be swapped out at load time depending on the configuration found.

Also supports a loader and everything else.

Has a test suit as well.

## Test results showing factory loading
```
Factory Loading Testing
    InMemory
      ✓ CreateAsync,start, stop and can get connection String. (466ms)

  Factories
    Joi sucessfully validates varius schema
      ✓ InMemory
      ✓ mongoDB
      identifies the correct factory and schema
        ✓ InMemory
        ✓ mongoDB
    InMemory
Connected
      ✓ Connect to InMemory (117ms)

  MongoDBFactory:

    MongoDB
      ✓ CreateAsync, start, stop and can get connection String.
      getConnectionString:

        ✓ hosts missing
        ✓ all, with host & credentials & database & options
        ✓ with host
        ✓ with host & credentials
        ✓ with host & credentials & database

  Factories - Sftp
    ✓ Launch and connect to sftp server (58ms)

  Mongo Network Factory ConfigLoad and Inject

    ✓ ensure always overwrite values in config, backwards compatability.
    ✓ Resolves Configuration, returning ConfigBundleInstance, using passed in settings
    ✓ Resolves Configuration, returning ConfigBundleInstance, using a mock config load

  Configurations loader and validator routines
    ✓ FactoryA - upfront
    ✓ FactoryA - lazy
    ✓ FactoryB - upfront
    ✓ FactoryB - lazy
    lazy loading, and throw error is config parameter missing
      ✓ FactoryA - all config present
      ✓ FactoryB - all config present
      ✓ FactoryA - config key 'a' mising
      ✓ FactoryA - config key 'c' mising
      ✓ Factory config missing

  JoiX binds with Joi
    ✓ GetXObjectChildren
    ✓ OperateOnXObjectKeys

  Joi Behaviours
    ✓ ObjectKeyObject - impossible
    ✓ ObjectArrayObject - required, optional contraints.
    ✓ ObjectArrayJSON - required, optional contraints.
    ✓ ObjectArrayMutiple - required, optional contraints.
    ✓ ObjectAlternative 

  Generic Promisification
    funtion only
      With Results
        ✓ No Paramss
        ✓ WithPrams
        ✓ WithPramsH
      With Error
        ✓ No Params
        ✓ WithPrams
        ✓ WithPramsH
    Object with function
      ✓ No Paramss
      ✓ WithPrams
      ✓ WithPramsH

  Promisification with return
    funtion only
      want execute result
        ✓ No Params
        ✓ WithPrams
        ✓ WithPramsH
      don't care about execute result
        ✓ No Params
        ✓ WithPrams
        ✓ WithPramsH
      with error
        ✓ No Params
        ✓ WithPrams
        ✓ WithPramsH
      Object with function
        want execute result
          ✓ No Params
          ✓ WithPrams
          ✓ WithPramsH
        don't care about execute result
          ✓ No Params
          ✓ WithPrams
          ✓ WithPramsH
        with error
          ✓ No Params
          ✓ WithPrams
          ✓ WithPramsH


  58 passing (1s)
  ```
  
  ## Test coverage
  
  ```
-----------------------------------------|----------|----------|----------|----------|-------------------|
File                                     |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------------------------------|----------|----------|----------|----------|-------------------|
All files                                |    77.77 |    53.42 |    72.01 |    79.27 |                   |
 lib                                     |        0 |        0 |        0 |        0 |                   |
  joi-x-prev-21.js                       |        0 |        0 |        0 |        0 |... 5,48,50,77,107 |
 lib/config-factory                      |        0 |      100 |      100 |        0 |                   |
  iconfig-factory.js                     |        0 |      100 |      100 |        0 |                 2 |
  index.js                               |        0 |      100 |      100 |        0 |2,3,4,5,6,7,8,9,10 |
 lib/config-legacy-gen                   |        0 |      100 |        0 |        0 |                   |
  iconfig-legacy.js                      |        0 |      100 |        0 |        0 |           2,3,5,7 |
 lib/factories/mongodb                   |        0 |      100 |      100 |        0 |                   |
  amongodb-config-factory.js             |        0 |      100 |      100 |        0 |                 2 |
 lib/factories/mongodb/mongodb           |        0 |      100 |        0 |        0 |                   |
  with-legacy-config.js                  |        0 |      100 |        0 |        0 |... ,8,11,12,13,17 |
 lib/factories/mongodb/mongodb-in-memory |        0 |      100 |        0 |        0 |                   |
  with-legacy-config.js                  |        0 |      100 |        0 |        0 |... ,8,11,12,13,17 |
 lib/factories/sftp                      |        0 |      100 |      100 |        0 |                   |
  isftp-config-factory.js                |        0 |      100 |      100 |        0 |             2,3,4 |
 src                                     |    81.88 |    72.97 |    66.23 |    83.77 |                   |
  index.ts                               |    78.57 |    69.57 |    66.67 |    79.03 |... 28,336,337,339 |
  joi-x-validators.ts                    |    88.89 |      100 |    64.29 |    88.89 |   78,83,88,93,116 |
  joi-x.ts                               |    83.19 |    70.91 |    66.67 |     87.5 |... 94,396,401,403 |
 src/config                              |    69.57 |        0 |        0 |    69.57 |                   |
  global.ts                              |      100 |      100 |      100 |      100 |                   |
  hyphen-banking.ts                      |      100 |      100 |      100 |      100 |                   |
  index.ts                               |    41.67 |        0 |        0 |    41.67 |... 19,22,27,28,30 |
 src/config-factory                      |    85.45 |    71.43 |    78.57 |    85.19 |                   |
  abase-config-factory-schema.ts         |      100 |      100 |      100 |      100 |                   |
  abase-config-factory.ts                |    90.91 |    66.67 |      100 |    90.91 |             45,54 |
  config-factories.ts                    |     87.5 |       50 |      100 |    85.71 |                24 |
  config-factory-types.ts                |      100 |      100 |      100 |      100 |                   |
  config.ts                              |    61.54 |       50 |       25 |    61.54 |    14,17,22,31,36 |
 src/config-legacy-gen                   |     7.69 |        0 |        0 |     8.33 |                   |
  inject-legacy-config.ts                |     7.69 |        0 |        0 |     8.33 |... 14,15,19,21,23 |
 src/factories                           |      100 |      100 |      100 |      100 |                   |
  index.ts                               |      100 |      100 |      100 |      100 |                   |
 src/factories/mongodb                   |      100 |      100 |      100 |      100 |                   |
  index.ts                               |      100 |      100 |      100 |      100 |                   |
 src/factories/mongodb/mongodb           |    89.74 |    72.73 |      100 |    89.74 |                   |
  configSchema.ts                        |      100 |      100 |      100 |      100 |                   |
  index.ts                               |    88.24 |    72.73 |      100 |    88.24 |... 16,118,119,135 |
 src/factories/mongodb/mongodb-in-memory |    94.44 |       50 |      100 |    94.44 |                   |
  configSchema.ts                        |      100 |      100 |      100 |      100 |                   |
  index.ts                               |     93.1 |       50 |      100 |     93.1 |             56,73 |
 src/factories/sftp                      |    94.44 |      100 |       50 |    94.44 |                   |
  index.ts                               |    94.44 |      100 |       50 |    94.44 |                51 |
 src/factories/sftp/client               |       75 |    64.29 |    55.56 |       75 |                   |
  config-schema.ts                       |      100 |      100 |      100 |      100 |                   |
  index.ts                               |    94.12 |    64.29 |    83.33 |    94.12 |                22 |
  with-legacy-config.ts                  |    33.33 |      100 |        0 |    33.33 |... 27,29,32,33,34 |
 src/factories/sftp/client-in-mem-server |    33.14 |    13.33 |    34.62 |    33.33 |                   |
  config-schema.ts                       |      100 |      100 |      100 |      100 |                   |
  index.ts                               |    30.07 |    13.33 |    30.43 |    30.26 |... 93,395,399,405 |
  with-legacy-config.ts                  |    53.85 |      100 |    66.67 |    53.85 | 27,29,32,33,34,35 |
 src/util                                |    92.31 |    90.91 |      100 |    92.31 |                   |
  bluebird-promisify.ts                  |    92.31 |    90.91 |      100 |    92.31 |        93,213,228 |
 test                                    |    93.55 |    66.67 |    90.38 |    93.84 |                   |
  index.spec.ts                          |    95.89 |      100 |    86.49 |    96.48 | 75,80,170,221,410 |
  joi-x.spec.ts                          |    88.73 |       50 |      100 |    88.41 |... 46,147,171,172 |
 test/factories/mongodb                  |    99.03 |      100 |    96.43 |    98.99 |                   |
  in-memory.spec.ts                      |      100 |      100 |      100 |      100 |                   |
  index.spec.ts                          |    97.92 |      100 |    90.91 |    97.92 |               101 |
  mongdb.spec.ts                         |      100 |      100 |      100 |      100 |                   |
 test/factories/sftp                     |    77.14 |       50 |    45.45 |    89.66 |                   |
  index.spec.ts                          |    77.14 |       50 |    45.45 |    89.66 |          89,90,91 |
 test/util                               |    99.63 |    91.67 |      100 |    99.62 |                   |
  bluebird-promisify.spec.ts             |    99.63 |    91.67 |      100 |    99.62 |                78 |
-----------------------------------------|----------|----------|----------|----------|-------------------|

```
