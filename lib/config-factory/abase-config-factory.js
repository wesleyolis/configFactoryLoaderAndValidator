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
            const unWrappedSettings = delete settings.factory;
            return this.createAsync(unWrappedSettings);
        });
    }
    createAsync(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configSchema = this.configSchema.keys(abase_config_factory_schema_1.baseConfigSchema);
                this.configSettings = yield JoiX.validate(config, configSchema, { abortEarly: false });
            }
            catch (e) {
                if (JoiX.isJoiError(e)) {
                    throw new VError(e, this.factoryName);
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
}
exports.ABaseConfigFactory = ABaseConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFFakMscUNBQWtDO0FBQ2xDLCtFQUFnRTtBQUVoRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFFcEIsZ0RBQWdDLENBQUE7QUFDcEMsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQsd0JBQXlDLFNBQVEsZUFBTTtJQUF2RDs7UUFTYyxhQUFRLEdBQWEsS0FBSyxDQUFDO0lBMEN6QyxDQUFDO0lBdkNTLGtCQUFrQixDQUFnRCxRQUFZOztZQUVoRixNQUFNLGlCQUFpQixHQUFHLE9BQU8sUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxNQUF5Qjs7WUFFdkMsSUFDQSxDQUFDO2dCQUNHLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLDhDQUFnQixDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztZQUN6RixDQUFDO1lBQ0QsS0FBSyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQ1IsQ0FBQztnQkFDRyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztvQkFDcEIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxDQUFDO1lBQ1osQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXJCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsQ0FBQztLQUFBO0lBRUQsVUFBVTtRQUVOLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNmLE1BQU0sSUFBSSxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLFVBQVUsRUFBQyxFQUFFLDJEQUEyRCxDQUFDLENBQUM7UUFFbkgsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsU0FBUztRQUVMLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBbkRELGdEQW1EQyJ9