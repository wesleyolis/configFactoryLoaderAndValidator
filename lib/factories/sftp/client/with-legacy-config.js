"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const inject_legacy_config_1 = require("../../../config-legacy-gen/inject-legacy-config");
function NewInstance(injectKey) {
    return new SftpClientFactoryWithLegacy(undefined, injectKey);
}
exports.NewInstance = NewInstance;
class SftpClientFactoryWithLegacy extends index_1.SftpClient {
    constructor(settings, injectKey) {
        super(settings);
        this.injectConfig = function (rawConfig) {
            const legacyConfig = this.getLegacyConfig();
            inject_legacy_config_1.injectConfig(rawConfig, 'banking.hyphenSftpHost', legacyConfig.host);
            //injectConfig(rawConfig,'banking.notBackwardsCompatible', legacyConfig.password);
            //injectConfig(rawConfig,'banking.notBackwardCompatible', legacyConfig.phrase);
            inject_legacy_config_1.injectConfig(rawConfig, 'banking.hyphenSftpPort', legacyConfig.port);
            inject_legacy_config_1.injectConfig(rawConfig, 'banking.hyphenSftpPrivateKey', legacyConfig.privateKey);
            inject_legacy_config_1.injectConfig(rawConfig, 'banking.hyphenSftpUser', legacyConfig.username);
        };
    }
}
exports.SftpClientFactoryWithLegacy = SftpClientFactoryWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9zZnRwL2NsaWVudC93aXRoLWxlZ2FjeS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxtQ0FBeUM7QUFHekMsMEZBQStFO0FBTy9FLHFCQUE0QixTQUFrQjtJQUUxQyxPQUFPLElBQUksMkJBQTJCLENBQU0sU0FBUyxFQUFFLFNBQVMsQ0FBZ0MsQ0FBQTtBQUNwRyxDQUFDO0FBSEQsa0NBR0M7QUFFRCxpQ0FBb0UsU0FBUSxrQkFBMkI7SUFJbkcsWUFBWSxRQUFZLEVBQUUsU0FBa0I7UUFFeEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWhCLElBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxTQUFrQjtZQUU1QyxNQUFNLFlBQVksR0FBdUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBRWhFLG1DQUFZLENBQUMsU0FBUyxFQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRSxrRkFBa0Y7WUFDbEYsK0VBQStFO1lBQy9FLG1DQUFZLENBQUMsU0FBUyxFQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRSxtQ0FBWSxDQUFDLFNBQVMsRUFBQyw4QkFBOEIsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEYsbUNBQVksQ0FBQyxTQUFTLEVBQUMsd0JBQXdCLEVBQUUsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQXBCRCxrRUFvQkMifQ==