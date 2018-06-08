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
var ErrorFactory;
(function (ErrorFactory) {
    ErrorFactory["NotCreated"] = "FactoryNotCreated";
})(ErrorFactory = exports.ErrorFactory || (exports.ErrorFactory = {}));
class ABaseConfigFactory {
    constructor() {
        this.factoryClass = config_factory_types_1.ConfigFactoryClass.Factory;
        this.type = config_factory_types_1.ConfigFactoryTypes.Vanilla;
        this._created = false;
    }
    factoryName() {
        return config_factory_types_1.ConfigFactoryTypesPrefixStr[this.factoryClass] + config_factory_types_1.ConfigFactoryClassStemStr[this.type] + this.configFactoryName;
    }
    createAsync(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            this.factoryClass = settings.factoryClass;
            this.type = settings.type;
            let results;
            try {
                //this.configSettings = JoiX.validate(settings.configSettings, this.configSchema, {abortEarly: false});
            }
            catch (e) {
                if (JoiX.isJoiError(e)) {
                    throw new VError(e, this.factoryName());
                }
                throw e;
            }
            this._created = true;
            return Promise.resolve();
        });
    }
    startAsync() {
        if (!this._created)
            throw new VError({ name: ErrorFactory.NotCreated }, "Must first call factory create once method, before start.");
        return Promise.resolve();
    }
    stopAsync() {
        return Promise.resolve();
    }
    validateAsync(configSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield JoiX.validate(this.configSettings, this.configSchema);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlFQUE2TTtBQUk3TSxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBR2pDLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUVwQixnREFBZ0MsQ0FBQTtBQUNwQyxDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRDtJQUFBO1FBR0ksaUJBQVksR0FBd0IseUNBQWtCLENBQUMsT0FBTyxDQUFDO1FBQy9ELFNBQUksR0FBd0IseUNBQWtCLENBQUMsT0FBTyxDQUFDO1FBSS9DLGFBQVEsR0FBYSxLQUFLLENBQUM7SUFnRXZDLENBQUM7SUE5REcsV0FBVztRQUNQLE1BQU0sQ0FBQyxrREFBMkIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsZ0RBQXlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUMxSCxDQUFDO0lBRUssV0FBVyxDQUFDLFFBQTRCOztZQUUxQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRTFCLElBQUksT0FBK0MsQ0FBQztZQUVwRCxJQUNBLENBQUM7Z0JBQ0csdUdBQXVHO1lBQzNHLENBQUM7WUFDRCxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO2dCQUNHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwQixNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztnQkFDRCxNQUFNLENBQUMsQ0FBQztZQUNaLENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUVyQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVELFVBQVU7UUFFTixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDZixNQUFNLElBQUksTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxVQUFVLEVBQUMsRUFBRSwyREFBMkQsQ0FBQyxDQUFDO1FBRW5ILE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVM7UUFFTCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFSyxhQUFhLENBQUMsY0FBK0I7O1lBRS9DLElBQUksQ0FBQztnQkFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEUsQ0FBQztZQUNELEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7Z0JBQ0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEMsQ0FBQztnQkFFRCxNQUFNLENBQUMsQ0FBQztZQUNaLENBQUM7WUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFRCxRQUFRO1FBRUosTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0o7QUF4RUQsZ0RBd0VDIn0=