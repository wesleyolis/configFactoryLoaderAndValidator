import * as Bluebird from 'bluebird';
import { callbackify } from 'util';

/* tslint:disable:max-line-length */

export type CallBackType =  (err: any, result: any) => void;

export type RCallBack<T> = T extends (err: any, result: infer R) => void ? R : never;

export type ParamA<T> = T extends (A: infer P, ... args: any []) => void ? P : never;
export type ParamB<T> = T extends (A: any, B: infer P, ... args: any []) => void ? P : never;
export type ParamC<T> = T extends (A: any, B: any, C: infer P, ... args: any []) => void ? P : never;
export type ParamD<T> = T extends (A: any, B: any, C: any, D: infer P, ... args: any []) => void ? P : never;
export type ParamE<T> = T extends (A: any, B: any, C: any, D: any, E: infer P, ... args: any []) => void ? P : never;
export type ParamF<T> = T extends (A: any, B: any, C: any, D: any, E: any, F: infer P, ... args: any []) => void ? P : never;
export type ParamG<T> = T extends (A: any, B: any, C: any, D: any, E: any, F: any, G: infer P, ... args: any []) => void ? P : never;
export type ParamH<T> = T extends (A: any, B: any, C: any, D: any, E: any, F: any, G: any, H: infer P, ... args: any []) => void ? P : never;
export type ParamI<T> = T extends (A: any, B: any, C: any, D: any, E: any, F: any, G: any, H: any, I: infer P , ... args: any []) => void ? P : never;
export type Paramlast = (A: any, B: any, C: any, D: any, E: any, F: any, G: any, H: any, I: any , ... args: any []) => void;

export function Promisify<M>(propA: M)
 : ParamI<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>, H: ParamH<M>) => Bluebird<RCallBack<ParamI<M>>>
: ParamH<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>) => Bluebird<RCallBack<ParamH<M>>>
: ParamG<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>) => Bluebird<RCallBack<ParamG<M>>>
: ParamF<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>) => Bluebird<RCallBack<ParamF<M>>>
: ParamE<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>) => Bluebird<RCallBack<ParamE<M>>>
: ParamD<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>) => Bluebird<RCallBack<ParamD<M>>>
: ParamC<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>) => Bluebird<RCallBack<ParamC<M>>>
: ParamB<M> extends CallBackType ? (A: ParamA<M>) => Bluebird<RCallBack<ParamB<M>>>
: ParamA<M> extends CallBackType ? Bluebird<void>
: M extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';


export function Promisify<O extends {}, M extends keyof O>(propA: O , propB: M)
: ParamI<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>, H: ParamH<O[M]>) => Bluebird<RCallBack<ParamI<O[M]>>>
: ParamH<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>) => Bluebird<RCallBack<ParamH<O[M]>>>
: ParamG<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>) => Bluebird<RCallBack<ParamG<O[M]>>>
: ParamF<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>) => Bluebird<RCallBack<ParamF<O[M]>>>
: ParamE<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>) => Bluebird<RCallBack<ParamE<O[M]>>>
: ParamD<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>) => Bluebird<RCallBack<ParamD<O[M]>>>
: ParamC<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>) => Bluebird<RCallBack<ParamC<O[M]>>>
: ParamB<O[M]> extends CallBackType ? (A: ParamA<O[M]>) => Bluebird<RCallBack<ParamB<O[M]>>>
: ParamA<O[M]> extends CallBackType ? Bluebird<RCallBack<ParamA<O[M]>>>
: O[M] extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export function Promisify<R, M extends (...args: any []) => void>(propA: M)
: ParamI<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>, H: ParamE<M>) => Bluebird<R>
: ParamH<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>) => Bluebird<R>
: ParamG<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>) => Bluebird<R>
: ParamF<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>) => Bluebird<R>
: ParamE<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>) => Bluebird<R>
: ParamD<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>) => Bluebird<R>
: ParamC<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>) => Bluebird<R>
: ParamB<M> extends CallBackType ? (A: ParamA<M>) => Bluebird<R>
: ParamA<M> extends CallBackType ? Bluebird<R>
: M extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export function Promisify<R, O extends {}, M extends keyof O>(propA: O , propB: M)
: ParamI<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>, H: ParamH<O[M]>) => Bluebird<R>
: ParamH<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>) => Bluebird<R>
: ParamG<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>) => Bluebird<R>
: ParamF<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>) => Bluebird<R>
: ParamE<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>) => Bluebird<R>
: ParamD<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>) => Bluebird<R>
: ParamC<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>) => Bluebird<R>
: ParamB<O[M]> extends CallBackType ? (A: ParamA<O[M]>) => Bluebird<R>
: ParamA<O[M]> extends CallBackType ? Bluebird<R>
: O[M] extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

/* tslint:enable:max-line-length */

// tslint:disable-next-line
export function Promisify(propA: any, propB: any = undefined): any {
    if (propB === undefined) {

        if (propA.length == 1){
            return Bluebird.promisify(propA)(); // require to output the results if needed.
        } else {
            return Bluebird.promisify(propA);
        }

    } else if (propA[propB]) {

        if (propA[propB].length == 1){
            return Bluebird.promisify(propA[propB], {context: propA})();
        } else {
            return Bluebird.promisify(propA[propB], {context: propA});
        }
        
    } else {
        throw Error(`Error key [${propB}] not found on object`);
    }
}
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