"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const inject_legacy_config_1 = require("../../../config-legacy-gen/inject-legacy-config");
function NewInstance(injectKey) {
    return new SftpInMemoryClientWrapperWithLegacy(undefined, injectKey);
}
exports.NewInstance = NewInstance;
class SftpInMemoryClientWrapperWithLegacy extends index_1.SftpInMemoryClientWrapper {
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
            inject_legacy_config_1.injectConfig(rawConfig, 'banking.hyphenSftpPassword', legacyConfig.password);
        };
    }
}
exports.SftpInMemoryClientWrapperWithLegacy = SftpInMemoryClientWrapperWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9zZnRwL2NsaWVudC1pbi1tZW0tc2VydmVyL3dpdGgtbGVnYWN5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUF3RDtBQUd4RCwwRkFBK0U7QUFPL0UsU0FBZ0IsV0FBVyxDQUFDLFNBQWtCO0lBRTFDLE9BQU8sSUFBSSxtQ0FBbUMsQ0FBTSxTQUFTLEVBQUUsU0FBUyxDQUErQyxDQUFBO0FBQzNILENBQUM7QUFIRCxrQ0FHQztBQUVELE1BQWEsbUNBQStELFNBQVEsaUNBQTBDO0lBSTFILFlBQVksUUFBWSxFQUFFLFNBQWtCO1FBRXhDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsU0FBa0I7WUFFNUMsTUFBTSxZQUFZLEdBQXVCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUVoRSxtQ0FBWSxDQUFDLFNBQVMsRUFBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsa0ZBQWtGO1lBQ2xGLCtFQUErRTtZQUMvRSxtQ0FBWSxDQUFDLFNBQVMsRUFBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsbUNBQVksQ0FBQyxTQUFTLEVBQUMsOEJBQThCLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hGLG1DQUFZLENBQUMsU0FBUyxFQUFDLHdCQUF3QixFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RSxtQ0FBWSxDQUFDLFNBQVMsRUFBQyw0QkFBNEIsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBckJELGtGQXFCQyJ9