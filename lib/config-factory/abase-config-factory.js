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
const JoiX = require("../joi-x");
const VError = require("verror");
const config_1 = require("./config");
const abase_config_factory_schema_1 = require("./abase-config-factory-schema");
var ErrorFactory;
(function (ErrorFactory) {
    ErrorFactory["NotCreated"] = "FactoryNotCreated";
})(ErrorFactory = exports.ErrorFactory || (exports.ErrorFactory = {}));
class ABaseConfigFactory extends config_1.Config {
    constructor() {
        super(...arguments);
        this._created = false;
    }
    createFactoryAsync(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            delete settings.factory;
            return this.createAsync(settings);
        });
    }
    createAsync(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const baseTobeEnhanceConfigSchema = abase_config_factory_schema_1.baseConfigSchema;
                const configSchema = this.configSchema.keys(baseTobeEnhanceConfigSchema);
                this.configSettings = JSON.parse(JSON.stringify(yield JoiX.validate(config, configSchema, { abortEarly: false })));
            }
            catch (e) {
                if (JoiX.isJoiError(e)) {
                    throw new VError(e, this.factoryName);
                }
                throw e;
            }
            this._created = true;
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
}
exports.ABaseConfigFactory = ABaseConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMscUNBQWtDO0FBQ2xDLCtFQUFnRTtBQUVoRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFFcEIsZ0RBQWdDLENBQUE7QUFDcEMsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQsd0JBQXlDLFNBQVEsZUFBTTtJQUF2RDs7UUFTYyxhQUFRLEdBQWEsS0FBSyxDQUFDO0lBeUN6QyxDQUFDO0lBdkNTLGtCQUFrQixDQUFnRCxRQUFZOztZQUVoRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFFeEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxNQUF5Qjs7WUFFdkMsSUFDQTtnQkFDSSxNQUFNLDJCQUEyQixHQUFHLDhDQUFnQixDQUFDO2dCQUVyRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUN6RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNwSDtZQUNELE9BQU0sQ0FBQyxFQUNQO2dCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDbkIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUN6QztnQkFDRCxNQUFNLENBQUMsQ0FBQzthQUNYO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUQsVUFBVTtRQUVOLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBQyxFQUFFLDJEQUEyRCxDQUFDLENBQUM7UUFFbkgsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVM7UUFFTCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFsREQsZ0RBa0RDIn0=