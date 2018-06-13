"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const JoiV = require("../../../joi-x-validators");
const JoiX = require("../../../joi-x");
__export(require("../../../joi-x-validators"));
__export(require("../../../joi-x"));
const CFT = require("../../../config-factory/config-factory-types");
exports.factoryName = "InMemory";
exports.configSchema = JoiX.object().keys({
    class: JoiX.LiteralString([CFT.ConfigFactoryClass.service]),
    type: JoiX.LiteralString([CFT.ConfigFactoryTypes.mock]),
    port: JoiV.port(JoiV.DPorts.mongo).required()
}).required();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9tb25nb2RiL21vbmdvZGItaW4tbWVtb3J5L2NvbmZpZ1NjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUFrRDtBQUNsRCx1Q0FBdUM7QUFFdkMsK0NBQTBDO0FBQzFDLG9DQUErQjtBQUUvQixvRUFBbUU7QUFFdEQsUUFBQSxXQUFXLEdBQUcsVUFBVSxDQUFBO0FBSXhCLFFBQUEsWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsS0FBSyxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUQsSUFBSSxFQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUU7Q0FDOUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDIn0=