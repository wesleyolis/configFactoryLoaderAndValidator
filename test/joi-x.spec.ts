//import * as ts from "typescript";
import * as mocha from 'mocha';
import * as fs from 'fs';
import {exec as _exec} from 'child_process';
import {promisify, promisifyAll} from 'bluebird';
import {assert} from 'joi';
import { createCompiler, CompileResult } from 'tsc-simple';

const fsProm = promisifyAll(fs);

const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const exec = promisify(_exec);

 const compiler = createCompiler({defaultLibLocation: 'node_modules/typescript/lib'});

 const r: CompileResult = compiler.compile('let x = 3 + 2');
/*
const tsconfig = {
    "compilerOptions": {
        "declaration": true,
        "noLib": true,
        "typeRoots": []
    } as ts.CompilerOptions,
    "files": [
        "node_modules/typescript/lib/lib.es5.d.ts",
        "node_modules/typescript/lib/lib.es2015.core.d.ts"
    ]
};
*/
const tsconfig = {
    "compilerOptions": {
        project : "tsconfig-test.json"
    } //as ts.CompilerOptions
};


// const tsConfig  =
// {
//     project : "tsconfig-test.json",   
// }
// ;


// {
//     "extends": "./tsconfig-base",
//     "compilerOptions": {
//     "outDir": "lib-test",
//       "rootDir": "test"
//     },
//     "include": [
//       "test/**/*.spec.ts"
//     ]
// //   }

// function compile(fileNames: string[], options: ts.CompilerOptions): void {
//     let program = ts.createProgram(fileNames, options);
//     let emitResult = program.emit();

//     let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
//     //console.log(JSON.stringify(allDiagnostics));
//     allDiagnostics.forEach(diagnostic => {
//         if (diagnostic.file) {
//             let loc = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
//             let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
//             console.log(`${diagnostic.file.fileName} (${loc.line + 1},${loc.character + 1}): ${message}`);
//         }
//         else {
//             console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
//         }
//     });

//     let exitCode = emitResult.emitSkipped ? 1 : 0;
//     console.log(`Process exiting with code '${exitCode}'.`);
//     process.exit(exitCode);
// }

// // compile(process.argv.slice(2), {
// //     noEmitOnError: true, noImplicitAny: true,
// //     target: ts.ScriptTarget.ES5, module: ts.ModuleKind.CommonJS
// // });

// function tsCompileTest(source : string)
// {
//     let result = ts.transpileModule(source, { reportDiagnostics: true, compilerOptions: tsConfig });

//     console.log(JSON.stringify(result));
// }

const ImportJoiXSource : string = `import * as JoiX from '../src/joi-x'`;

// The lack of presents of varible or incorrect varible assignments means it is working
describe("JoiX, Compiler Feedback, Have to use exhaustive negative testing and postive testing", () =>
{
    /*
    it.only("File", () =>
    {
        //compile(['./test/joi-x-cases/case1'], tsConfig);

        const compiler = createCompiler({tsconfig});

        const r = compiler.compile('let x = z + 2');
        const messages = r.diagnostics.map(d => r.formatDiagnostic(d));
        console.dir(messages);
    });*/

    it("Object", async function () {
        
        const source = `
            ${ImportJoiXSource}

            const objectSchemaDef = {
                numberRequired: number().required()
            };
            
            const instanceCompilers: ExtractFromObject<typeof objectSchemaDef>= {
                numberRequired: undefined
            }`;
/*
            if (!await exists('.joiX'))
                await mkdir('.joiX');
            
            await writeFile('.joiX/test_source.ts', source);
            //const results = 
            await exec("npm run tsc -- -p './test/joi-x-cases/tsconfig-test-joi-x.json'")
            //.then(()=>
            */
        
            // {
            //     console.log('args:' + arguments);  
            // }).catch(() =>
            // {
            //     console.log('catch:' + arguments); 
            // });

            // console.log(JSON.stringify(results.stdout));

            // console.log(JSON.stringify(results.stdin));

       // tsCompileTest(source);
    });
});


// const objectSchema = {
//     numberRequired: number().required().min(100).max(200),
//     numberNotRequired: number().min(100).allow(null),
//     myString: string().regex(/sdfsfd/).required(),
//     myObj: object().keys({
//       a: string().required(),
//       b: object().keys({
//         c: number().required()
//       }).required()
//     }).required(),
//     myArray: array().items(object().keys({
//       a1: number().required()
//     }).required()).required()
//   };
  
//   const instance: ExtractFromObject<typeof objectSchema>= {
//     numberRequired: 42,
  
//     numberNotRequired : undefined,
//     myString: '',
//     myObj: {
//       a: 'sdsa',
//       b: {
//         c: 1
//       }
//     },
//     myArray: [{
//       a1: 2
//     }]
//   };
  
