"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const abase_config_factory_1 = require("../../../config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const verror_1 = require("verror");
const bluebird_1 = require("bluebird");
const CS = require("./configSchema");
exports.CS = CS;
class MongoInMemoryErrors {
}
MongoInMemoryErrors.FailedToStart = "FailedToStart";
class MongoInMemoryConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    constructor(configSettings) {
        super();
        this.configSettings = configSettings;
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.service;
        this.type = config_factory_types_1.ConfigFactoryTypes.mock;
        this.configSchema = CS.configSchema;
        this.mongoServerInstance = null;
    }
    static NewInstance() {
        return new MongoInMemoryConfigFactory(undefined);
    }
    createAsync(conf) {
        const _super = Object.create(null, {
            createAsync: { get: () => super.createAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.createAsync.call(this, conf);
            const MongoInMemory = require('mongo-in-memory');
            this.mongoServerInstance = new MongoInMemory(this.configSettings.port);
            this.connectionHost = this.mongoServerInstance.host;
            this.connectionPort = this.mongoServerInstance.port;
        });
    }
    startAsync() {
        const _super = Object.create(null, {
            startAsync: { get: () => super.startAsync }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoServerInstance === null)
                throw new verror_1.VError({ name: MongoInMemoryErrors.FailedToStart }, 'Mongo failed to start or you have yet to call create.');
            yield _super.startAsync.call(this);
            yield bluebird_1.promisify(this.mongoServerInstance.start).bind(this.mongoServerInstance)();
        });
    }
    stopAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            yield bluebird_1.promisify(this.mongoServerInstance.stop).bind(this.mongoServerInstance)();
        });
    }
    getConnectionString() {
        if (this._created)
            return "mongodb://" + this.connectionHost + ":" + this.connectionPort;
        else
            throw abase_config_factory_1.ErrorFactory.NotCreated;
    }
}
exports.MongoInMemoryConfigFactory = MongoInMemoryConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVGQUE4RjtBQUM5Rix1RkFBb0c7QUFHcEcsbUNBQThCO0FBQzlCLHVDQUFtQztBQUVuQyxxQ0FBcUM7QUFLdkIsZ0JBQUU7QUFFaEIsTUFBTSxtQkFBbUI7O0FBRWQsaUNBQWEsR0FBRyxlQUFlLENBQUM7QUFHM0MsTUFBYSwwQkFBc0QsU0FBUSx5Q0FBa0I7SUFnQnpGLFlBQXFCLGNBQWtCO1FBRW5DLEtBQUssRUFBRSxDQUFDO1FBRlMsbUJBQWMsR0FBZCxjQUFjLENBQUk7UUFkOUIsZ0JBQVcsR0FBWSxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3RDLGlCQUFZLEdBQXdCLHlDQUFrQixDQUFDLE9BQU8sQ0FBQTtRQUM5RCxTQUFJLEdBQXdCLHlDQUFrQixDQUFDLElBQUksQ0FBQTtRQUNuRCxpQkFBWSxHQUE0QixFQUFFLENBQUMsWUFBWSxDQUFDO1FBSXpELHdCQUFtQixHQUFTLElBQUksQ0FBQztJQVV6QyxDQUFDO0lBUkQsTUFBTSxDQUFDLFdBQVc7UUFFZCxPQUFPLElBQUksMEJBQTBCLENBQU0sU0FBUyxDQUFnRCxDQUFDO0lBQ3pHLENBQUM7SUFPWSxXQUFXLENBQUMsSUFBc0I7Ozs7O1lBRTNDLE1BQU0sT0FBTSxXQUFXLFlBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFakQsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDO1lBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztRQUN4RCxDQUFDO0tBQUE7SUFFWSxVQUFVOzs7OztZQUVuQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxJQUFJO2dCQUNqQyxNQUFNLElBQUksZUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBQyxFQUFFLHVEQUF1RCxDQUFDLENBQUM7WUFFeEgsTUFBTSxPQUFNLFVBQVUsV0FBRSxDQUFDO1lBRXpCLE1BQU0sb0JBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7UUFDckYsQ0FBQztLQUFBO0lBRVksU0FBUzs7WUFFbEIsTUFBTSxvQkFBUyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQztRQUNwRixDQUFDO0tBQUE7SUFFRCxtQkFBbUI7UUFFZixJQUFJLElBQUksQ0FBQyxRQUFRO1lBQ2IsT0FBTyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7WUFFdEUsTUFBTSxtQ0FBWSxDQUFDLFVBQVUsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUF2REQsZ0VBdURDIn0=