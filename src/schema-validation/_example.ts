import { ValidatorOptions, Validate, Optional, Nullable, Validator, TSTypes,  } from './types';
import {IValidationType, ValidationType} from './internal/type-helpers'
import {Number, String, Array, ObjectArray} from './validator-definitions';
import { Bool, ObjectOverwrite, If, ObjectOmit, ObjectHasKey, PickExact, StringOmit, ObjectClean, StringContains, StringEq, Or } from 'typelevel-ts';
import * as Joi from 'joi';

const schema = Joi.object().options({abortEarly: false}).keys({
    email
});

enum Modifiers {
    Non,
    Nullable,

}


export interface HasType<T> 
{
    type?: T
}

export type Optional2<T extends HasType<any>> = ObjectOverwrite<T, { optional: true }>

export class ConfigMerged4<T extends ValidatorOptions>
{
    port : Validate<Optional2<Number>, T> = {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number",
        optional: true,
    };
}

export class Vanilla<B extends ValidatorOptions>
{
    port : Validate<Optional2<Number>,B> = {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number",
        optional: true
    };
    
    portdfd : Validate<Optional2<Number>,B> = {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number",
        optional: true
    };
    /*
    database : Validate<String,B> = {
        kind: "reg",
        minLen: 0,
        maxLen: 10,
        regx: "yyy"
    };
*/
    arrayObjectOptionalParam: Validate<Optional<ObjectArray<{
        p1: Optional<Number>,
        p2: String
    }, B>>, B> = {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    }
}
/*
type cl = Vanilla<TSTypes>;
type kkk = TSTypesFrom<cl>;

const mmmdd : cl = {
    port : 344,
    database : 'string'
}

const mmm : cl = {
    port : {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number",
        optional : true
    },
    database : {
        kind: "reg",
        minLen: 0,
        maxLen: 10,
        regx: "yyy"
    }
}
*/

type ValidatorKeys<B extends ValidatorOptions> = KeysIfHasKey<Vanilla<B>,'optional','T'>

type ValidatorKeys2<B extends ValidatorOptions> = KeysIfHasKey<Vanilla<B>,'optional','F'>

type optionals = ValidatorKeys<Validator>;
type optionals2 = ValidatorKeys2<Validator>;

type val = Vanilla<Validator>;
type OptionalPart<B extends ValidatorOptions> = PickOptional<Vanilla<Validator>, KeysIfHasKey<Vanilla<B>,'optional','T'>>
type NonOptional<B extends ValidatorOptions> = Pick<Vanilla<Validator>, KeysIfHasKey<Vanilla<B>,'optional','F'>>

type PickOptional<O, Keys extends keyof O> = 
{
    [K in Keys]? : If<ObjectHasKey<O[K],'elements'>, ApplyOptional<O[K]>,O[K]>
}

type Pick<O, Keys extends keyof O> = 
{
    [K in Keys] : If<ObjectHasKey<O[K],'elements'>, ApplyOptional<O[K]>,O[K]>//PickOptional<O[K], KeysIfHasKey<O[K],'optional','T'>> & Pick<O[K], KeysIfHasKey<O[K],'optional','F'>>//ApplyOptional<O[K]>
}

type ApplyOptional<O> = MakeOptional<O, KeysIfHasKey<O,'optional','T'>, KeysIfHasKey<O,'optional','F'>>

type MakeOptional<O, OKeys extends keyof O, NKeys extends keyof O> =

//{ [K in OKeys]? : ApplyOptional<O[K]> } & {[K2 in NKeys] : ApplyOptional<O[K2]>}
{[K in OKeys]? : IfApplyOptionRecursive<O,K> } & 
{[K2 in NKeys] : IfApplyOptionRecursive<O,K2>}

// we apply this at the top level, but we need to actually apply this to the elements item, which is the problem.
type IfApplyOptionRecursive<O, K extends keyof O> = If<Or<ObjectHasKey<O[K],'elements'>, StringEq<K,'elements'>>, ApplyOptional<O[K]>, O[K]>

type KeysIfHasKey<O, P extends string, IfHas extends Bool> =
{
    [K in keyof O] : If<ObjectHasKey<O[K],P>, If<IfHas, K, never>, If<IfHas, never, K>>
}[keyof O]
/*
type KeysIfHasKey<O, P extends string, IfHas extends Bool> =
{
    [K in keyof O] : If<ObjectHasKey<O[K],P>, If<IfHas, K, never>, If<IfHas, never, K>>
}[keyof O]*/

type Schema<O, B extends ValidatorOptions> = ApplyOptional<O>
/*ObjectClean<
PickOptional<O, KeysIfHasKey<O,'optional','T'>> &
Pick<O, KeysIfHasKey<O,'optional','F'>>
>*/


type ApplyOptionalClean<O> = ObjectClean<
ApplyOptional<O>
>

type ApplyValidator<[index : string] extends HasType<any>> =
{
    [K in keyof O] : O[K]['type']
}

