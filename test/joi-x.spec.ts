import * as chai from 'chai';
import * as JoiX from '../src/joi-x'
import { Joi } from '../src';

describe("JoiX binds with Joi", () =>
{
    it("GetXObjectChildren", () => {

        const objecSchema = JoiX.object().keys({
            a : JoiX.string(),
            c : JoiX.number() 
        });

        const children = JoiX.getXObjectChildren(objecSchema);
        
        chai.expect(children).not.eq(null);

        if (children)
        {
            chai.expect(children.length).to.equal(2);
            chai.expect(children[0].key).to.equal("a");
            chai.expect(children[0].schema).to.equal(JoiX.string());
            
            chai.expect(children[1].key).to.equal("c");
            chai.expect(children[1].schema).to.equal(JoiX.number());
        }
    });

    it("OperateOnXObjectKeys", async () =>
    {
        const objecSchema = JoiX.object().keys({
            a : JoiX.string(),
            b : JoiX.object().keys({
                f : JoiX.number(),
                h : JoiX.string()
            }),
            c : JoiX.number() 
        });

        const children = JoiX.getXObjectChildren(objecSchema);

        let extractedKeys : any = {};

        await JoiX.OperateOnXObjectKeys(children, async (key, schema, acc)  => {
            acc[key] = schema;
        },
        (key, acc) => { 
            return {};
        },(key, parentAcc, acc) => {
            parentAcc[key] = acc
            return parentAcc;
        },
        extractedKeys);
    
        chai.expect(extractedKeys).to.have.property('a').to.equal(JoiX.string());
        chai.expect(extractedKeys).to.have.property('c').to.equal(JoiX.number());
        chai.expect(extractedKeys).to.have.property('b');

        const extractedKeysB = extractedKeys['b'];

        chai.expect(extractedKeysB).to.have.property('f').to.equal(JoiX.number());
        chai.expect(extractedKeysB).to.have.property('h').to.equal(JoiX.string());
    });
});

describe("Joi Behaviours", function()
{
    it("ObjectKeyObject - impossible", async function()
    {
        chai.expect(function() {
            const objectKeyObjectSchema = JoiX.object().keys(JoiX.object().keys({
                a : JoiX.string().required()
            })).required();
        }).to.throw();

        
    });


    it("ObjectArrayObject - required, optional contraints.", async function()
    {
        const arrayItemsSchema = JoiX.array().items(JoiX.object().keys({
            a : JoiX.string().required()
        })).required();

        const json = [{
            a : "propA",
        }]

        try
        {
            const validateSchema = await JoiX.validate(json, arrayItemsSchema);

            chai.expect(validateSchema).to.have.property('length').eq(1);
            chai.expect(validateSchema[0]).to.have.property('a').eq('propA');
        }
        catch(e)
        {
            console.log(JSON.stringify(e));
            chai.expect(e).eq(undefined);
        }
    });

    it("ObjectArrayJSON - required, optional contraints.", async function()
    {
            
        const arrayItemsSchema = JoiX.array().items({
            a : JoiX.string().required()
        }).required();   
        
        const json = [{
            a : "propA",
        }]

        try
        {
            const validateSchema = await JoiX.validate(json, arrayItemsSchema);

            chai.expect(validateSchema).to.have.property('length').eq(1);
            chai.expect(validateSchema[0]).to.have.property('a').eq('propA');
        }
        catch(e)
        {
            console.log(JSON.stringify(e));
            chai.expect(e).eq(undefined);
        }
    });

    it("ObjectArrayMutiple - required, optional contraints.", async function()
    {
        const arrayItemsSchema = JoiX.array().items(JoiX.string().required(), JoiX.number().required()).required();   
        
        const json = ['A', 1,'B']

        try
        {
            const validateSchema = await JoiX.validate(json, arrayItemsSchema);

            chai.expect(validateSchema).to.have.property('length').eq(3);
            chai.expect(validateSchema[0]).to.eq('A');
            chai.expect(validateSchema[1]).to.eq(1);
            chai.expect(validateSchema[2]).to.eq('B');
        }
        catch(e)
        {
            console.log(JSON.stringify(e));
            chai.expect(e).eq(undefined);
        }
    });

    it("ObjectAlternative ", async function()
    {
        const objectAlternative = JoiX.object().keys({
            a : JoiX.alternatives().try([{b : JoiX.string().required()}, {c : JoiX.number().required()}])
        }).required();

        const json = {
            a : {
                b : 'string'
            }
        };

        try
        {
            const validateSchema = await JoiX.validate(json, objectAlternative);

            chai.expect(validateSchema.a).to.have.property('b').to.eq('string');
        }
        catch(e)
        {
            console.log(JSON.stringify(e));
            chai.expect(e).eq(undefined);
        }
    });

});
