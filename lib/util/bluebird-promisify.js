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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBc0VyQyxtQ0FBbUM7QUFHbkMsMkJBQTJCO0FBQzNCLG1CQUEwQixLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUVyQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2xCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ2xGO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtTQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDekIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUM3RDtLQUVKO1NBQU07UUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztLQUMzRDtBQUNMLENBQUM7QUFwQkQsOEJBb0JDO0FBMkVELHlCQUFnQyxLQUFXLEVBQUUsUUFBYyxTQUFTO0lBRWhFLHlCQUEwQixJQUFlLEVBQUUsTUFBWTtRQUVuRCxJQUFJLElBQUksR0FBcUIsTUFBTSxDQUFDO1FBQ3BDLElBQUksNkJBQTZCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVoRCxPQUFPLFVBQVUsT0FBNEM7WUFFekQsSUFBSSxhQUFhLEdBQVMsU0FBUyxDQUFDO1lBRXBDLElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRW5DLElBQUksNkJBQTZCLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQ3JFO2dCQUNJLGFBQWEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFFRCxJQUFJLElBQUksR0FBWSxFQUFFLENBQUM7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFNUIsT0FBTyxJQUFJLFFBQVEsQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNO2dCQUV4QyxJQUFJO29CQUVBLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQztvQkFFdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQVMsRUFBRSxNQUFXO3dCQUV0QyxJQUFHLEdBQUc7NEJBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBOzs0QkFFbEIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN4QixDQUFDLENBQUMsQ0FBQztvQkFFSCxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBSSxJQUFJLENBQUMsQ0FBQztvQkFFbkMsSUFBRyxhQUFhO3dCQUNaLGFBQWEsQ0FBQyxlQUFlLENBQUMsR0FBRyxNQUFNLENBQUM7aUJBRS9DO2dCQUFDLE9BQU0sQ0FBQyxFQUFFO29CQUNQLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDYjtZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELElBQUksS0FBSyxLQUFLLFNBQVMsRUFDdkI7UUFDSSxPQUFPLGVBQWUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDNUM7U0FDSSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDckI7UUFDSSxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0M7O1FBRUcsTUFBTSxLQUFLLENBQUMsY0FBYyxLQUFLLHVCQUF1QixDQUFDLENBQUM7QUFDaEUsQ0FBQztBQTNERCwwQ0EyREMifQ==