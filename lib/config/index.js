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
const rbLog = global.rbLog;
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
function loadConfig(lazyLoad = false, configOptional = false, configSettings = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configSettings == undefined)
            configSettings = require('config');
        configInstancesLoaded = yield index_1.LoadConfig(configSettings, global_1.configSchema, lazyLoad, configOptional);
    });
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQ0FBbUQ7QUFDbkQsb0NBQXVFO0FBS3ZFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFFM0IsSUFBSSxxQkFBcUIsR0FBbUQsU0FBUyxDQUFDO0FBRXRGLHFHQUFxRztBQUNyRyxxSEFBcUg7QUFFckg7O1FBRUksSUFBSSxxQkFBcUIsSUFBSSxTQUFTLEVBQ3RDO1lBQ0ksSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQy9CLHlHQUF5RztZQUN6RywwQ0FBMEM7WUFFMUMscUJBQXFCLEdBQUcsTUFBTSxrQkFBaUIsQ0FBQyxNQUFNLEVBQUUscUJBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztTQUMvRTtRQUVELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FBQTtBQVpELGtDQVlDO0FBRUQsb0JBQWlDLFdBQXFCLEtBQUssRUFBRSxpQkFBMkIsS0FBSyxFQUFFLGlCQUF1QixTQUFTOztRQUUzSCxJQUFJLGNBQWMsSUFBSSxTQUFTO1lBQzNCLGNBQWMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdkMscUJBQXFCLEdBQUcsTUFBTSxrQkFBaUIsQ0FBQyxjQUFjLEVBQUUscUJBQVksRUFBRSxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUFBO0FBTkQsZ0NBTUMifQ==