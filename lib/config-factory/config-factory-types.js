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
exports.ConfigFactoryTypesPrefixStr = [{ key: ConfigFactoryTypes.Vanilla, value: "" },
    { key: ConfigFactoryTypes.Mock, value: "Mock" }
].reduce((acc, item) => acc[item.key] = item.value, {});
exports.ConfigFactoryTypesPrefixKeys = Object.keys(exports.ConfigFactoryTypesPrefix);
exports.ConfigFactoryClassStem = {
    "Factory": ConfigFactoryClass.Factory,
    "Module": ConfigFactoryClass.Module,
    "Service": ConfigFactoryClass.Service
};
exports.ConfigFactoryClassStemKeys = Object.keys(exports.ConfigFactoryClassStem);
exports.ConfigFactoryClassStemStr = [{ key: ConfigFactoryClass.Factory, value: "Factory" },
    { key: ConfigFactoryClass.Module, value: "Module" },
    { key: ConfigFactoryClass.Service, value: "Service" }
]
    .reduce((acc, item) => acc[item.key] = item.value, {});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3RvcnktdHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWZhY3RvcnkvY29uZmlnLWZhY3RvcnktdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFZLGtCQUlYO0FBSkQsV0FBWSxrQkFBa0I7SUFDMUIsaUVBQVcsQ0FBQTtJQUNYLCtEQUFNLENBQUE7SUFDTixpRUFBTyxDQUFBO0FBQ1gsQ0FBQyxFQUpXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSTdCO0FBRUQsSUFBWSxrQkFJWDtBQUpELFdBQVksa0JBQWtCO0lBRTFCLGlFQUFPLENBQUE7SUFDUCwyREFBSSxDQUFBO0FBQ1IsQ0FBQyxFQUpXLGtCQUFrQixHQUFsQiwwQkFBa0IsS0FBbEIsMEJBQWtCLFFBSTdCO0FBRVksUUFBQSx3QkFBd0IsR0FBOEM7SUFDL0UsRUFBRSxFQUFHLGtCQUFrQixDQUFDLE9BQU87SUFDL0IsTUFBTSxFQUFHLGtCQUFrQixDQUFDLElBQUk7Q0FDbkMsQ0FBQTtBQUVZLFFBQUEsMkJBQTJCLEdBQWtDLENBQUMsRUFBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRyxFQUFFLEVBQUM7SUFDeEgsRUFBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRyxNQUFNLEVBQUM7Q0FDN0MsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUE4QixFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRXRFLFFBQUEsNEJBQTRCLEdBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBd0IsQ0FBQyxDQUFDO0FBRWpGLFFBQUEsc0JBQXNCLEdBQThDO0lBQzdFLFNBQVMsRUFBRyxrQkFBa0IsQ0FBQyxPQUFPO0lBQ3RDLFFBQVEsRUFBRyxrQkFBa0IsQ0FBQyxNQUFNO0lBQ3BDLFNBQVMsRUFBRyxrQkFBa0IsQ0FBQyxPQUFPO0NBQ3pDLENBQUE7QUFFWSxRQUFBLDBCQUEwQixHQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsOEJBQXNCLENBQUMsQ0FBQztBQUU3RSxRQUFBLHlCQUF5QixHQUFrQyxDQUFDLEVBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFDO0lBQzdILEVBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUcsUUFBUSxFQUFDO0lBQ2xELEVBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUcsU0FBUyxFQUFDO0NBQ25EO0tBQ0EsTUFBTSxDQUFDLENBQUMsR0FBOEIsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyJ9