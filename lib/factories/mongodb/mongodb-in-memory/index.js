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
var MongoInMemory = require('mongo-in-memory');
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
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, conf);
            this.mongoServerInstance = new MongoInMemory(this.configSettings.port);
            this.connectionHost = this.mongoServerInstance.host;
            this.connectionPort = this.mongoServerInstance.port;
        });
    }
    startAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoServerInstance === null)
                throw new verror_1.VError({ name: MongoInMemoryErrors.FailedToStart }, 'Mongo failed to start or you have yet to call create.');
            yield _super("startAsync").call(this);
            return yield bluebird_1.promisify(this.mongoServerInstance.start).bind(this.mongoServerInstance);
        });
    }
    stopAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bluebird_1.promisify(this.mongoServerInstance.stop).bind(this.mongoServerInstance);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVGQUE4RjtBQUM5Rix1RkFBb0c7QUFHcEcsbUNBQThCO0FBQzlCLHVDQUFtQztBQUVuQyxxQ0FBcUM7QUFLdkIsZ0JBQUU7QUFFaEIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFL0M7O0FBRVcsaUNBQWEsR0FBRyxlQUFlLENBQUM7QUFHM0MsZ0NBQW1FLFNBQVEseUNBQWtCO0lBZ0J6RixZQUFxQixjQUFrQjtRQUVuQyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBZDlCLGdCQUFXLEdBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQztRQUN0QyxpQkFBWSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUE7UUFDOUQsU0FBSSxHQUF3Qix5Q0FBa0IsQ0FBQyxJQUFJLENBQUE7UUFDbkQsaUJBQVksR0FBNEIsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUl6RCx3QkFBbUIsR0FBUyxJQUFJLENBQUM7SUFVekMsQ0FBQztJQVJELE1BQU0sQ0FBQyxXQUFXO1FBRWQsTUFBTSxDQUFDLElBQUksMEJBQTBCLENBQU0sU0FBUyxDQUFnRCxDQUFDO0lBQ3pHLENBQUM7SUFPWSxXQUFXLENBQUMsSUFBc0I7OztZQUUzQyxNQUFNLHFCQUFpQixZQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXZFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQztZQUNwRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDeEQsQ0FBQztLQUFBO0lBRVksVUFBVTs7O1lBRW5CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLENBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxlQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFDLEVBQUUsdURBQXVELENBQUMsQ0FBQztZQUV4SCxNQUFNLG9CQUFnQixXQUFFLENBQUM7WUFFekIsTUFBTSxDQUFDLE1BQU0sb0JBQVMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFGLENBQUM7S0FBQTtJQUVZLFNBQVM7O1lBRWxCLE1BQU0sQ0FBQyxNQUFNLG9CQUFTLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6RixDQUFDO0tBQUE7SUFFRCxtQkFBbUI7UUFFZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2QsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQzFFLElBQUk7WUFDQSxNQUFNLG1DQUFZLENBQUMsVUFBVSxDQUFDO0lBQ3RDLENBQUM7Q0FDSjtBQXJERCxnRUFxREMifQ==