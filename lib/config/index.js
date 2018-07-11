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
const global_1 = require("./global");
const index_1 = require("../index");
let configInstancesLoaded = undefined;
function configAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        if (configInstancesLoaded == undefined) {
            let config = require('config');
            // this should be replace with direct memory load of configuration, that is passed in via the enviroment.
            // their should be no file loading at all.
            configInstancesLoaded = yield index_1.LoadConfig(config, global_1.configSchema, true);
        }
        return Promise.resolve(configInstancesLoaded);
    });
}
exports.configAsync = configAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBbUQ7QUFDbkQsb0NBQWtEO0FBR2xELElBQUkscUJBQXFCLEdBQW1ELFNBQVMsQ0FBQztBQUV0Rjs7UUFFSSxJQUFJLHFCQUFxQixJQUFJLFNBQVMsRUFDdEM7WUFDSSxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDL0IseUdBQXlHO1lBQ3pHLDBDQUEwQztZQUUxQyxxQkFBcUIsR0FBRyxNQUFNLGtCQUFVLENBQUMsTUFBTSxFQUFFLHFCQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDeEU7UUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQUE7QUFaRCxrQ0FZQyJ9