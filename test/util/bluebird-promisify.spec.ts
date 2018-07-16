import * as chai from 'chai'
import {Promisify} from '../../src/util/bluebird-promisify';
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
        this.waitObject(this.control, callback);
    }

    funParamA(paramA : 'A', callback : (err: any, result: string) => void) : void
    {
        this.param = paramA;
        this.waitObject(this.control, callback);
    }
    
    funParamH(paramA : 'A', paramB : 'B', paramC : 'C', paramD : 'D', paramE : 'E', paramF : 'F', paramG : 'G', paramH : 'H', callback : (err: any, result: number) => void) : void
    {

        this.param = paramH;
        this.waitObject(this.control, callback);
    }


    waitObject(control : ControlState, callback : CallBack)
    {
        if (control.succes !== undefined)
            return callback(undefined, this.prefix + ":" + this.param + ":" + control.succes);
        else if (control.error !== undefined)
            return callback(this.prefix + ":" + this.param + ":" + control.error, undefined);
        else
            setTimeout(() => this.waitObject(control, callback), 10);
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
