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
        return (execute) => {
            let self = object;
            const lastArg = arguments.length - 1;
            const lastArgUndefined = lastArg >= 0 && arguments[lastArg] === undefined;
            let args = [];
            let i = arguments.length - 1;
            while (i--)
                args.push(arguments[i]);
            //args.push(resolve);
            return new Bluebird(function (resolve, reject) {
                try {
                    let result = undefined;
                    if (self)
                        result = func.call(self, ...args, resolve);
                    else
                        result = func(...args, resolve);
                    if (arguments[lastArg])
                        arguments[lastArg]['executeResult'] = result;
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
        return generatePromise(propB, propA[propB]);
    }
    else
        throw Error(`Error key [${propB}] not found on object`);
}
exports.PromisifyReturn = PromisifyReturn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBc0VyQyxtQ0FBbUM7QUFHbkMsMkJBQTJCO0FBQzNCLG1CQUEwQixLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUVyQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2xCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ2xGO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtTQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDekIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUM3RDtLQUVKO1NBQU07UUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztLQUMzRDtBQUNMLENBQUM7QUFwQkQsOEJBb0JDO0FBa0JEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE4QkU7QUFHRix5QkFBZ0MsS0FBVyxFQUFFLFFBQWMsU0FBUztJQUVoRSx5QkFBMEIsSUFBZSxFQUFFLE1BQVk7UUFFbkQsT0FBTyxDQUFDLE9BQTRDLEVBQWtCLEVBQUU7WUFFcEUsSUFBSSxJQUFJLEdBQXFCLE1BQU0sQ0FBQztZQUVwQyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNyQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFNBQVMsQ0FBQztZQUUxRSxJQUFJLElBQUksR0FBWSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDN0IsT0FBTSxDQUFDLEVBQUU7Z0JBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixxQkFBcUI7WUFFckIsT0FBTyxJQUFJLFFBQVEsQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNO2dCQUV4QyxJQUFJO29CQUNBLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFFdkIsSUFBSSxJQUFJO3dCQUNKLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzs7d0JBRTNDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRXBDLElBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQzt3QkFDakIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFFcEQ7Z0JBQUMsT0FBTSxDQUFDLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUN2QjtRQUNJLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM1QztTQUNJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNyQjtRQUNJLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUMvQzs7UUFFRyxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBaERELDBDQWdEQyJ9