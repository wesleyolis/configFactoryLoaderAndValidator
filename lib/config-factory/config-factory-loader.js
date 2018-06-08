"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error;
(function (Error) {
    Error["NoConfigFound"] = "NoFactoryFound";
    Error["AmbiguousMutiple"] = "AmbiguousMutiple";
})(Error || (Error = {}));
/*
export class ConfigFactoryLoader
{
    static async fromJsonGetConfigAndNewInstance<T extends IConfigFactory>(config : ConfigSettings) : Promise<T>
    {
        let {factory, fClass, type, settings} = config;

            let iConfigFactory : IConfigFactoryConstructor<T> = require(factory);

            let configFactoryInstance = NewConfigFactoryInstance(iConfigFactory)

            await configFactoryInstance.createAsync(settings);

            return configFactoryInstance;
        }
        else
        {
            throw new VError({name:Error.AmbiguousMutiple}, "Ambiguous Factories, mutiple entries matching 'Factory'");
        }
    }
}*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3RvcnktbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy1mYWN0b3J5LWxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLElBQUssS0FJSjtBQUpELFdBQUssS0FBSztJQUVOLHlDQUFnQyxDQUFBO0lBQ2hDLDhDQUFxQyxDQUFBO0FBQ3pDLENBQUMsRUFKSSxLQUFLLEtBQUwsS0FBSyxRQUlUO0FBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHIn0=