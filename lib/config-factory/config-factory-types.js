"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigFactoryClass;
(function (ConfigFactoryClass) {
    ConfigFactoryClass[ConfigFactoryClass["Factory"] = 0] = "Factory";
    ConfigFactoryClass[ConfigFactoryClass["Module"] = 1] = "Module";
    ConfigFactoryClass[ConfigFactoryClass["Service"] = 2] = "Service";
})(ConfigFactoryClass = exports.ConfigFactoryClass || (exports.ConfigFactoryClass = {}));
var ConfigFactoryTypes;
(function (ConfigFactoryTypes) {
    ConfigFactoryTypes[ConfigFactoryTypes["Vanilla"] = 0] = "Vanilla";
    ConfigFactoryTypes[ConfigFactoryTypes["Mock"] = 1] = "Mock";
})(ConfigFactoryTypes = exports.ConfigFactoryTypes || (exports.ConfigFactoryTypes = {}));
exports.ConfigFactoryTypesPrefix = {
    "": ConfigFactoryTypes.Vanilla,
    "Mock": ConfigFactoryTypes.Mock
};
exports.ConfigFactoryTypesPrefixKeys = Object.keys(exports.ConfigFactoryTypesPrefix);
exports.ConfigFactoryClassStem = {
    "Factory": ConfigFactoryClass.Factory,
    "Module": ConfigFactoryClass.Module,
    "Service": ConfigFactoryClass.Service
};
exports.ConfigFactoryClassStemKeys = Object.keys(exports.ConfigFactoryClassStem);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3RvcnktdHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvY29uZmlnLWZhY3RvcnktdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxJQUFZLGtCQUlYO0FBSkQsV0FBWSxrQkFBa0I7SUFDMUIsaUVBQU8sQ0FBQTtJQUNQLCtEQUFNLENBQUE7SUFDTixpRUFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUpXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSTdCO0FBRUQsSUFBWSxrQkFJWDtBQUpELFdBQVksa0JBQWtCO0lBRTFCLGlFQUFPLENBQUE7SUFDUCwyREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUpXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSTdCO0FBRVksUUFBQSx3QkFBd0IsR0FBOEM7SUFDL0UsRUFBRSxFQUFHLGtCQUFrQixDQUFDLE9BQU87SUFDL0IsTUFBTSxFQUFHLGtCQUFrQixDQUFDLElBQUk7Q0FDbkMsQ0FBQTtBQUVZLFFBQUEsNEJBQTRCLEdBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBd0IsQ0FBQyxDQUFDO0FBRWpGLFFBQUEsc0JBQXNCLEdBQThDO0lBQzdFLFNBQVMsRUFBRyxrQkFBa0IsQ0FBQyxPQUFPO0lBQ3RDLFFBQVEsRUFBRyxrQkFBa0IsQ0FBQyxNQUFNO0lBQ3BDLFNBQVMsRUFBRyxrQkFBa0IsQ0FBQyxPQUFPO0NBQ3pDLENBQUE7QUFFWSxRQUFBLDBCQUEwQixHQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQXNCLENBQUMsQ0FBQyJ9