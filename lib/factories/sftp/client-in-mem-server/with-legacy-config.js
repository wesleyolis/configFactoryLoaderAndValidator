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
        };
    }
}
exports.SftpInMemoryClientWrapperWithLegacy = SftpInMemoryClientWrapperWithLegacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1sZWdhY3ktY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZhY3Rvcmllcy9zZnRwL2NsaWVudC1pbi1tZW0tc2VydmVyL3dpdGgtbGVnYWN5LWNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUF3RDtBQUd4RCwwRkFBK0U7QUFNL0UscUJBQTRCLFNBQWtCO0lBRTFDLE9BQU8sSUFBSSxtQ0FBbUMsQ0FBTSxTQUFTLEVBQUUsU0FBUyxDQUErQyxDQUFBO0FBQzNILENBQUM7QUFIRCxrQ0FHQztBQUVELHlDQUE0RSxTQUFRLGlDQUEwQztJQUkxSCxZQUFZLFFBQVksRUFBRSxTQUFrQjtRQUV4QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLFNBQWtCO1lBRTVDLE1BQU0sWUFBWSxHQUF1QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFaEUsbUNBQVksQ0FBQyxTQUFTLEVBQUMsd0JBQXdCLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BFLGtGQUFrRjtZQUNsRiwrRUFBK0U7WUFDL0UsbUNBQVksQ0FBQyxTQUFTLEVBQUMsd0JBQXdCLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BFLG1DQUFZLENBQUMsU0FBUyxFQUFDLDhCQUE4QixFQUFFLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoRixtQ0FBWSxDQUFDLFNBQVMsRUFBQyx3QkFBd0IsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNKO0FBcEJELGtGQW9CQyJ9