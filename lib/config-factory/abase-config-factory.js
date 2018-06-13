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
var ErrorFactory;
(function (ErrorFactory) {
    ErrorFactory["NotCreated"] = "FactoryNotCreated";
})(ErrorFactory = exports.ErrorFactory || (exports.ErrorFactory = {}));
class ABaseConfigFactory extends config_1.Config {
    constructor() {
        super(...arguments);
        this.configSchemaWithClassification = {
            class: JoiX.string().allow().required(),
            type: JoiX.string().required()
        };
        this._created = false;
    }
    createAsync(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const configSchema = this.configSchema.keys(this.configSchemaWithClassification);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFFakMscUNBQWtDO0FBRWxDLElBQVksWUFHWDtBQUhELFdBQVksWUFBWTtJQUVwQixnREFBZ0MsQ0FBQTtBQUNwQyxDQUFDLEVBSFcsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFHdkI7QUFFRCx3QkFBeUMsU0FBUSxlQUFNO0lBQXZEOztRQVNhLG1DQUE4QixHQUFvQjtZQUN2RCxLQUFLLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN4QyxJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUNsQyxDQUFDO1FBRU0sYUFBUSxHQUFhLEtBQUssQ0FBQztJQWtDdkMsQ0FBQztJQWhDUyxXQUFXLENBQUMsTUFBeUI7O1lBRXZDLElBQ0EsQ0FBQztnQkFDRyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQ3pGLENBQUM7WUFDRCxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO2dCQUNHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUNwQixNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLENBQUM7WUFDWixDQUFDO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFFckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDO0tBQUE7SUFFRCxVQUFVO1FBRU4sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2YsTUFBTSxJQUFJLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxZQUFZLENBQUMsVUFBVSxFQUFDLEVBQUUsMkRBQTJELENBQUMsQ0FBQztRQUVuSCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBRUwsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFoREQsZ0RBZ0RDIn0=