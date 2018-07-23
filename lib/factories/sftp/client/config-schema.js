"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("../../../joi-x");
const JoiV = require("../../../joi-x-validators");
exports.factoryName = "Client";
exports.configSchema = JoiX.object().keys({
    host: JoiX.string().required(),
    port: JoiV.port(JoiV.DPorts.sftp).required(),
    credentials: JoiV.credentials().required()
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9mYWN0b3JpZXMvc2Z0cC9jbGllbnQvY29uZmlnLXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFzQztBQUN0QyxrREFBaUQ7QUFFcEMsUUFBQSxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBSXZCLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsSUFBSSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDL0IsSUFBSSxFQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUU7SUFDN0MsV0FBVyxFQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDOUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDIn0=