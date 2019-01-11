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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBc0VyQyxtQ0FBbUM7QUFHbkMsMkJBQTJCO0FBQzNCLFNBQWdCLFNBQVMsQ0FBQyxLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUVyQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2xCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ2xGO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtTQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDekIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUM3RDtLQUVKO1NBQU07UUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztLQUMzRDtBQUNMLENBQUM7QUFwQkQsOEJBb0JDO0FBMkVELFNBQWdCLGVBQWUsQ0FBQyxLQUFXLEVBQUUsUUFBYyxTQUFTO0lBRWhFLFNBQVMsZUFBZSxDQUFFLElBQWUsRUFBRSxNQUFZO1FBRW5ELElBQUksSUFBSSxHQUFxQixNQUFNLENBQUM7UUFDcEMsSUFBSSw2QkFBNkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRWhELE9BQU8sVUFBVSxPQUE0QztZQUV6RCxJQUFJLGFBQWEsR0FBUyxTQUFTLENBQUM7WUFFcEMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFFbkMsSUFBSSw2QkFBNkIsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFDckU7Z0JBQ0ksYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUVELElBQUksSUFBSSxHQUFZLEVBQUUsQ0FBQztZQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksT0FBTyxFQUFFLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1QixPQUFPLElBQUksUUFBUSxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBRXhDLElBQUk7b0JBRUEsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDO29CQUV2QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBUyxFQUFFLE1BQVc7d0JBRXRDLElBQUcsR0FBRzs0QkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7OzRCQUVsQixPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3hCLENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFJLElBQUksQ0FBQyxDQUFDO29CQUVuQyxJQUFHLGFBQWE7d0JBQ1osYUFBYSxDQUFDLGVBQWUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFFL0M7Z0JBQUMsT0FBTSxDQUFDLEVBQUU7b0JBQ1AsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUN2QjtRQUNJLE9BQU8sZUFBZSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM1QztTQUNJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUNyQjtRQUNJLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUMvQzs7UUFFRyxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBM0RELDBDQTJEQyJ9