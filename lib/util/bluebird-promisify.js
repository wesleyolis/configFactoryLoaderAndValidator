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
export function PromisifyReturn(propA : any, propB : any = undefined) : (...args : any[]) => Bluebird<any>
{
    function generatePromise (func : Function, object : any) : (...args : any[]) => Bluebird<any>
    {
        return (execute : {[index:string] : any} | undefined) : Bluebird<any> => {
       
            return new Bluebird(function(resolve, reject) {
    
                let self : any | undefined = object;
                
                const lastArg = arguments.length - 1;
                const lastArgUndefined = lastArg >= 0 && arguments[lastArg] === undefined;
    
                let args : any [] = [];
                let i = arguments.length - 1;
                while(i--)
                    args.push(arguments[i]);
                
                //args.push(resolve);
                
                try {
                    let result = undefined;

                    if (self)
                        result = func.call(self, ...args, resolve);
                    else
                        result = func(...args, resolve);

                    if(arguments[lastArg])
                        arguments[lastArg]['executeResult'] = result;
    
                } catch(e) {
                    reject(e);
                }
            });
        };
    }

    if (propB === undefined)
    {
        return generatePromise(propA, undefined);
    }
    else if (propA[propB])
    {
        return generatePromise(propB, propA[propB]);
    }
    else
        throw Error(`Error key [${propB}] not found on object`);
}
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBcUVyQyxtQ0FBbUM7QUFHbkMsMkJBQTJCO0FBQzNCLG1CQUEwQixLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUVyQixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ2xCLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1NBQ2xGO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDcEM7S0FFSjtTQUFNLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDekIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFFLENBQUM7U0FDL0Q7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztTQUM3RDtLQUVKO1NBQU07UUFDSCxNQUFNLEtBQUssQ0FBQyxjQUFjLEtBQUssdUJBQXVCLENBQUMsQ0FBQztLQUMzRDtBQUNMLENBQUM7QUFwQkQsOEJBb0JDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBa0RFIn0=