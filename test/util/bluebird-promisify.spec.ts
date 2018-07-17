import * as chai from 'chai'
import {Promisify} from '../../src/util/bluebird-promisify';
//import {PromisifyAll} from '../../src/util/bluebird-promisify';

import {PromisifyReturn} from '../../src/util/bluebird-promisify';
import { onPossiblyUnhandledRejection } from 'bluebird';
const sut = require('redblade-testing');

type CallBack = (err: any, result: any) => void;

type ControlState = {
    succes : any | undefined;
    error : any | undefined;
};

function newControlState() : ControlState {
        
    return {
        succes : undefined,
        error : undefined
    }
}

function wait(control : ControlState, prefix: string, callback : CallBack)
{
    if (control.succes !== undefined)
        return callback(undefined, prefix + ":" + control.succes);
    else if (control.error !== undefined)
        return callback(control.error, undefined);
    else
        setTimeout(() => wait(control, prefix, callback), 10);
}


class TestObject
{
    public control : ControlState;
    private param : string = "";

    constructor(public prefix : string)
    {
        this.control = newControlState();
    }

    fun(callback : (err: any, result: boolean) => void) : void
    {
        this.waitObject(callback);
    }

    funParamA(paramA : 'A', callback : (err: any, result: string) => void) : void
    {
        this.param = paramA;
        this.waitObject(callback);
    }
    
    funParamH(paramA : 'A', paramB : 'B', paramC : 'C', paramD : 'D', paramE : 'E', paramF : 'F', paramG : 'G', paramH : 'H', callback : (err: any, result: number) => void) : void
    {

        this.param = paramH;
        this.waitObject(callback);
    }


    waitObject(callback : CallBack)
    {
        if (this.control.succes !== undefined)
            return callback(undefined, this.prefix + ":" + this.param + ":" + this.control.succes);
        else if (this.control.error !== undefined)
            return callback(this.prefix + ":" + this.param + ":" + this.control.error, undefined);
        else
            setTimeout(() => this.waitObject(callback), 10);
    }
}

describe("Generic Promisification", function() {

    describe("funtion only", function()
    {
        function genCallBackFun<C extends CallBack>(control : ControlState)
        {
            return function(callback : C)
            {
                wait(control, '', callback);
            }
        }

        function genCallBackFunWithParamA<C extends CallBack>(control : ControlState)
        {
            return function(paramA : 'A', callback : C)
            {
                wait(control, 'A', callback);
            }
        }

        function genCallBackFunWithParamH<C extends CallBack>(control : ControlState)
        {
            return function(paramA : 'A', paramB : 'B', paramC : 'C', paramD : 'D', paramE : 'E', paramF : 'F', paramG : 'G', paramH : 'H', callback : C)
            {
                wait(control, 'H', callback);
            }
        }

        describe("With Results", function() {
            it("No Paramss", async function() {

                let control = newControlState();
    
                const funToBePromisified = genCallBackFun<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                control.succes = 'sucess_1';
    
                chai.expect(await promisifyFun).to.eql(':sucess_1');
            });
    
    
            it("WithPrams", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamA<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                const resultPromsie = promisifyFun('A')
    
                control.succes = 'sucess_A';
    
                chai.expect(await resultPromsie).to.eql('A:sucess_A');
            });
    
    
    
            it("WithPramsH", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamH<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H')
    
                control.succes = 'sucess_H';
    
                chai.expect(await resultPromsie).to.eql('H:sucess_H');
            });
        });


        describe("With Error", function() {

            it("No Params", async function() {

                let control = newControlState();
    
                const funToBePromisified = genCallBackFun<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                control.error = 'error_1';

                chai.expect(await sut.returnCaughtErrorAsync(promisifyFun)).property('message').to.eq(control.error);
            });
    
    
            it("WithPrams", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamA<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                const resultPromsie = promisifyFun('A')
    
                control.error = 'error_A';
    
                chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(control.error);
            });
    
    
    
            it("WithPramsH", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamH<(err: any, result: string) => void>(control);
    
                const promisifyFun = Promisify(funToBePromisified);
    
                const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H')
    
                control.error = 'error_H';
    
                chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(control.error);
            });
        });  
    });

    describe("Object with function", function()
    {
        it("No Paramss", async function() {

            const objectFunToBePromisified = new TestObject("InitPrefix");
            
            const promisify = Promisify(objectFunToBePromisified, 'fun');

            objectFunToBePromisified.prefix = "InstanceNoParams";
            objectFunToBePromisified.control.succes = 'sucess';

            chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + "::" + objectFunToBePromisified.control.succes);
        });


        it("WithPrams", async function() {

            const objectFunToBePromisified = new TestObject("InitPrefix");
            
            const promisifyFun = Promisify(objectFunToBePromisified, 'funParamA');

            const promise = promisifyFun('A');

            objectFunToBePromisified.prefix = "InstanceParamsA";
            objectFunToBePromisified.control.succes = 'sucessA';

            chai.expect(await promise).to.eql(objectFunToBePromisified.prefix + ":A:" + objectFunToBePromisified.control.succes);
        });



        it("WithPramsH", async function() {

            const objectFunToBePromisified = new TestObject("InitPrefix");
            
            const promisifyFun = Promisify(objectFunToBePromisified, 'funParamH');

            const promise = promisifyFun('A','B','C','D','E','F','G','H');

            objectFunToBePromisified.prefix = "InstanceParamsH";
            objectFunToBePromisified.control.succes = 'sucessH';

            chai.expect(await promise).to.eql(objectFunToBePromisified.prefix + ":H:" + objectFunToBePromisified.control.succes);
        });
    });
});

