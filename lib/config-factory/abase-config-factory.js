"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_factory_types_1 = require("./config-factory-types");
const CSE = require("../config-options/config-settings-errors");
class ABaseConfigFactory {
    constructor() {
        this.FactoryClass = config_factory_types_1.ConfigFactoryClass.Factory;
        this.Type = config_factory_types_1.ConfigFactoryTypes.Vanilla;
        this.ConfigSettings = {};
        this._created = false;
    }
    create(settings) {
        this.FactoryClass = settings.FactoryClass;
        this.Type = settings.Type;
        this.ConfigSettings = settings.ConfigSettings;
        try {
            this.validate();
        }
        catch (error) {
            if (error instanceof CSE.ErrorSettings)
                throw new CSE.ErrorValidationFailed(error);
            else
                throw error;
        }
        this._created = true;
    }
    start() {
        if (!this._created)
            throw new Error('Factory has yet to be created.');
    }
    stop() {
    }
}
exports.ABaseConfigFactory = ABaseConfigFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJhc2UtY29uZmlnLWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvYWJhc2UtY29uZmlnLWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRUFBa0c7QUFHbEcsZ0VBQStEO0FBRS9EO0lBQUE7UUFFSSxpQkFBWSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUM7UUFDL0QsU0FBSSxHQUF3Qix5Q0FBa0IsQ0FBQyxPQUFPLENBQUM7UUFDdkQsbUJBQWMsR0FBb0IsRUFBRSxDQUFDO1FBRTdCLGFBQVEsR0FBYSxLQUFLLENBQUM7SUFtQ3ZDLENBQUM7SUFqQ0csTUFBTSxDQUFDLFFBQTRCO1FBRS9CLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDO1FBRTlDLElBQUk7WUFDQSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDbkI7UUFDRCxPQUFNLEtBQUssRUFDWDtZQUNJLElBQUksS0FBSyxZQUFZLEdBQUcsQ0FBQyxhQUFhO2dCQUNsQyxNQUFNLElBQUksR0FBRyxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDOztnQkFFM0MsTUFBTSxLQUFLLENBQUM7U0FDbkI7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsS0FBSztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsSUFBSTtJQUVKLENBQUM7Q0FLSjtBQXpDRCxnREF5Q0MifQ==