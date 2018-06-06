"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("./joi-x");
var DPorts;
(function (DPorts) {
    DPorts[DPorts["Undefined"] = -1] = "Undefined";
    DPorts[DPorts["Mongo"] = 27017] = "Mongo";
})(DPorts = exports.DPorts || (exports.DPorts = {}));
exports.port = (port = DPorts.Undefined) => {
    const joi = JoiX.number().min(0).max(65535);
    let desc = 'Typically value must be in Range [0-65535], ports lower than 1024 are reserved.';
    if (port != -1)
        joi.default(port);
    else
        desc += 'Default Port [' + port + ']';
    return joi.description(desc);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQStCO0FBSy9CLElBQVksTUFJWDtBQUpELFdBQVksTUFBTTtJQUVkLDhDQUFjLENBQUE7SUFDZCx5Q0FBYSxDQUFBO0FBQ2pCLENBQUMsRUFKVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFJakI7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLE9BQWdCLE1BQU0sQ0FBQyxTQUFTLEVBQUUsRUFBRTtJQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUU1QyxJQUFJLElBQUksR0FBRyxpRkFBaUYsQ0FBQztJQUM3RixFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDWCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLElBQUk7UUFDQSxJQUFJLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUUxQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQVMsQ0FBQztBQUN6QyxDQUFDLENBQUEifQ==