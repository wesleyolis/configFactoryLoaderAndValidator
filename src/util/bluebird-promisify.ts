import * as Bluebird from 'bluebird';
import { callbackify } from 'util';

/* tslint:disable:max-line-length */

export type CallBackType = undefined | ((err: any, result: any) => void);

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
export type ParamJ<T> = T extends (A: any, B: any, C: any, D: any, E: any, F: any, G: any, H: any, I: any, J: infer P) => void ? P : never;
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


export type PromisifiyReturnType<M> = ParamA<M> extends CallBackType ? () => Bluebird<void>
 : ParamB<M> extends CallBackType ? (A: ParamA<M>) => Bluebird<RCallBack<ParamB<M>>>
 : ParamC<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>) => Bluebird<RCallBack<ParamC<M>>>
 : ParamD<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>) => Bluebird<RCallBack<ParamD<M>>>
 : ParamE<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>) => Bluebird<RCallBack<ParamE<M>>>
 : ParamF<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>) => Bluebird<RCallBack<ParamF<M>>>
 : ParamG<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>) => Bluebird<RCallBack<ParamG<M>>>
 : ParamH<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>) => Bluebird<RCallBack<ParamH<M>>>
 : ParamI<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>, H: ParamH<M>) => Bluebird<RCallBack<ParamI<M>>>
 : M extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export type PromisifyObject<O extends {}> =
{ 
    [K in keyof O] : O[K] extends Function ? PromisifiyReturnType<O[K]> : O[K]
}
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

export function PromisifyReturn<M>(propA: M)
: ParamI<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>, H: ParamH<M>, init?: Z) => Bluebird<RCallBack<ParamI<M>>>
: ParamH<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamG<M>, init?: Z) => Bluebird<RCallBack<ParamH<M>>>
: ParamG<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, init?: Z) => Bluebird<RCallBack<ParamG<M>>>
: ParamF<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, init?: Z) => Bluebird<RCallBack<ParamF<M>>>
: ParamE<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, init?: Z) => Bluebird<RCallBack<ParamE<M>>>
: ParamD<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, init?: Z) => Bluebird<RCallBack<ParamD<M>>>
: ParamC<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, B: ParamB<M>, init?: Z) => Bluebird<RCallBack<ParamC<M>>>
: ParamB<M> extends CallBackType ? <Z extends {}>(A: ParamA<M>, init?: Z) => Bluebird<RCallBack<ParamB<M>>>
: ParamA<M> extends CallBackType ? <Z extends {}>(init?: Z) => Bluebird<void>
: M extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';


export function PromisifyReturn<O extends {}, M extends keyof O>(propA: O , propB: M)
: ParamI<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>, H: ParamH<O[M]>, init?: Z) => Bluebird<RCallBack<ParamI<O[M]>>>
: ParamH<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamG<O[M]>, init?: Z) => Bluebird<RCallBack<ParamH<O[M]>>>
: ParamG<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, init?: Z) => Bluebird<RCallBack<ParamG<O[M]>>>
: ParamF<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, init?: Z) => Bluebird<RCallBack<ParamF<O[M]>>>
: ParamE<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, init?: Z) => Bluebird<RCallBack<ParamE<O[M]>>>
: ParamD<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, init?: Z) => Bluebird<RCallBack<ParamD<O[M]>>>
: ParamC<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, B: ParamB<O[M]>, init?: Z) => Bluebird<RCallBack<ParamC<O[M]>>>
: ParamB<O[M]> extends CallBackType ? <Z extends {}>(A: ParamA<O[M]>, init?: Z) => Bluebird<RCallBack<ParamB<O[M]>>>
: ParamA<O[M]> extends CallBackType ? <Z extends {}>(init?: Z) => Bluebird<RCallBack<ParamA<O[M]>>>
: O[M] extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export function PromisifyReturn(propA : any, propB : any = undefined) : any //(...args : any[]) => Bluebird<any>
{
    function generatePromise (func : Function, object : any) : (...args : any[]) => Bluebird<any> 
    {
        let self : any | undefined = object;
        let orignalArgsWithCallBackLength = func.length;

        return function (execute : {[index:string] : any} | undefined) : Bluebird<any> { 
       
            let executeResult : any = undefined;

            let lastArg = arguments.length - 1;

            if (orignalArgsWithCallBackLength == arguments.length && lastArg > -1)
            {
                executeResult = arguments[lastArg];
                lastArg--;
            }
            
            let args : any [] = [];
            for (let i = 0; i <= lastArg; i++)
                args.push(arguments[i]);

            return new Bluebird(function(resolve, reject) {
                
                try {
                    
                    let result = undefined;

                    args.push(function (err : any, result: any) 
                    {
                        if(err)
                            reject(Error(err))
                        else
                            resolve(result);
                    });

                    result = func.call(self, ... args);

                    if(executeResult)
                        executeResult['executeResult'] = result;
    
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
        return generatePromise(propA[propB], propA);
    }
    else
        throw Error(`Error key [${propB}] not found on object`);
}
