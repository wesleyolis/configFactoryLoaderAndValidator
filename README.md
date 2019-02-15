# configFactoryLoaderAndValidator

This is a simple libary that allows you to define your configuration schema.
the configuration support factories, which will allow you to build
you own variants, which can then be swapped out at load time depending on the configuration found.

Also supports a loader and everything else.

Has a test suit as well.

## Test results showing factory loading

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
