import { join } from "bluebird";
import * as JoiX from './joi-x';

interface IBase
{
    method() : Promise<void>
}


class Middle implements IBase
{
    method() : Promise<void>
    {
        console.log("Middle");
        return Promise.resolve();
        //console.log("Middle-After");
    }
}

class Top implements Middle
{
    async method() : Promise<void>
    {
        console.log("Top");
        await delay(200);
        console.log("Top-After");
    }
}

async function testMethod ()
{
    console.log("Non:" + await testNonAsync());
    

    await testNonAsync2();
}

 function testNonAsync() 
{
    return Promise.resolve(5);
}

function testNonAsync2() 
{
    //sync statments...
    return Promise.resolve(5);
}

console.log("Testing: " +   testMethod());

const V1 = new Middle();
const test = async () => {
console.log("V1 Before");
await V1.method();
console.log("V1 After");
}

test();

// printDelayed is a 'Promise<void>'
async function printDelayed(elements: string[]) {
    for (const element of elements) {
        await delay(200);
        console.log(element);
    }
}

async function delay(milliseconds: number) {
    return new Promise<void>(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

/*
printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
    console.log();
    console.log("Printed every element!");
});
*/