import {expect} from 'chai'

import * as CSE from './config-settings-errors';

describe('Config Settings Errors', () =>
{
    it('ErrorMissingsSetting, message is correct', () =>
    {
        let parametersErrors : CSE.ErrorSettingMissing [] = [
            new CSE.ErrorSettingMissing("Parameter1"),
            new CSE.ErrorSettingMissing("Parameter2"),
            new CSE.ErrorSettingMissing("Parameter3")
        ];

        let errorSettingsMissing = new CSE.ErrorSettingsMissing(parametersErrors);

        let baseError = errorSettingsMissing as Error;

        expect(baseError).has.property('message');
        expect(baseError.message).to.contain(CSE.ErrorSettingsMissing.errorDescription);
        expect(baseError.message).to.contain(`(${parametersErrors.length})`);

        expect(errorSettingsMissing).has.property('message');
        expect(errorSettingsMissing.message).to.contain(`${CSE.ErrorSettingsMissing.errorDescription}`);
        expect(errorSettingsMissing.message).to.contain(JSON.stringify(parametersErrors));
    });

    it("ErrorFailedValidation, passthrought error message", () => {
        
        let parameterError = new CSE.ErrorSettingMissing("Parameter1");

        let errorFailedValidation = new CSE.ErrorValidationFailed(parameterError);

        expect(errorFailedValidation).has.property('message').to.contain(CSE.ErrorSettingMissing.errorDescription);
    });
});