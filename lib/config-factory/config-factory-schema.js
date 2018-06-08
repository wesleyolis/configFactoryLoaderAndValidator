"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoiX = require("../joi-x");
exports.factoryConfigSchema = JoiX.object().keys({
    factory: JoiX.string().required(),
    class: JoiX.string().required(),
    type: JoiX.string().required(),
    config: 4 // this has to be some existing configuration... their is an example..
});
/*

export const baseSchema = JoiX.object().keys({
    a : JoiX.string().required(),
    b : JoiX.number().required()
});

export const extendsBaseSchema = baseSchema.keys({
    a : JoiX.number().required()
});

export type ExtendsBaseSchema = JoiX.ExtractFromSchema<typeof extendsBaseSchema>;


export type TJChoice1 = JoiX.ExtractFromSchema<typeof JChoice1>;

export const JChoice1 = JoiX.object().keys({
    kind:JoiX.kind<'JChoice1'>(),
    a : JoiX.number().required(),
    b : JoiX.string().required().required(),
    c : JoiX.boolean().required()
});

export type TJChoice2 = JoiX.ExtractFromSchema<typeof JChoice2>;

export const JChoice2 = JoiX.object().keys({
    kind : JoiX.kind<'JChoice2'>(),
    d : JoiX.number().required(),
    e : JoiX.string().required().required(),
    f : JoiX.boolean().required()
}).required();
// typically ths had to be done
export type TSInterSection4 = TJChoice1 | TJChoice2;

export type TSInterSection = typeof JChoice1['__tsType']['kind'] | typeof JChoice2['__tsType']['kind'];

export interface IChoice2
{
    kind : 'Choice22'
}

export interface IChoice1
{
    kind : 'Choice11'
}

export interface IChoice <T extends string> {
    test : T
}
// This works..
export type IChoiceWrapper<T extends string> = IChoice<T> & JoiX.XPrimitive<T> & JoiX.StringSchema

//export type IChoiceWrapper<T extends string> = IChoice<T> & JoiX.XPrimitive<> & JoiX.StringSchema

export type TSInterSection2 = IChoiceWrapper<'Ch1'> | IChoiceWrapper<'Ch2'>

type testsdf = keyof TJChoice1

const list : TSInterSection;

function tesdt(s : TSInterSection2)
{
    const test : TSInterSection;
  

    switch(s.test)
    {
        case 'JChoice1':

        break;

    }
}

enum EnumA
{
    eA = 'test',
    eB = 'sdfsdf',
    eC = 'sdfsdfs',
    eD = 'sdfsdf'
}

type Keys1 = keyof typeof EnumA

const jjjj : Keys1 = 'eA'

type Keys = EnumLiterals<EnumA>

type EnumLiterals<T extends keyof typeof E> = {
[K in typeof T] : K
}

type uu<T> = T[keyof T];

type teszxct = uu<typeof EnumA>

export enum HttpMethod {
    GET = 'GET', POST = 'POST',
  }

  type Methods = {
    [M in HttpMethod]?: any;
  };

enum E {}


enum BasicEvents {
  Start = 'Sta',
  Finish = 'Finish'
}
enum AdvEvents {
  Pause = 'Pause',
  Resume = 'Resume'
}
function enumerate<T1 extends typeof E, T2 extends typeof E>(e1: T1, e2: T2) {
  enum Events {
    Restart = 'Restart'
  }
  return {Keys: Events as typeof Events & T1 & T2, type: Event as typeof Events | T1 | T2};
}

const e = enumerate(BasicEvents, AdvEvents);
type test2 = keyof e
type k = keyof test2

const u : test2 = e.Pause;
const uu :string = u.Finish



export const main = JoiX.object().keys({
        z : JoiX.number().required(),
       // y :
});

const schema = JoiX.object().keys({
    a: JoiX.any(),
    b: JoiX.any()
}).xor('a', 'b','c','d');

interface Kind
{
    kind : string
}

interface Square extends Kind {
    kind: "square";
    size: number;
}
interface Rectangle extends Kind{
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle extends Kind {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle ;

type KindTypeCheck<T extends Kind> = T

type Test = KindTypeCheck<Shape>

const test : Shape = {
kind:"square",
size : 234
} as

function area(s: Shape) {
    switch (s.kind) {
        case "square": return s.size * s.size;
        case "rectangle": return s.height * s.width;
        case "circle": return Math.PI * s.radius ** 2;
    }
}


*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLWZhY3Rvcnktc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbmZpZy1mYWN0b3J5L2NvbmZpZy1mYWN0b3J5LXNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQVFwQixRQUFBLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUM7SUFDbEQsT0FBTyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsS0FBSyxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsSUFBSSxFQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDL0IsTUFBTSxFQUFHLENBQUMsQ0FBQSxzRUFBc0U7Q0FDbkYsQ0FBQyxDQUFDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBbUxFIn0=