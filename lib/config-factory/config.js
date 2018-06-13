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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBRWpDLHVCQUFvQyxZQUFpQyxFQUFFLGNBQThCOztRQUVqRyxJQUFJLENBQUM7WUFDRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDRCxLQUFLLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO1lBQ0csRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxDQUFDO1lBRUQsTUFBTSxDQUFDLENBQUM7UUFDWixDQUFDO1FBRUQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUFBO0FBZkQsc0NBZUM7QUFFRCxrQkFBeUIsWUFBaUM7SUFFdEQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFIRCw0QkFHQztBQUVEO0lBSVUsYUFBYSxDQUFDLGNBQThCOztZQUU5QyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDNUQsQ0FBQztLQUFBO0lBRUQsUUFBUTtRQUVKLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7Q0FDSjtBQWJELHdCQWFDIn0=