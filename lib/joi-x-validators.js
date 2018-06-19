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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQStCO0FBTy9CLElBQVksTUFLWDtBQUxELFdBQVksTUFBTTtJQUVkLDhDQUFjLENBQUE7SUFDZCx5Q0FBYSxDQUFBO0lBQ2Isb0NBQVMsQ0FBQTtBQUNiLENBQUMsRUFMVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFLakI7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLE9BQWdCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLElBQUksR0FBRyxpRkFBaUYsQ0FBQztJQUM3RixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLElBQUk7UUFDQSxJQUFJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFHLHdFQUF3RTtBQUM1RyxDQUFDLENBQUE7QUFFRCxJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFFaEIsbUNBQXVCLENBQUE7SUFDdkIsK0JBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQUpXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBSW5CO0FBRVksUUFBQSxRQUFRLEdBQUcsQ0FBQyxXQUFzQixRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFFakUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDdEIsTUFBTSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDakMsSUFBSSxFQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnRkFBZ0YsQ0FBQztLQUMvSixDQUFDLENBQUMsV0FBVyxDQUFDLG9GQUFvRixDQUFDLENBQUM7QUFDekcsQ0FBQyxDQUFBIn0=