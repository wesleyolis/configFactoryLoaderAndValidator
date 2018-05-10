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
const abase_config_factory_1 = require("../../config-factory/abase-config-factory");
var MongoInMemory = require('mongo-in-memory');
exports.ConnectionStringConst = 'MongoConnectionString';
class MongoInMemoryConfigFactory extends abase_config_factory_1.ABaseConfigFactory {
    constructor() {
        super(...arguments);
        this.ConfigOptionsTypes = {};
        this.port = 8000;
        this.mongoServerInstance = null;
    }
    create(options) {
        super.create(options);
        this.mongoServerInstance = new MongoInMemory(this.port);
    }
    start() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mongoServerInstance === null)
                throw new Error('Mongo failed to start or you have yet to call create.');
            _super("start").call(this);
            const config = yield this.mongoServerInstance.start();
            return config;
        });
    }
    stop() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi1pbi1tZW1vcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmFjdG9yaWVzL21vbmdvZGIvbW9uZ29kYi1pbi1tZW1vcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG9GQUE2RTtBQUs3RSxJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUVsQyxRQUFBLHFCQUFxQixHQUFZLHVCQUF1QixDQUFDO0FBSXRFLGdDQUF3QyxTQUFRLHlDQUFrQjtJQUFsRTs7UUFFSSx1QkFBa0IsR0FBeUIsRUFBRSxDQUFDO1FBQ3RDLFNBQUksR0FBWSxJQUFJLENBQUM7UUFDckIsd0JBQW1CLEdBQVMsSUFBSSxDQUFDO0lBd0M3QyxDQUFDO0lBdENHLE1BQU0sQ0FBQyxPQUEyQjtRQUU5QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVZLEtBQUs7OztZQUVkLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLElBQUk7Z0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQztZQUU3RSxlQUFXLFlBQUc7WUFFZCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUV0RCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFFTSxJQUFJO1FBRVAsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELFFBQVE7UUFFSixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxRQUFRO1FBRUosT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsbUJBQW1CO1FBRWYsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUE1Q0QsZ0VBNENDIn0=