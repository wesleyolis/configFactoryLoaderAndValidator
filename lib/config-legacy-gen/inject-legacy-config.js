"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function injectConfig(rawConfig, pathInSchema, value) {
    const keys = pathInSchema.split('.');
    let insertKey = rawConfig;
    keys.forEach((key) => {
        insertKey = rawConfig[key];
        if (insertKey == undefined)
            insertKey = rawConfig[key] = {};
    });
    insertKey = value;
}
exports.injectConfig = injectConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWxlZ2FjeS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWxlZ2FjeS1nZW4vaW5qZWN0LWxlZ2FjeS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQkFBNkIsU0FBZSxFQUFFLFlBQXFCLEVBQUUsS0FBVztJQUU1RSxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXJDLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUUxQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFFakIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUEsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO1lBQ3RCLFNBQVMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN0QixDQUFDO0FBZEQsb0NBY0MifQ==