"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const abase_config_factory_1 = require("../../../config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
const verror_1 = require("verror");
const CS = require("./configSchema");
__export(require("./configSchema"));
exports.factoryName = "InMemory";
var MongoInMemory = require('mongo-in-memory');
class MongoInMemoryConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    constructor(configSettings) {
        super();
        this.configSettings = configSettings;
        this.factoryName = exports.factoryName;
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
        });
    }
    startAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoServerInstance === null)
                throw new verror_1.VError('Mongo failed to start or you have yet to call create.');
            yield _super("startAsync").call(this);
            const config = yield this.mongoServerInstance.start();
            return config;
        });
    }
    stopAsync() {
        return this.mongoServerInstance.stop();
    }
    describe() {
        return "";
    }
    validate() {
        return [];
    }
    getConnectionString() {
        return "";
    }
}
exports.MongoInMemoryConfigFactory = MongoInMemoryConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLHVGQUFnRjtBQUNoRix1RkFBb0c7QUFHcEcsbUNBQThCO0FBRTlCLHFDQUFxQztBQUtyQyxvQ0FBOEI7QUFFakIsUUFBQSxXQUFXLEdBQUcsVUFBVSxDQUFDO0FBRXRDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRS9DLGdDQUFtRSxTQUFRLHlDQUFrQjtJQWN6RixZQUFxQixjQUFrQjtRQUVuQyxLQUFLLEVBQUUsQ0FBQztRQUZTLG1CQUFjLEdBQWQsY0FBYyxDQUFJO1FBWjlCLGdCQUFXLEdBQVksbUJBQVcsQ0FBQztRQUNuQyxpQkFBWSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUE7UUFDOUQsU0FBSSxHQUF3Qix5Q0FBa0IsQ0FBQyxJQUFJLENBQUE7UUFDbkQsaUJBQVksR0FBNEIsRUFBRSxDQUFDLFlBQVksQ0FBQztRQUV6RCx3QkFBbUIsR0FBUyxJQUFJLENBQUM7SUFVekMsQ0FBQztJQVJELE1BQU0sQ0FBQyxXQUFXO1FBRWQsTUFBTSxDQUFDLElBQUksMEJBQTBCLENBQU0sU0FBUyxDQUFnRCxDQUFDO0lBQ3pHLENBQUM7SUFPWSxXQUFXLENBQUMsSUFBc0I7OztZQUUzQyxNQUFNLHFCQUFpQixZQUFDLElBQUksQ0FBQyxDQUFDO1lBRTlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNFLENBQUM7S0FBQTtJQUVZLFVBQVU7OztZQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEtBQUssSUFBSSxDQUFDO2dCQUNsQyxNQUFNLElBQUksZUFBTSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7WUFFL0UsTUFBTSxvQkFBZ0IsV0FBRSxDQUFDO1lBRXhCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxDQUFDO1lBRXRELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbEIsQ0FBQztLQUFBO0lBRU0sU0FBUztRQUVaLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELG1CQUFtQjtRQUVmLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUF6REQsZ0VBeURDIn0=