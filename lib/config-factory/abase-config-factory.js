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
const config_factory_types_1 = require("./config-factory-types");
const JoiX = require("../joi-x");
const VError = require("verror");
class ABaseConfigFactory {
    constructor() {
        this.FactoryClass = config_factory_types_1.ConfigFactoryClass.Factory;
        this.Type = config_factory_types_1.ConfigFactoryTypes.Vanilla;
        this.ConfigSettings = {};
        this._created = false;
    }
    FactoryName() {
        return config_factory_types_1.ConfigFactoryTypesPrefixStr[this.FactoryClass] + config_factory_types_1.ConfigFactoryClassStemStr[this.Type] + this.ConfigFactoryName;
    }
    create(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.FactoryClass = settings.FactoryClass;
            this.Type = settings.Type;
            let results;
            try {
                this.ConfigSettings = JoiX.validate(settings.ConfigSettings, this.configSchema, { abortEarly: false });
            }
            catch (e) {
                if (JoiX.isJoiError(e)) {
                    throw new VError(e, this.FactoryName());
                }
                throw e;
            }
            this._created = true;
            return Promise.resolve();
        });
    }
    start() {
        return Promise.resolve();
    }
    stopAsync() {
        return Promise.resolve();
    }
    validateAsync(configSettings = this.ConfigSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield JoiX.validate(this.ConfigSettings, this.configSchema);
            }
            catch (e) {
                if (JoiX.isJoiError(e)) {
                    return Promise.resolve(e.details);
                }
                throw e;
            }
            return Promise.resolve([]);
        });
    }
    describe() {
        return JSON.stringify(JoiX.describe(this.configSchema));
    }
}
exports.ABaseConfigFactory = ABaseConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlFQUE2TTtBQUk3TSxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBR2pDO0lBQUE7UUFFSSxpQkFBWSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUM7UUFDL0QsU0FBSSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUM7UUFDdkQsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBSTdCLGFBQVEsR0FBYSxLQUFLLENBQUM7SUE2RHZDLENBQUM7SUEzREcsV0FBVztRQUNQLE1BQU0sQ0FBQyxrREFBMkIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0RBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMxSCxDQUFDO0lBRUssTUFBTSxDQUFDLFFBQTRCOztZQUVyQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUksT0FBK0MsQ0FBQztZQUVwRCxJQUNBLENBQUM7Z0JBQ0csSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3pHLENBQUM7WUFDRCxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO2dCQUNHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwQixNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRCxNQUFNLENBQUMsQ0FBQztZQUNaLENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUVyQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVELEtBQUs7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBRUwsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUssYUFBYSxDQUFDLGlCQUFrQyxJQUFJLENBQUMsY0FBYzs7WUFFckUsSUFBSSxDQUFDO2dCQUNELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRSxDQUFDO1lBQ0QsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQztnQkFDRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELE1BQU0sQ0FBQyxDQUFDO1lBQ1osQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVELFFBQVE7UUFFSixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDSjtBQXJFRCxnREFxRUMifQ==