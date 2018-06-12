//import * as Joi from 'joi'
import * as JoiX from './joi-x'
import * as Joi from 'joi';

console.log("dfsdfsfd");

type FactoryA = JoiX.ExtractFromSchema<typeof factoryA>;
const factoryA = JoiX.object().keys({
    factory : JoiX.kind('FactoryA'),
    d : JoiX.number().required()
}).required();

type FactoryBase = JoiX.ExtractFromSchema<typeof factoryBase>;
const factoryBase = JoiX.object().keys({
    e : JoiX.string().required()
}).required();


type FactoryB = JoiX.ExtractFromSchema<typeof factoryB>;
const factoryB = factoryBase.keys({
    factory : JoiX.kind('FactoryB')
}).required();

//Joi.alternatives().when('b', { is: 5, then: Joi.string(), otherwise: Joi.number() })



// This constraint can be determined by use..
type Factories = FactoryA | FactoryB;

enum Test
{
    Test = 'test',
    testing = 'testsdfsdf'
}


function test_swtich(v : Factories)
{
    switch(v.factory)
    {
    }
}

type Union<T> =
{
}
/*
onst factoryB: JoiX.XObject & JoiX.ObjectSchema & {
    __tsType: JoiX.ExtractFromObject<{
        kind: JoiX.XPrimitive<"FactoryB"> & JoiX.StringSchema & {
            __isRequired: "T";
        };
        e: JoiX.XPrimitive<string> & JoiX.StringSchema & {
            __isRequired: "T";
        };
    }>;
} & {
    __isRequired: "T";
}
*/

const schema = JoiX.object().keys({
   a : JoiX.alternatives().try([factoryA, factoryB]),
   b : JoiX.LiteralString(['A', 'B']),
   //c: factoryB
}).required();


type Schema = JoiX.ExtractFromSchema<typeof schema>;

const impl : Schema = 
{
    a : {
        factory : 'FactoryA',
        d : 234
    } as FactoryA,
    b : 'A'
}

const case1 : Schema = {a:{factory:'FactoryB',e:'3434'},b:'A'};
const case2 : Schema = {a:{factory:'FactoryA',d:234},b:'B'};

valid('case1', case1);
valid('case2', case2);

/*
const testWhenSchema = {a: JoiX.number(), b : Joi.alternatives().when('b.factory', { is : 5, then: {factory:Joi.any(), z : Joi.boolean()},
 otherwise: {factory:Joi.any(), y: Joi.number()}})};


Joi.validate({a:5,b:{factory:8}}, testWhenSchema, (err : any, value : any) =>
{
    console.log("dump:" + JSON.stringify(err) + " : " + JSON.stringify(value));  
});

*/

function valid(msg : string, test : any )
{
    Joi.validate(test, schema, (err : any, value : any) =>
    {
        console.log("dump:" + JSON.stringify(err) + " : " + JSON.stringify(value));  
    });
}


/*


        JoiX.object().keys({
            kind : JoiX.string().valid('B').required(),
            e : JoiX.string().required()
        }).required()
*/
