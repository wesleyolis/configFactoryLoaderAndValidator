"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorSettings extends Error {
    constructor(msg) {
        super(msg);
    }
}
exports.ErrorSettings = ErrorSettings;
class ErrorSettingMissing extends ErrorSettings {
    constructor(parameter) {
        super(`${ErrorSettingMissing.errorDescription} [${parameter}]`);
        this.parameter = parameter;
    }
}
ErrorSettingMissing.errorDescription = 'Missing parameter';
exports.ErrorSettingMissing = ErrorSettingMissing;
class ErrorSettingsMissing extends ErrorSettings {
    constructor(errors) {
        super(`${ErrorSettingsMissing.errorDescription} (${errors.length}) => ${JSON.stringify(errors)}`);
        this.errors = errors;
    }
}
ErrorSettingsMissing.errorDescription = 'Missing Multiple Parameter';
exports.ErrorSettingsMissing = ErrorSettingsMissing;
class ErrorValidationFailed extends Error {
    constructor(error) {
        super(error.message);
        this.error = error;
    }
}
exports.ErrorValidationFailed = ErrorValidationFailed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNldHRpbmdzLWVycm9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb25maWctb3B0aW9ucy9jb25maWctc2V0dGluZ3MtZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUJBQTJCLFNBQVEsS0FBSztJQUVwQyxZQUFZLEdBQVk7UUFFcEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztDQUNKO0FBTkQsc0NBTUM7QUFFRCx5QkFBaUMsU0FBUSxhQUFhO0lBSWxELFlBQW1CLFNBQWtCO1FBRWpDLEtBQUssQ0FBQyxHQUFHLG1CQUFtQixDQUFDLGdCQUFnQixLQUFLLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFGakQsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUdyQyxDQUFDOztBQUxlLG9DQUFnQixHQUFHLG1CQUFtQixDQUFDO0FBRjNELGtEQVFDO0FBRUQsMEJBQWtDLFNBQVEsYUFBYTtJQUluRCxZQUFvQixNQUErQjtRQUUvQyxLQUFLLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxnQkFBZ0IsS0FBSyxNQUFNLENBQUMsTUFBTSxRQUFRLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRmxGLFdBQU0sR0FBTixNQUFNLENBQXlCO0lBR25ELENBQUM7O0FBTGUscUNBQWdCLEdBQUcsNEJBQTRCLENBQUM7QUFGcEUsb0RBUUM7QUFFRCwyQkFBbUMsU0FBUSxLQUFLO0lBRTVDLFlBQW9CLEtBQXFCO1FBRXJDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFGTCxVQUFLLEdBQUwsS0FBSyxDQUFnQjtJQUd6QyxDQUFDO0NBQ0o7QUFORCxzREFNQyJ9