/*
PickOptional<O, KeysIfHasKey<O,'optional','T'>> &
Pick<O, KeysIfHasKey<O,'optional','F'>>
*/
// The recursive pattern doesn't know were to stop...
const testasdasd : Schema<Vanilla<Validator>,Validator> = {
    
    arrayObjectOptionalParam : {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
       
    }
}


type TSTypesFromRedefine<O extends {}> = Partial<Pick<O,KeysIfHasKey<O>>>

//type aaa = TSTypesFromRedefine<cl>
/*
({
    [K in keyof O] : RedefineObjectKeyIfOptional<K,O[K],never>
} & {
    [K in keyof O]? : RedefineObjectKeyIfOptional<K,O[K],O[K]>
})[keyof O];


type ggg = KeysIfHasKey<Vanilla<Validator>>;

type TSTypesFrom<O extends {}> =
({
    [K in keyof O] : RedefineObjectKeyIfOptional<K,O[K],never>
} & {
    [K in keyof O]? : RedefineObjectKeyIfOptional<K,O[K],O[K]>
})[keyof O];

type jjj = TSTypesFrom<cl>

type RedefineObjectKeyIfOptional<O extends string, V extends any, A extends any> =
{
    T : {[K in O]? : ObjectOmit<V,'optional'>} 
    F : A
}[ObjectHasKey<V,'optional'>]

const t_ = new ConfigMerged4<TSTypes>();
type uuu = TSTypesFrom<ConfigMerged4<TSTypes>>;


const testff : RedefineObjectKeyIfOptional<'port', { nullable: true, type: number}> = {
   // port : 33
}

/*
const test = {
    prop1 : false as boolean,
    where : function(val : IValidationType) : IValidationType
    {
        return val;
    }
}

class test2 {
    prop1 : boolean =  false;

    declare were(val : IValidationType) : IValidationType
    {
        return val;
    }
}


class types {
    port : test2 = {
        prop1 : true
    }
}

export class ConfigMerged2<T extends ValidatorOptions>
{
    port =  Validate<Number, T>().where() {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number"
    }//.where(this.port);

    // Basically were is not found unless it is an instance, unless some other way of doing it while keeping this
    // or we look at implemented Validate as a function template wrapper that will, return instance of the Number object
    // Basically return an instance to evalute.
    // But this is no giong to cause the validate definition, types to move from static types to being infered types.

    // going to have to use someform of proto declare magic... such this method looks like it is part of the IValidationTypes
    // when it actually is not, because I want the syntax to remain clean as it is above.
    // I don't want to have to intialize a class instance.. were look use usesing good old javascript
    // way of constructoin and object.. then we have to look at a method that will 
    // The base should be an interfaces, anything else that is optional, can be implemented as a function.
    // we can also add were definition validation, because we can referance this in the class.
    // But this means we need to expaned on this again, because for a were I would like a different set of types validation
    // to ensure the correct property is passed in. I am going to have to think about how to do this.
}
*/


export class ConfigMerged<T extends ValidatorOptions>
{
    port : Validate<Number, T> = {
        allowNull: false,
        lower: 0,
        upper: 10,
        kind: "number"
    };//.where(this.port);

    // Basically were is not found unless it is an instance, unless some other way of doing it while keeping this
    // or we look at implemented Validate as a function template wrapper that will, return instance of the Number object
    // Basically return an instance to evalute.
    // But this is no giong to cause the validate definition, types to move from static types to being infered types.

    // going to have to use someform of proto declare magic... such this method looks like it is part of the IValidationTypes
    // when it actually is not, because I want the syntax to remain clean as it is above.
    // I don't want to have to intialize a class instance.. were look use usesing good old javascript
    // way of constructoin and object.. then we have to look at a method that will 
    // The base should be an interfaces, anything else that is optional, can be implemented as a function.
    // we can also add were definition validation, because we can referance this in the class.
    // But this means we need to expaned on this again, because for a were I would like a different set of types validation
    // to ensure the correct property is passed in. I am going to have to think about how to do this.

    database: Validate<Optional<String>, T> = {
        kind: "reg",
        minLen: 0,
        maxLen: 10,
        regx: "yyy",
        optional: true
    };

    t2: Validate<Number, T> = {
        kind: "number",
        allowNull: false,
        lower: 0,
        upper: 1
    };
    arrayString: Validate<Array<String, T>, T> = {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    };
    arrayObject: Validate<ObjectArray<{
        p1: Number,
        p2: String
    }, T>, T> = {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    };
    arrayStringOptional: Validate<Optional<Array<String, T>>, T> = {
        kind: "array",
        optional: true,
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    };
    arrayObjectOptional: Validate<Optional<ObjectArray<{
        p1: Number,
        p2: String
    }, T>>, T> = {
        kind: "objectArray",
        optional: true,
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    };

    arrayStringOptionalParam: Validate<Array<Optional<String>, T>, T> = {
        kind: "array",
        elements: {
            optional: true,
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    };
    arrayObjectOptionalParam: Validate<ObjectArray<{
        p1: Optional<Number>,
        p2: String
    }, T>, T> = {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    }
    arrayStringOptionalNullableParam: Validate<Array<Optional<Nullable<String>>, T>, T> = {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx",
            optional: true,
            nullable : true
        }
    };

