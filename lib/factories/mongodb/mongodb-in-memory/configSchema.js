"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
__export(require("../../../joi-x-validators"));
__export(require("../../../joi-x"));
exports.configSchema = JoiX.object().keys({
    port: JoiV.port(JoiV.DPorts.Mongo).required()
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItaW4tbWVtb3J5L2NvbmZpZ1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUFrRDtBQUNsRCx1Q0FBdUM7QUFFdkMsK0NBQTBDO0FBQzFDLG9DQUErQjtBQUlsQixRQUFBLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQzNDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFO0NBQzlDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyJ9