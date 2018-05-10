"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const CSE = require("./config-settings-errors");
describe('Config Settings Errors', () => {
    it('ErrorMissingsSetting, message is correct', () => {
        let parametersErrors = [
            new CSE.ErrorSettingMissing("Parameter1"),
            new CSE.ErrorSettingMissing("Parameter2"),
            new CSE.ErrorSettingMissing("Parameter3")
        ];
        let errorSettingsMissing = new CSE.ErrorSettingsMissing(parametersErrors);
        let baseError = errorSettingsMissing;
        chai_1.expect(baseError).has.property('message');
        chai_1.expect(baseError.message).to.contain(CSE.ErrorSettingsMissing.errorDescription);
        chai_1.expect(baseError.message).to.contain(`(${parametersErrors.length})`);
        chai_1.expect(errorSettingsMissing).has.property('message');
        chai_1.expect(errorSettingsMissing.message).to.contain(`${CSE.ErrorSettingsMissing.errorDescription}`);
        chai_1.expect(errorSettingsMissing.message).to.contain(JSON.stringify(parametersErrors));
    });
    it("ErrorFailedValidation, passthrought error message", () => {
        let parameterError = new CSE.ErrorSettingMissing("Parameter1");
        let errorFailedValidation = new CSE.ErrorValidationFailed(parameterError);
        chai_1.expect(errorFailedValidation).has.property('message').to.contain(CSE.ErrorSettingMissing.errorDescription);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNldHRpbmdzLWVycm9ycy5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1vcHRpb25zL2NvbmZpZy1zZXR0aW5ncy1lcnJvcnMuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUEyQjtBQUUzQixnREFBZ0Q7QUFFaEQsUUFBUSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRTtJQUVwQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBRyxFQUFFO1FBRWhELElBQUksZ0JBQWdCLEdBQWdDO1lBQ2hELElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQztZQUN6QyxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7WUFDekMsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDO1NBQzVDLENBQUM7UUFFRixJQUFJLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDLG9CQUFvQixDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFMUUsSUFBSSxTQUFTLEdBQUcsb0JBQTZCLENBQUM7UUFFOUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsYUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2hGLGFBQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFckUsYUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxhQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDaEcsYUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbURBQW1ELEVBQUUsR0FBRyxFQUFFO1FBRXpELElBQUksY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRS9ELElBQUkscUJBQXFCLEdBQUcsSUFBSSxHQUFHLENBQUMscUJBQXFCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFMUUsYUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9HLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==