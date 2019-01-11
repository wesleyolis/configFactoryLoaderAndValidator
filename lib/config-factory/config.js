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
function validateAsync(configSchema, configSettings) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield JoiX.validate(configSettings, configSchema);
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
exports.validateAsync = validateAsync;
function describe(configSchema) {
    return JSON.stringify(JoiX.describe(configSchema));
}
exports.describe = describe;
class Config {
    validateAsync(configSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            return validateAsync(this.configSchema, configSettings);
        });
    }
    describe() {
        return describe(this.configSchema);
    }
}
exports.Config = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBRWpDLFNBQXNCLGFBQWEsQ0FBQyxZQUFpQyxFQUFFLGNBQThCOztRQUVqRyxJQUFJO1lBQ0EsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztTQUNyRDtRQUNELE9BQU0sQ0FBQyxFQUNQO1lBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNwQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JDO1lBRUQsTUFBTSxDQUFDLENBQUM7U0FDWDtRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQUE7QUFmRCxzQ0FlQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxZQUFpQztJQUV0RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFIRCw0QkFHQztBQUVELE1BQXNCLE1BQU07SUFJbEIsYUFBYSxDQUFDLGNBQThCOztZQUU5QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzVELENBQUM7S0FBQTtJQUVELFFBQVE7UUFFSixPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNKO0FBYkQsd0JBYUMifQ==