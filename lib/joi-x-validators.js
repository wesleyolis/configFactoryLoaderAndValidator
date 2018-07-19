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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pLXgtdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9qb2kteC12YWxpZGF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0NBQStCO0FBRS9CLDRCQUEyQjtBQU0zQixJQUFZLE1BS1g7QUFMRCxXQUFZLE1BQU07SUFFZCw4Q0FBYyxDQUFBO0lBQ2QseUNBQWEsQ0FBQTtJQUNiLG9DQUFTLENBQUE7QUFDYixDQUFDLEVBTFcsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBS2pCO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBQyxPQUFnQixNQUFNLENBQUMsU0FBUyxFQUFFLEVBQUU7SUFFckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUMsSUFBSSxJQUFJLEdBQUcsaUZBQWlGLENBQUM7SUFDN0YsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1gsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixJQUFJO1FBQ0EsSUFBSSxJQUFJLGdCQUFnQixHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFFMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRyx3RUFBd0U7QUFDNUcsQ0FBQyxDQUFBO0FBRUQsSUFBWSxRQUtYO0FBTEQsV0FBWSxRQUFRO0lBRWhCLGlDQUFxQixDQUFBO0lBQ3JCLG1DQUF1QixDQUFBO0lBQ3ZCLHVCQUFXLENBQUE7QUFDZixDQUFDLEVBTFcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFLbkI7QUFFRCxJQUFZLFFBSVg7QUFKRCxXQUFZLFFBQVE7SUFFaEIsbUNBQXVCLENBQUE7SUFDdkIsK0JBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQUpXLFFBQVEs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