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
const CS = require("./configSchema");
const verror_1 = require("verror");
var MongoInMemory = require('mongo-in-memory');
class MongoInMemoryConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    constructor() {
        super(...arguments);
        this.configFactoryName = "MongoInMemory";
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.Factory;
        this.type = config_factory_types_1.ConfigFactoryTypes.Mock;
        this.configSchema = CS.configSchema;
        this.mongoServerInstance = null;
    }
    createAsync(options) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, options);
            //   this.mongoServerInstance = new MongoInMemory(this.ConfigSettings);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHVGQUFnRjtBQUNoRix1RkFBdUg7QUFHdkgscUNBQXFDO0FBQ3JDLG1DQUE4QjtBQUU5QixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQyxnQ0FBd0MsU0FBUSx5Q0FBa0I7SUFBbEU7O1FBRUksc0JBQWlCLEdBQVksZUFBZSxDQUFDO1FBQzdDLGlCQUFZLEdBQXdCLHlDQUFrQixDQUFDLE9BQU8sQ0FBQTtRQUM5RCxTQUFJLEdBQXdCLHlDQUFrQixDQUFDLElBQUksQ0FBQTtRQUNuRCxpQkFBWSxHQUE0QixFQUFFLENBQUMsWUFBWSxDQUFDO1FBR2hELHdCQUFtQixHQUFTLElBQUksQ0FBQztJQXdDN0MsQ0FBQztJQXRDUyxXQUFXLENBQUMsT0FBMkI7OztZQUV6QyxNQUFNLHFCQUFpQixZQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXBDLHVFQUF1RTtRQUN4RSxDQUFDO0tBQUE7SUFFWSxVQUFVOzs7WUFFbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixLQUFLLElBQUksQ0FBQztnQkFDbEMsTUFBTSxJQUFJLGVBQU0sQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1lBRS9FLE1BQU0sb0JBQWdCLFdBQUUsQ0FBQztZQUV4QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUV0RCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVNLFNBQVM7UUFFWixNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxtQkFBbUI7UUFFZixNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBaERELGdFQWdEQyJ9