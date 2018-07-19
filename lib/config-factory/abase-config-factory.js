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
                const configSchema = this.configSchema.keys(abase_config_factory_schema_1.baseConfigSchema);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMscUNBQWtDO0FBQ2xDLCtFQUFnRTtBQUVoRSxJQUFZLFlBR1g7QUFIRCxXQUFZLFlBQVk7SUFFcEIsZ0RBQWdDLENBQUE7QUFDcEMsQ0FBQyxFQUhXLFlBQVksR0FBWixvQkFBWSxLQUFaLG9CQUFZLFFBR3ZCO0FBRUQsd0JBQXlDLFNBQVEsZUFBTTtJQUF2RDs7UUFTYyxhQUFRLEdBQWEsS0FBSyxDQUFDO0lBdUN6QyxDQUFDO0lBckNTLGtCQUFrQixDQUFnRCxRQUFZOztZQUVoRixPQUFPLFFBQVEsQ0FBQyxPQUFPLENBQUM7WUFFeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQXlCOztZQUV2QyxJQUNBLENBQUM7Z0JBQ0csTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsOENBQWdCLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckgsQ0FBQztZQUNELEtBQUssQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUNSLENBQUM7Z0JBQ0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQ3BCLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUMsQ0FBQztnQkFDRCxNQUFNLENBQUMsQ0FBQztZQUNaLENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFRCxVQUFVO1FBRU4sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2YsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsVUFBVSxFQUFDLEVBQUUsMkRBQTJELENBQUMsQ0FBQztRQUVuSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBRUwsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFoREQsZ0RBZ0RDIn0=