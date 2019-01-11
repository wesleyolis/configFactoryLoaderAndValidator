"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("./joi-x");
const _ = require("lodash");
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
var AuthType;
(function (AuthType) {
    AuthType["password"] = "password";
    AuthType["publicKey"] = "publicKey";
    AuthType["any"] = "any";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
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
exports.authPassword = JoiX.object().keys({
    type: JoiX.kind(AuthType.password),
    password: JoiX.string().required()
}).required();
exports.authPublicKey = JoiX.object().keys({
    type: JoiX.kind(AuthType.publicKey),
    phrase: JoiX.string().required(),
    passKey: JoiX.string().required()
}).required();
exports.authAny = JoiX.object().keys({
    type: JoiX.kind(AuthType.any),
    password: JoiX.string().required(),
    phrase: JoiX.string().required(),
    passKey: JoiX.string().required()
}).required();
function isAuthPassword(x) {
    return x.type === AuthType.password;
}
exports.isAuthPassword = isAuthPassword;
function isAuthPublicKey(x) {
    return x.type === AuthType.publicKey;
}
exports.isAuthPublicKey = isAuthPublicKey;
function isAuthAny(x) {
    return x.type === AuthType.any;
}
exports.isAuthAny = isAuthAny;
exports.authPasswordOnly = () => {
    return _.cloneDeep(exports.authPassword);
};
exports.authentication = () => {
    return JoiX.alternatives().try([exports.authPassword, exports.authPublicKey, exports.authAny]).required();
};
exports.credentials = () => {
    return JoiX.object().keys({
        username: JoiX.string().required(),
        auth: exports.authentication()
    });
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
const test = exports.credentials();
let impl = {
    username: "sdfsdf",
    auth: {
        type: AuthType.password,
        password: "sdf"
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQStCO0FBRS9CLDRCQUEyQjtBQU8zQixJQUFZLE1BS1g7QUFMRCxXQUFZLE1BQU07SUFFZCw4Q0FBYyxDQUFBO0lBQ2QseUNBQWEsQ0FBQTtJQUNiLG9DQUFTLENBQUE7QUFDYixDQUFDLEVBTFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBS2pCO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBQyxPQUFnQixNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFFckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUMsSUFBSSxJQUFJLEdBQUcsaUZBQWlGLENBQUM7SUFDN0YsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQ1YsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFFbEIsSUFBSSxJQUFJLGdCQUFnQixHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFFMUMsT0FBTyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUcsd0VBQXdFO0FBQzVHLENBQUMsQ0FBQTtBQUVELElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUVoQixpQ0FBcUIsQ0FBQTtJQUNyQixtQ0FBdUIsQ0FBQTtJQUN2Qix1QkFBVyxDQUFBO0FBQ2YsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBRUQsSUFBWSxRQUlYO0FBSkQsV0FBWSxRQUFRO0lBRWhCLG1DQUF1QixDQUFBO0lBQ3ZCLCtCQUFtQixDQUFBO0FBQ3ZCLENBQUMsRUFKVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUluQjtBQVFZLFFBQUEsUUFBUSxHQUFHLENBQUMsV0FBc0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFO0lBQ2pFLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQztRQUN0QixNQUFNLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtRQUNqQyxJQUFJLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGdGQUFnRixDQUFDO0tBQy9KLENBQUMsQ0FBQyxXQUFXLENBQUMsb0ZBQW9GLENBQUMsQ0FBQztBQUN6RyxDQUFDLENBQUE7QUFFWSxRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQUksRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDbkMsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDdEMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBRUEsUUFBQSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDL0M7SUFDSSxJQUFJLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQ3BDLE1BQU0sRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2pDLE9BQU8sRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ3JDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVELFFBQUEsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDdEMsSUFBSSxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUM5QixRQUFRLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNuQyxNQUFNLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtJQUNqQyxPQUFPLEVBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRTtDQUNyQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFHZCxTQUFnQixjQUFjLENBQUMsQ0FBYTtJQUV4QyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUN4QyxDQUFDO0FBSEQsd0NBR0M7QUFFRCxTQUFnQixlQUFlLENBQUMsQ0FBYTtJQUV6QyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLFNBQVMsQ0FBQztBQUN6QyxDQUFDO0FBSEQsMENBR0M7QUFFRCxTQUFnQixTQUFTLENBQUMsQ0FBYTtJQUVuQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQztBQUNuQyxDQUFDO0FBSEQsOEJBR0M7QUFFWSxRQUFBLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtJQUVqQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsb0JBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVXLFFBQUEsY0FBYyxHQUFHLEdBQUcsRUFBRTtJQUUvQixPQUFPLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxvQkFBWSxFQUFFLHFCQUFhLEVBQUUsZUFBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0RixDQUFDLENBQUE7QUFFWSxRQUFBLFdBQVcsR0FBRyxHQUFHLEVBQUU7SUFFNUIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsRUFBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO1FBQ25DLElBQUksRUFBRyxzQkFBYyxFQUFFO0tBQzFCLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQTtBQUVZLFFBQUEscUJBQXFCLEdBQUcsR0FBRyxFQUFFO0lBRXRDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3pCLENBQUMsQ0FBQTtBQUVZLFFBQUEsU0FBUyxHQUFHLEdBQUcsRUFBRTtJQUUxQixPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFFWSxRQUFBLEdBQUcsR0FBRyxHQUFHLEVBQUU7SUFFcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDeEIsQ0FBQyxDQUFBO0FBR0QsTUFBTSxJQUFJLEdBQUcsbUJBQVcsRUFBRSxDQUFDO0FBSTNCLElBQUksSUFBSSxHQUFVO0lBQ2QsUUFBUSxFQUFHLFFBQVE7SUFDbkIsSUFBSSxFQUFHO1FBQ0gsSUFBSSxFQUFHLFFBQVEsQ0FBQyxRQUFRO1FBQ3hCLFFBQVEsRUFBRyxLQUFLO0tBQ25CO0NBQ0osQ0FBQSJ9