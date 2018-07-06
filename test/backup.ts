

// export function isChildrenAnArray(children : ObjectChildren [] | (ObjectChildren | undefined)) : children is ObjectChildren []
// {
//   return Array.isArray(children);
// }

// export function isXObjectAndHasChildren(obj : Joi.AnySchema) : obj is ObjectSchemaHidden
// {
//   const objHidden = (<ObjectSchemaHidden>obj);

//   return objHidden && objHidden._inner && isChildrenAnArray(objHidden._inner.children);
// }

// export function isXArrayHasChildren(schema : Joi.AnySchema) : schema is Joi.ArraySchemaHidden
// {
//   const arrayChildren = ;

//   if((<ArraySchemaHidden>schema)._inner.items &7 )
//     return arrayChildren;
// }

// export function isXAlternativesHasChildren(schema : Joi.AnySchema)
// {
//   const arrayChildren = (<ArraySchemaHidden>schema)._inner.items;

//   if(arrayChildren)
//     return arrayChildren;
// }



// export async function OperateOnXObjectKeys2<ACC>(
//   object : Joi.AnySchema,
//   operate : (schema : Joi.AnySchema, acc : ACC, configValue : ConfigValue) => Promise<void>,
//   initAcc : (schema : Joi.AnySchema) => ACC,
//   updateParentAcc : (key : string, schema : Joi.AnySchema, parentAcc : ACC, acc : ACC) => ACC,
//   acc : ACC, config : Config = undefined, , key : string | undefined = undefined) : Promise<void>
//   {
//     if (isXObjectAndHasChildren(object))
//     {
//       const newAcc = initAcc(object);

//       for (let i = 0; i < object._inner.children.length; i++)
//       {
//         const child = object._inner.children[i];

//         await OperateOnXObjectKeys(child.schema, operate, initAcc, updateParentAcc, newAcc, child.key, config && config[child.key]);
//       }

//       if (key !== undefined)
//         acc = updateParentAcc(key, object, acc, newAcc);
//       else
//         // still required to support things.

//     }
//     else if (isXArrayHasChildren(object))
//     {
//       const schemas = object._inner.items;

//       const newAcc = initAcc(object);

//       for (let i = 0; i < schemas.length; i++)
//       {
//         let configValue = config && config[j];

//         await OperateOnXObjectKeys(schemas[i], operate, initAcc, updateParentAcc, newAcc, undefined, configValue);
//       }

//       if (key !== undefined)
//         acc = updateParentAcc(key, object, acc, newAcc);
//     }
//     else if (isXAlternativesHasChildren(object))
//     {
//       const schemas = object._inner.matches;

//       const newAcc = initAcc(object);

//       for (let i = 0; i < schemas.length; i++)
//       {
//         let configValue = config && config[j];

//         await OperateOnXObjectKeys(schemas[i], operate, initAcc, updateParentAcc, newAcc, undefined, configValue);
//       }

//       if (key !== undefined)
//         acc = updateParentAcc(key, object, acc, newAcc);
//     }
//     else
//     {
//       await operate(object, acc, config);
//     }
//   }
        // it("Optional", () => {
            
        //     const joiSchema = JoiX.object().keys({a:JoiX.number().required().optional()}).required();

        //     console.log(JSON.stringify(joiSchema.describe()));

        //     const results =  JoiX.validate({a:undefined}, joiSchema);

        //     chai.expect(() => JoiX.validate({a:undefined}, joiSchema)).to.not.throw();

        // });