/*
Basiclally not working because of the this associate, see what pier thinks.
// bade thing here is that promisify all, should n't kick everything off  by default.
describe("Promisify All", function ()
{
    // basically just run the check on each object.
    const objectFunToBePromisified = new TestObject('InitPrefix');
    const promisifiedObject = PromisifyAll(objectFunToBePromisified);

    it("No Paramss", async function() {

        const promise = promisifiedObject.fun();

        promisifiedObject.prefix = "InstanceNoParams";
        promisifiedObject.control.succes = 'sucess';

        chai.expect(await promise).to.eql(promisifiedObject.prefix + "::" + promisifiedObject.control.succes);
    });


    it("WithPrams", async function() {
        
        const promise = promisifiedObject.funParamA('A');

        promisifiedObject.prefix = "InstanceParamsA";
        promisifiedObject.control.succes = 'sucessA';

        const result = await promise;

        chai.expect(result).to.eql(promisifiedObject.prefix + ":A:" + promisifiedObject.control.succes);
    });



    it("WithPramsH", async function() {

        const promise = promisifiedObject.funParamH('A','B','C','D','E','F','G','H');

        promisifiedObject.prefix = "InstanceParamsH";
        promisifiedObject.control.succes = 'sucessH';

        chai.expect(await promise).to.eql(promisifiedObject.prefix + ":H:" + promisifiedObject.control.succes);
    });
});
*/


class TestObjectWithReturn<R extends string>
{
    public control : ControlState;
    private param : string = "";

    constructor(public prefix : string, private returnValue : R)
    {
        this.control = newControlState();
    }

    fun(callback : (err: any, result: boolean) => void) : R
    {
        this.waitObject(callback);
        return this.returnValue;
    }

    funParamA(paramA : 'A', callback : (err: any, result: string) => void) : R
    {
        this.param = paramA;
        this.waitObject(callback);
        return this.returnValue;
    }
    
    funParamH(paramA : 'A', paramB : 'B', paramC : 'C', paramD : 'D', paramE : 'E', paramF : 'F', paramG : 'G', paramH : 'H', callback : (err: any, result: number) => void) : R
    {

        this.param = paramH;
        this.waitObject(callback);
        return this.returnValue;
    }


    waitObject(callback : CallBack)
    {
        if (this.control.succes !== undefined)
            return callback(undefined, this.prefix + ":" + this.param + ":" + this.control.succes);
        else if (this.control.error !== undefined)
            return callback(this.prefix + ":" + this.param + ":" + this.control.error, undefined);
        else
            setTimeout(() => this.waitObject(callback), 10);
    }
}


