"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
/*
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
*/
/*
printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
    console.log();
    console.log("Printed every element!");
});
*/
const alt = Joi.alternatives().try(Joi.object().keys({
    kind: Joi.string().allow('kind1').required,
    a: Joi.number()
}), Joi.object().keys({
    kind: Joi.string().allow('kind2').required,
    a: Joi.number()
}));
/*Joi.validate({kind:'sfd'}, alt, (err, value) => {
    console.log("joivalidate:" + JSON.stringify(err)) ;
});*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkJBQTJCO0FBRTNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBc0VFO0FBQ0Y7Ozs7O0VBS0U7QUFFRixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDcEQsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUTtJQUMxQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtDQUNmLENBQUMsRUFFRixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDO0lBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUTtJQUMxQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtDQUNmLENBQUMsQ0FDSixDQUFDO0FBRUY7O0tBRUsifQ==