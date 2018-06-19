"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("../../../joi-x");
const JoiV = require("../../../joi-x-validators");
exports.factoryName = "Client";
exports.configSchema = JoiX.object().keys({
    host: JoiX.string().required(),
    port: JoiV.port(JoiV.DPorts.sftp).required(),
    credentials: JoiX.object().keys({
        username: JoiX.string().required(),
        password: JoiV.password(JoiV.PassType.encrypt).required()
    })
}).required();
/*
host: config.hyphenSftpHost,
port: config.hyphenSftpPort,
username: config.hyphenSftpUser,
privateKey: require('fs').readFileSync(config.hyphenSftpPrivateKey)
}
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvc2Z0cC9jbGllbnQvY29uZmlnLXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFzQztBQUN0QyxrREFBaUQ7QUFFcEMsUUFBQSxXQUFXLEdBQVksUUFBUSxDQUFDO0FBSWhDLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsSUFBSSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDL0IsSUFBSSxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDN0MsV0FBVyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsUUFBUSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7UUFDbkMsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUU7S0FDN0QsQ0FBQztDQUNMLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUVkOzs7Ozs7RUFNRSJ9