describe("Promisification with return", function() {

    describe("funtion only", function()
    {
        function genCallBackFun<C extends CallBack, R>(control : ControlState, initResult : R)
        {
            return function(callback : C) : R
            {
                wait(control, '', callback);

                return initResult;
            }
        }

        function genCallBackFunWithParamA<C extends CallBack, R>(control : ControlState, initResult : R)
        {
            return function(paramA : 'A', callback : C) : R
            {
                wait(control, 'A', callback);

                return initResult;
            }
        }

        function genCallBackFunWithParamH<C extends CallBack, R>(control : ControlState, initResult : R)
        {
            return function(paramA : 'A', paramB : 'B', paramC : 'C', paramD : 'D', paramE : 'E', paramF : 'F', paramG : 'G', paramH : 'H', callback : C) : R
            {
                wait(control, 'H', callback);

                return initResult;
            }
        }

        describe("want execute result", function() {

            it("No Params", async function() {

                let control = newControlState();
    
                const funToBePromisified = genCallBackFun<(err: any, result: string) => string, 'ReturnNoParms'>(control, 'ReturnNoParms');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const initReturn = {initObject: 'initObject'};

                const promisify = promisifyFun(initReturn);

                chai.expect(initReturn).to.have.property('executeResult').to.eq('ReturnNoParms');
    
                control.succes = 'sucess_1';
    
                chai.expect(await promisify).to.eql(':sucess_1');
            });
    
    
            it("WithPrams", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamA<(err: any, result: string) => void, 'ReturnParamA'>(control,'ReturnParamA');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);
    
                const initReturn = {initObject: 'initObject'};

                const resultPromsie = promisifyFun('A', initReturn);

                chai.expect(initReturn).to.have.property('executeResult').to.eq('ReturnParamA');
    
                control.succes = 'sucess_A';
    
                chai.expect(await resultPromsie).to.eql('A:sucess_A');
            });
    
    
    
            it("WithPramsH", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamH<(err: any, result: string) => void, 'ReturnParamH'>(control, 'ReturnParamH');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const initReturn = {initObject: 'initObject'};
    
                const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H', initReturn);

                chai.expect(initReturn).to.have.property('executeResult').to.eq('ReturnParamH');
    
                control.succes = 'sucess_H';
    
                chai.expect(await resultPromsie).to.eql('H:sucess_H');
            });
        });

        describe("don't care about execute result", function() {

            it("No Params", async function() {

                let control = newControlState();
    
                const funToBePromisified = genCallBackFun<(err: any, result: string) => string, 'ReturnNoParms'>(control, 'ReturnNoParms');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const promisify = promisifyFun();
    
                control.succes = 'sucess_1';
    
                chai.expect(await promisify).to.eql(':sucess_1');
            });
    
    
            it("WithPrams", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamA<(err: any, result: string) => void, 'ReturnParamA'>(control,'ReturnParamA');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);
    
                const resultPromsie = promisifyFun('A');
    
                control.succes = 'sucess_A';
    
                chai.expect(await resultPromsie).to.eql('A:sucess_A');
            });
    
    
    
            it("WithPramsH", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamH<(err: any, result: string) => void, 'ReturnParamH'>(control, 'ReturnParamH');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H');
    
                control.succes = 'sucess_H';
    
                chai.expect(await resultPromsie).to.eql('H:sucess_H');
            });
        });

        describe("with error", function() {

            it("No Params", async function() {

                let control = newControlState();
    
                const funToBePromisified = genCallBackFun<(err: any, result: string) => string, 'ReturnNoParms'>(control, 'ReturnNoParms');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const resultPromsie = promisifyFun();

                control.error = 'error_1';

                chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(control.error);
            });
    
    
            it("WithPrams", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamA<(err: any, result: string) => void, 'ReturnParamA'>(control,'ReturnParamA');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);
    
                const resultPromsie = promisifyFun('A');
    
                control.error = 'error_1';

                chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(control.error);
            });
    
    
    
            it("WithPramsH", async function() {
    
                let control = newControlState();
    
                const funToBePromisified = genCallBackFunWithParamH<(err: any, result: string) => void, 'ReturnParamH'>(control, 'ReturnParamH');
    
                const promisifyFun = PromisifyReturn(funToBePromisified);

                const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H');
    
                control.error = 'error_1';

                chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(control.error);
            });
        });


        describe("Object with function", function () {

            describe("want execute result", function() {

                it("No Params", async function() {

                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnNoParams');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'fun');
    
                    const initReturn = {initObject: 'initObject'};
    
                    const promisify = promisifyFun(initReturn);    
    
                    chai.expect(initReturn).to.have.property('executeResult').to.eq('ObjectReturnNoParams');

                    objectFunToBePromisified.prefix = "InstanceNoParams";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + "::" + objectFunToBePromisified.control.succes);
                });
        
        
                it("WithPrams", async function() {
        
                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsA');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamA');
    
                    const initReturn = {initObject: 'initObject'};
    
                    const promisify = promisifyFun('A', initReturn);    
    
                    chai.expect(initReturn).to.have.property('executeResult').to.eq('ObjectReturnParamsA');

                    objectFunToBePromisified.prefix = "InstanceParamsA";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + ":A:" + objectFunToBePromisified.control.succes);
                });
        
        
        
                it("WithPramsH", async function() {

                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsH');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamH');
    
                    const initReturn = {initObject: 'initObject'};
    
                    const promisify = promisifyFun('A','B','C','D','E','F','G','H', initReturn);    
    
                    chai.expect(initReturn).to.have.property('executeResult').to.eq('ObjectReturnParamsH');

                    objectFunToBePromisified.prefix = "InstanceParamsH";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + ":H:" + objectFunToBePromisified.control.succes);
                });
            });

            describe("don't care about execute result", function() {

                it("No Params", async function() {

                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnNoParams');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'fun');
    
                    const promisify = promisifyFun();    
    
                    objectFunToBePromisified.prefix = "InstanceNoParams";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + "::" + objectFunToBePromisified.control.succes);
                });
        
                it("WithPrams", async function() {
        
                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsA');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamA');
    
                    const promisify = promisifyFun('A');    
    
                    objectFunToBePromisified.prefix = "InstanceParamsA";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + ":A:" + objectFunToBePromisified.control.succes);
                });
        
                it("WithPramsH", async function() {
        
                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsH');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamH');
    
                    const promisify = promisifyFun('A','B','C','D','E','F','G','H');    
    
                    objectFunToBePromisified.prefix = "InstanceParamsH";
                    objectFunToBePromisified.control.succes = 'sucess';
        
                    chai.expect(await promisify).to.eql(objectFunToBePromisified.prefix + ":H:" + objectFunToBePromisified.control.succes);
                });
            });

            describe("with error", function() {

                it("No Params", async function() {
    
                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnNoParams');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'fun');
    
                    const resultPromsie = promisifyFun();
    
                    objectFunToBePromisified.control.error = 'error_1';
    
                    chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(objectFunToBePromisified.prefix + "::" + objectFunToBePromisified.control.error);
                });
        
        
                it("WithPrams", async function() {

                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsA');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamA');
    
                    const resultPromsie = promisifyFun('A');
        
                    objectFunToBePromisified.control.error = 'error_1';
    
                    chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(objectFunToBePromisified.prefix + ":A:" + objectFunToBePromisified.control.error);
                });
        
        
        
                it("WithPramsH", async function() {

                    const objectFunToBePromisified = new TestObjectWithReturn("InitPrefix", 'ObjectReturnParamsH');
                    
                    const promisifyFun = PromisifyReturn(objectFunToBePromisified, 'funParamH');
    
                    const resultPromsie = promisifyFun('A','B','C','D','E','F','G','H');
        
                    objectFunToBePromisified.control.error = 'error_1';

                    chai.expect(await sut.returnCaughtErrorAsync(resultPromsie)).property('message').to.eq(objectFunToBePromisified.prefix + ":H:" + objectFunToBePromisified.control.error);
                });
            });
        });
    });
});