    arrayObjectOptionaNullablelParam: Validate<ObjectArray<{
        p1: Optional<Nullable<Number>>,
        p2: Nullable<String>
    }, T>, T> = {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
                nullable : true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx",
                nullable : true
            }
        }
    }
}

const validationSchema = new ConfigMerged<TSTypes>();
type ConfigTypes = ConfigMerged<TSTypes>

// Because a classes types are just syntax sugger and in the back ground an parrallel interfaces is generated for it.
const options : ConfigTypes = {
    database: undefined,
    port: 0,
    t2: 0,
    arrayString: ['test', 'string'],
    arrayObject: [{ p1: 0, p2: '22' }, { p1: 0, p2: '44' }, { p1: 0, p2: '22' }, { p1: 0, p2: '44' }],
    arrayStringOptional: undefined,
    arrayObjectOptional: undefined,
    arrayStringOptionalParam: [undefined, "sdfsdf"],
    arrayObjectOptionalParam: [{p1:undefined, p2: 'sdfsdf'}],
    arrayStringOptionalNullableParam: [null, undefined , "string"],
    arrayObjectOptionaNullablelParam: [{p1:undefined, p2:'sdsf'}, {p1:null, p2:'sdsf'}, {p1:10, p2:'sdsf'},
    {p1:undefined, p2:null}, {p1:null, p2:null}, {p1:10, p2:null}]
}

export type Config<T extends ValidatorOptions> = {
    port: Validate<Number, T>,
    database: Validate<Optional<String>, T>,
    t2: Validate<Number, T>,
    arrayString: Validate<Array<String, T>, T>,
    arrayObject: Validate<ObjectArray<{
        p1: Number,
        p2: String
    }, T>, T>,
    arrayStringOptional: Validate<Optional<Array<String, T>>, T>,
    arrayObjectOptional: Validate<Optional<ObjectArray<{
        p1: Number,
        p2: String
    }, T>>, T>,
    arrayStringOptionalParam: Validate<Array<Optional<String>, T>, T>,
    arrayObjectOptionalParam: Validate<ObjectArray<{
        p1: Optional<Number>,
        p2: String
    }, T>, T>,
    arrayStringOptionalNullableParam: Validate<Array<Optional<Nullable<String>>, T>, T>,
    arrayObjectOptionaNullablelParam: Validate<ObjectArray<{
        p1: Optional<Nullable<Number>>,
        p2: Nullable<String>
    }, T>, T>,
}

export type ConfigSettingsSchema = Config<TSTypes>;
export type ConfigSettingsValidator = Config<Validator>;

export const ConfigSettingsSchema: ConfigSettingsSchema = {
    database: undefined,
    port: 0,
    t2: 0,
    arrayString: ['test', 'string'],
    arrayObject: [{ p1: 0, p2: '22' }, { p1: 0, p2: '44' }, { p1: 0, p2: '22' }, { p1: 0, p2: '44' }],
    arrayStringOptional: undefined,
    arrayObjectOptional: undefined,
    arrayStringOptionalParam: [undefined, "sdfsdf"],
    arrayObjectOptionalParam: [{p1:undefined, p2: 'sdfsdf'}],
    arrayStringOptionalNullableParam: [null, undefined , "string"],
    arrayObjectOptionaNullablelParam: [{p1:undefined, p2:'sdsf'}, {p1:null, p2:'sdsf'}, {p1:10, p2:'sdsf'},
    {p1:undefined, p2:null}, {p1:null, p2:null}, {p1:10, p2:null}]
}

type test = typeof ConfigSettingsSchema;


export const ConfigSettingsValidator: ConfigSettingsValidator = {
    port: {
        allowNull: false,
        lower: 0,
        upper: 1,
        kind: "number"
    },
    database: {
        kind: "reg",
        minLen: 0,
        maxLen: 10,
        regx: "yyy",
        optional: true
    },
    t2: {
        kind: "number",
        allowNull: false,
        lower: 0,
        upper: 1
    },
    arrayString: {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObject: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptional: {
        kind: "array",
        optional: true,
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObjectOptional: {
        kind: "objectArray",
        optional: true,
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptionalParam: {
        kind: "array",
        elements: {
            optional: true,
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx"
        }
    },

    arrayObjectOptionalParam: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx"
            }
        }
    },

    arrayStringOptionalNullableParam: {
        kind: "array",
        elements: {
            kind: "reg",
            minLen: 0,
            maxLen: 10,
            regx: "regx",
            optional: true,
            nullable : true
        }
    },
    arrayObjectOptionaNullablelParam: {
        kind: "objectArray",
        elements: {
            p1: {
                kind: "number",
                allowNull: false,
                lower: 0,
                upper: 1,
                optional: true,
                nullable : true,
            },
            p2: {
                kind: "reg",
                minLen: 0,
                maxLen: 10,
                regx: "regx",
                nullable : true
            }
        }
    }
};
