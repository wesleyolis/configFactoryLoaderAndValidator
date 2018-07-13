import * as Bluebird from 'bluebird';

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

export function Promisify<O extends {}, M extends keyof O>(propA: O , propB: M)
: ParamI<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamE<O[M]>, H: ParamE<O[M]>) => Bluebird<RCallBack<ParamI<O[M]>>>
: ParamH<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamE<O[M]>) => Bluebird<RCallBack<ParamH<O[M]>>>
: ParamG<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>) => Bluebird<RCallBack<ParamG<O[M]>>>
: ParamF<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>) => Bluebird<RCallBack<ParamF<O[M]>>>
: ParamE<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>) => Bluebird<RCallBack<ParamE<O[M]>>>
: ParamD<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>) => Bluebird<RCallBack<ParamD<O[M]>>>
: ParamC<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>) => Bluebird<RCallBack<ParamC<O[M]>>>
: ParamB<O[M]> extends CallBackType ? (A: ParamA<O[M]>) => Bluebird<RCallBack<ParamB<O[M]>>>
: ParamA<O[M]> extends CallBackType ? () => Bluebird<RCallBack<ParamA<O[M]>>>
: O[M] extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export function Promisify<R, M extends (...args: any []) => void>(propA: M)
: ParamI<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamE<M>, H: ParamE<M>) => Bluebird<R>
: ParamH<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>, G: ParamE<M>) => Bluebird<R>
: ParamG<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>, F: ParamF<M>) => Bluebird<R>
: ParamF<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>, E: ParamE<M>) => Bluebird<R>
: ParamE<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>, D: ParamD<M>) => Bluebird<R>
: ParamD<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>, C: ParamC<M>) => Bluebird<R>
: ParamC<M> extends CallBackType ? (A: ParamA<M>, B: ParamB<M>) => Bluebird<R>
: ParamB<M> extends CallBackType ? (A: ParamA<M>) => Bluebird<R>
: ParamA<M> extends CallBackType ? () => Bluebird<R>
: M extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

export function Promisify<R, O extends {}, M extends keyof O>(propA: O , propB: M)
: ParamI<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamE<O[M]>, H: ParamE<O[M]>) => Bluebird<R>
: ParamH<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>, G: ParamE<O[M]>) => Bluebird<R>
: ParamG<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>, F: ParamF<O[M]>) => Bluebird<R>
: ParamF<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>, E: ParamE<O[M]>) => Bluebird<R>
: ParamE<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>, D: ParamD<O[M]>) => Bluebird<R>
: ParamD<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>, C: ParamC<O[M]>) => Bluebird<R>
: ParamC<O[M]> extends CallBackType ? (A: ParamA<O[M]>, B: ParamB<O[M]>) => Bluebird<R>
: ParamB<O[M]> extends CallBackType ? (A: ParamA<O[M]>) => Bluebird<R>
: ParamA<O[M]> extends CallBackType ? () => Bluebird<R>
: O[M] extends Paramlast ? 'Expanded the parameter templates' : '** Invalid Method (key) not found in object**';

/* tslint:enable:max-line-length */

// tslint:disable-next-line
export function Promisify(propA: any, propB: any = undefined): any {
    if (propB === undefined) {
        return Bluebird.promisify(propA);
    } else if (propA[propB]) {
        return Bluebird.promisify(propA[propB], {context: propA});
    } else {
        throw Error(`Error key [${propB}] not found on object`);
    }
}

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