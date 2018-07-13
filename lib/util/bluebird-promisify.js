"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bluebird = require("bluebird");
/* tslint:enable:max-line-length */
// tslint:disable-next-line
function Promisify(propA, propB = undefined) {
    if (propB === undefined) {
        return Bluebird.promisify(propA);
    }
    else if (propA[propB]) {
        return Bluebird.promisify(propA[propB], { context: propA });
    }
    else {
        throw Error(`Error key [${propB}] not found on object`);
    }
}
exports.Promisify = Promisify;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1ZWJpcmQtcHJvbWlzaWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWwvYmx1ZWJpcmQtcHJvbWlzaWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQXFDO0FBdURyQyxtQ0FBbUM7QUFFbkMsMkJBQTJCO0FBQzNCLG1CQUEwQixLQUFVLEVBQUUsUUFBYSxTQUFTO0lBQ3hELElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUNyQixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7U0FBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyQixPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7S0FDN0Q7U0FBTTtRQUNILE1BQU0sS0FBSyxDQUFDLGNBQWMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO0tBQzNEO0FBQ0wsQ0FBQztBQVJELDhCQVFDO0FBRUQsMEJBQTBCO0FBQzFCLHFFQUFxRTtBQUNyRSxrRkFBa0Y7QUFDbEYsOEZBQThGO0FBQzlGLDJHQUEyRztBQUMzRyxxSEFBcUg7QUFDckgsSUFBSTtBQUVKLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCLElBQUk7QUFFSixzQkFBc0I7QUFDdEIseUJBQXlCO0FBQ3pCLHlCQUF5QjtBQUN6QixJQUFJO0FBRUosbUNBQW1DO0FBQ25DLGdEQUFnRDtBQUNoRCxVQUFVO0FBRVYsbUNBQW1DO0FBQ25DLDZGQUE2RjtBQUM3RixZQUFZO0FBRVosbUNBQW1DO0FBQ25DLHdGQUF3RjtBQUN4Rix5QkFBeUI7QUFDekIsZUFBZTtBQUNmLE1BQU0ifQ==