"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("./joi-x");
var DPorts;
(function (DPorts) {
    DPorts[DPorts["undefined"] = -1] = "undefined";
    DPorts[DPorts["mongo"] = 27017] = "mongo";
    DPorts[DPorts["sftp"] = 22] = "sftp";
})(DPorts = exports.DPorts || (exports.DPorts = {}));
exports.port = (port = DPorts.undefined) => {
    const joi = JoiX.number().min(0).max(65535);
    let desc = 'Typically value must be in Range [0-65535], ports lower than 1024 are reserved.';
    if (port != -1)
        joi.default(port);
    else
        desc += 'Default Port [' + port + ']';
    return joi.description(desc); // Remeber that you are overiding the super impose type value build ups.
};
var PassType;
(function (PassType) {
    PassType["plainText"] = "plainText";
    PassType["encrypt"] = "encrypt";
})(PassType = exports.PassType || (exports.PassType = {}));
exports.password = (passType = PassType.plainText) => {
    return JoiX.object().keys({
        phrase: JoiX.string().required(),
        type: JoiX.enumString([PassType.plainText, PassType.encrypt]).description("spesified preprocessor, adapter transform to apply, support adapters:'encrypt'")
    }).description("Password, which consists of a phrase and type, were type is adapter tranformation.");
};
exports.mongoConnectionString = () => {
    return JoiX.string();
};
exports.postgress = () => {
    return JoiX.string();
};
exports.Url = () => {
    return JoiX.string();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQStCO0FBTy9CLElBQVksTUFLWDtBQUxELFdBQVksTUFBTTtJQUVkLDhDQUFjLENBQUE7SUFDZCx5Q0FBYSxDQUFBO0lBQ2Isb0NBQVMsQ0FBQTtBQUNiLENBQUMsRUFMVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFLakI7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLE9BQWdCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLElBQUksR0FBRyxpRkFBaUYsQ0FBQztJQUM3RixJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7UUFDVixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOztRQUVsQixJQUFJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUUxQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRyx3RUFBd0U7QUFDNUcsQ0FBQyxDQUFBO0FBRUQsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBRWhCLG1DQUF1QixDQUFBO0lBQ3ZCLCtCQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQUVZLFFBQUEsUUFBUSxHQUFHLENBQUMsV0FBc0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBRWpFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxJQUFJLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGdGQUFnRixDQUFDO0tBQy9KLENBQUMsQ0FBQyxXQUFXLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztBQUN6RyxDQUFDLENBQUE7QUFFWSxRQUFBLHFCQUFxQixHQUFHLEdBQUcsRUFBRTtJQUV0QyxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN6QixDQUFDLENBQUE7QUFFWSxRQUFBLFNBQVMsR0FBRyxHQUFHLEVBQUU7SUFFMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBRVksUUFBQSxHQUFHLEdBQUcsR0FBRyxFQUFFO0lBRXBCLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0FBQ3hCLENBQUMsQ0FBQSJ9