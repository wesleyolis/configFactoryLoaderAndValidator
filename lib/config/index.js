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
// Will potentially need the ability register callback, so that they can customize the configuration.
// That manually just recall configAsync, to be reload, with spesific set of configuration, wiht like a force reload.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBbUQ7QUFDbkQsb0NBQWtEO0FBSWxELElBQUkscUJBQXFCLEdBQW1ELFNBQVMsQ0FBQztBQUV0RixxR0FBcUc7QUFDckcscUhBQXFIO0FBRXJIOztRQUVJLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixJQUFJLFNBQVMsQ0FBQyxDQUN2QyxDQUFDO1lBQ0csSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLHlHQUF5RztZQUN6RywwQ0FBMEM7WUFFMUMscUJBQXFCLEdBQUcsTUFBTSxrQkFBVSxDQUFDLE1BQU0sRUFBRSxxQkFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FBQTtBQVpELGtDQVlDIn0=