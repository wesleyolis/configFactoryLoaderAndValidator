import * as chai from 'chai';
import * as JoiX from '../src/joi-x'

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

    it("OperateOnXObjectKeys", () =>
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

        JoiX.OperateOnXObjectKeys(children, (key, schema, acc) => {
            acc[key] = schema;
        },
        (key, acc) => {
            acc[key] = {};
            return acc[key];
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