"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
const promisify = Promisify(function (paramA, callback) { });
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
export function PromisifyWithExecResult(propA: any, propB: any = undefined): (A :any, execR : {execR: any} | undefined) => Bluebird<R> {

    return new Bluebird(function(resolve: any, reject : any){

            if (propB == undefined)
            {
               let func : (args: any []) => any;
                 
                    return ( jj: any [], execR : {execR: any} | undefined = undefined) : Bluebird<R> => {
                        new Bluebird(function(resolve, reject) {
                            
                            // the problem is that we now have an additional parameter, which I now need to detect
                            // ontop of a callback., basically if the last argument is unein

                            // the last arguments could be a Function, or callback undefined, then their could be confusion,
                            // I will have to check the following.

                            const lastArg = arguments.length - 1;
                            const lastArgUndefined = lastArg >= 0 && arguments[lastArg] === undefined;

                            

                            let args : any [] = [];
                            let i = arguments.length - 1;
                            while(i--)
                                args.push(arguments[i]);
                            
                            args.push(resolve);
                            
                            try {

                                let result = func.call(args, resolve);
                                if(execR !== undefined)
                                    execR.execR = result;

                            } catch(e) {
                                reject(e);
                            }
                        }
                    }
            
            }
        }).;

        // I will have to unravel BlueBird.promisify, so that I do that step manauall my self..
    });
*/
// const testsCallBack = {
// 	test : function (callback : (err : any, result : Inter) => void),
// 	paramA : function (ParamA : 1, callback : (err : any, result : 'AA') => void),
// 	paramB : function (ParamA : 1, ParamB : 2, callback : (err : any, result : 'BB') => void),
// 	paramC : function (ParamA : 1, ParamB : 2, ParamC : 3,  callback : (err : any, result : 'CC') => void),
// 	paramD : function (ParamA : 1, ParamB : 2, ParamC : 3, ParamD : 4, callback : (err : any, result : 'DD') => void)
// }
// interface Inter {
//     propA : string;
//     propB : number;
// }
// interface Overide {
//     overideA : string;
//     overideB : string;
// }
// // Still require the parameters.
// const test = Promisify(testsCallBack,'test');
// test();
// // Still require the parameters.
// const paramD = Promisify<Overide, typeof testsCallBack, 'paramD'>(testsCallBack,'paramD');
// paramD();
// // Still require the parameters.
// const paramC = Promisify<Overide, typeof testsCallBack.paramC>(testsCallBack.paramC);
// paramC().then((r) => {
//   r.overideB
// });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBcUJyQyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsVUFBUyxNQUFnQixFQUFFLFFBQXdELElBQUcsQ0FBQyxDQUFDLENBQUE7QUFvRHBILG1DQUFtQztBQUVuQywyQkFBMkI7QUFDM0IsbUJBQTBCLEtBQVUsRUFBRSxRQUFhLFNBQVM7SUFDeEQsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBRXJCLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDbEIsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQywyQ0FBMkM7U0FDbEY7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztLQUVKO1NBQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFFckIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztZQUN6QixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUUsQ0FBQztTQUMvRDthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1NBQzdEO0tBRUo7U0FBTTtRQUNILE1BQU0sS0FBSyxDQUFDLGNBQWMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO0tBQzNEO0FBQ0wsQ0FBQztBQXBCRCw4QkFvQkM7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUErQ0U7QUFFRiwwQkFBMEI7QUFDMUIscUVBQXFFO0FBQ3JFLGtGQUFrRjtBQUNsRiw4RkFBOEY7QUFDOUYsMkdBQTJHO0FBQzNHLHFIQUFxSDtBQUNySCxJQUFJO0FBRUosb0JBQW9CO0FBQ3BCLHNCQUFzQjtBQUN0QixzQkFBc0I7QUFDdEIsSUFBSTtBQUVKLHNCQUFzQjtBQUN0Qix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLElBQUk7QUFFSixtQ0FBbUM7QUFDbkMsZ0RBQWdEO0FBQ2hELFVBQVU7QUFFVixtQ0FBbUM7QUFDbkMsNkZBQTZGO0FBQzdGLFlBQVk7QUFFWixtQ0FBbUM7QUFDbkMsd0ZBQXdGO0FBQ3hGLHlCQUF5QjtBQUN6QixlQUFlO0FBQ2YsTUFBTSJ9