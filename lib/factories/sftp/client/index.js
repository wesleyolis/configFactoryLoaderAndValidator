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
const CS = require("./config-schema");
const abase_config_factory_1 = require(".././../../../src/config-factory/abase-config-factory");
const config_factory_types_1 = require("../../../config-factory/config-factory-types");
class SftpClient extends abase_config_factory_1.ABaseConfigFactory {
    constructor(configSettings) {
        super();
        this.configSettings = configSettings;
        this.factoryName = CS.factoryName;
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.netService;
        this.type = config_factory_types_1.ConfigFactoryTypes.production;
        this.configSchema = CS.configSchema;
    }
    static NewInstance() {
        return new SftpClient(undefined);
    }
    createAsync(config) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("createAsync").call(this, config);
        });
    }
    startAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("startAsync").call(this);
        });
    }
    stopAsync() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("stopAsync").call(this);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmFjdG9yaWVzL3NmdHAvY2xpZW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBcUM7QUFDckMsZ0dBQXdGO0FBQ3hGLHVGQUFxRztBQUtyRyxnQkFBNEMsU0FBUSx5Q0FBa0I7SUFZbEUsWUFBbUIsY0FBa0I7UUFFakMsS0FBSyxFQUFFLENBQUM7UUFGTyxtQkFBYyxHQUFkLGNBQWMsQ0FBSTtRQVZyQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUM7UUFDckMsaUJBQVksR0FBdUIseUNBQWtCLENBQUMsVUFBVSxDQUFDO1FBQ2pFLFNBQUksR0FBdUIseUNBQWtCLENBQUMsVUFBVSxDQUFDO1FBQ3pELGlCQUFZLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQztJQVUvQixDQUFDO0lBUkQsTUFBTSxDQUFDLFdBQVc7UUFFZCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQU0sU0FBUyxDQUFnQyxDQUFDO0lBQ3pFLENBQUM7SUFPSyxXQUFXLENBQUMsTUFBeUI7OztZQUV2QyxNQUFNLHFCQUFpQixZQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVZLFVBQVU7OztZQUVuQixNQUFNLG9CQUFnQixXQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0lBRVksU0FBUzs7O1lBRWxCLE1BQU0sbUJBQWUsV0FBRSxDQUFDO1FBQzVCLENBQUM7S0FBQTtDQUNKIn0=