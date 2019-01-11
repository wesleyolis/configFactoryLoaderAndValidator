"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function injectConfig(rawConfig, pathInSchema, value) {
    const keys = pathInSchema.split('.');
    let parentConfig = rawConfig;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        parentConfig = parentConfig[key];
        if (parentConfig == undefined) {
            parentConfig[key] = {};
            parentConfig = parentConfig[key];
        }
    }
    const insertKey = keys[keys.length - 1];
    delete parentConfig[insertKey];
    Object.defineProperty(parentConfig, insertKey, { get: () => value, configurable: true });
}
exports.injectConfig = injectConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0LWxlZ2FjeS1jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnLWxlZ2FjeS1nZW4vaW5qZWN0LWxlZ2FjeS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxTQUFnQixZQUFZLENBQUMsU0FBZSxFQUFFLFlBQXFCLEVBQUUsS0FBVztJQUU1RSxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXJDLElBQUksWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUU3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQ3hDO1FBQ0ksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFlBQVksR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxZQUFZLElBQUksU0FBUyxFQUM3QjtZQUNJLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsWUFBWSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQztLQUNKO0lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFeEMsT0FBTyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFL0IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLEVBQUMsR0FBRyxFQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUcsSUFBSSxFQUFDLENBQUUsQ0FBQztBQUM5RixDQUFDO0FBdEJELG9DQXNCQyJ9