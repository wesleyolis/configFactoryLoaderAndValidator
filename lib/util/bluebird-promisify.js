"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
/* tslint:enable:max-line-length */
// tslint:disable-next-line
function Promisify(propA, propB = undefined) {
    if (propB === undefined) {
        if (propA.length == 1) {
            return Bluebird.promisify(propA)(); // require to output the results if needed.
        }
        else {
            return Bluebird.promisify(propA);
        }
    }
    else if (propA[propB]) {
        if (propA[propB].length == 1) {
            return Bluebird.promisify(propA[propB], { context: propA })();
        }
        else {
            return Bluebird.promisify(propA[propB], { context: propA });
        }
    }
    else {
        throw Error(`Error key [${propB}] not found on object`);
    }
}
exports.Promisify = Promisify;
/*
export function PromisifyAll<O extends {[index : string] : any}>(object : O) : PromisifyObject<O>
{
    const keys = Object.keys(object);

    let proto =  Object.getPrototypeOf(object);

    while (proto && proto.__proto__)
    {
        const names = Object.getOwnPropertyNames(proto);
        names.forEach(name => {
            if (name !== 'constructor')
                keys.push(name);
        });

        proto = Object.getPrototypeOf(proto);
    }

    let promisifyedObject : {[index : string] : any} = {};

    keys.forEach(function(key) {

        if (typeof object[key] === 'function')
            promisifyedObject[key] = Bluebird.promisify(object[key], {context: object});
        else
            promisifyedObject[key] = object[key];
    });

    return promisifyedObject as any as PromisifyObject<O>;
}
*/
function PromisifyReturn(propA, propB = undefined) {
    function generatePromise(func, object) {
        let self = object;
        let orignalArgsWithCallBackLength = func.length;
        return function (execute) {
            let executeResult = undefined;
            let lastArg = arguments.length - 1;
            if (orignalArgsWithCallBackLength == arguments.length && lastArg > -1) {
                executeResult = arguments[lastArg];
                lastArg--;
            }
            let args = [];
            for (let i = 0; i <= lastArg; i++)
                args.push(arguments[i]);
            // let i = lastArg;
            // while(i >= 0)
            // {
            //     args.push(arguments[i]);
            //     i--;
            // }
            return new Bluebird(function (resolve, reject) {
                try {
                    let result = undefined;
                    args.push(function (err, result) {
                        if (err)
                            reject(Error(err));
                        else
                            resolve(result);
                    });
                    result = func.call(self, ...args);
                    if (executeResult)
                        executeResult['executeResult'] = result;
                }
                catch (e) {
                    reject(e);
                }
            });
        };
    }
    if (propB === undefined) {
        return generatePromise(propA, undefined);
    }
    else if (propA[propB]) {
        return generatePromise(propA[propB], propA);
    }
    else
        throw Error(`Error key [${propB}] not found on object`);
}
exports.PromisifyReturn = PromisifyReturn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBc0VyQyxtQ0FBbUM7QUFHbkMsMkJBQTJCO0FBQzNCLG1CQUEwQixLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUVyQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2xCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ2xGO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtTQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDekIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUM3RDtLQUVKO1NBQU07UUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztLQUMzRDtBQUNMLENBQUM7QUFwQkQsOEJBb0JDO0FBa0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE4QkU7QUFHRix5QkFBZ0MsS0FBVyxFQUFFLFFBQWMsU0FBUztJQUVoRSx5QkFBMEIsSUFBZSxFQUFFLE1BQVk7UUFFbkQsSUFBSSxJQUFJLEdBQXFCLE1BQU0sQ0FBQztRQUNwQyxJQUFJLDZCQUE2QixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFaEQsT0FBTyxVQUFVLE9BQTRDO1lBRXpELElBQUksYUFBYSxHQUFTLFNBQVMsQ0FBQztZQUVwQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUVuQyxJQUFJLDZCQUE2QixJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUNyRTtnQkFDSSxhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBRUQsSUFBSSxJQUFJLEdBQVksRUFBRSxDQUFDO1lBQ3ZCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLG1CQUFtQjtZQUNuQixnQkFBZ0I7WUFDaEIsSUFBSTtZQUNKLCtCQUErQjtZQUMvQixXQUFXO1lBQ1gsSUFBSTtZQUVKLE9BQU8sSUFBSSxRQUFRLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtnQkFFeEMsSUFBSTtvQkFFQSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUM7b0JBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFTLEVBQUUsTUFBVzt3QkFFdEMsSUFBRyxHQUFHOzRCQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTs7NEJBRWxCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUksSUFBSSxDQUFDLENBQUM7b0JBRW5DLElBQUcsYUFBYTt3QkFDWixhQUFhLENBQUMsZUFBZSxDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUUvQztnQkFBQyxPQUFNLENBQUMsRUFBRTtvQkFDUCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2I7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFRCxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQ3ZCO1FBQ0ksT0FBTyxlQUFlLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzVDO1NBQ0ksSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQ3JCO1FBQ0ksT0FBTyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQy9DOztRQUVHLE1BQU0sS0FBSyxDQUFDLGNBQWMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFsRUQsMENBa0VDIn0=