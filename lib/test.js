"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Middle {
    method() {
        console.log("Middle");
        return Promise.resolve();
        //console.log("Middle-After");
    }
}
class Top {
    method() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Top");
            yield delay(200);
            console.log("Top-After");
        });
    }
}
function testMethod() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Non:" + (yield testNonAsync()));
    });
}
function testNonAsync() {
    return 5;
}
console.log("Testing: " + testMethod());
const V1 = new Middle();
const test = () => __awaiter(this, void 0, void 0, function* () {
    console.log("V1 Before");
    yield V1.method();
    console.log("V1 After");
});
test();
// printDelayed is a 'Promise<void>'
function printDelayed(elements) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const element of elements) {
            yield delay(200);
            console.log(element);
        }
    });
}
function delay(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    });
}
/*
printDelayed(["Hello", "beautiful", "asynchronous", "world"]).then(() => {
    console.log();
    console.log("Printed every element!");
});
*/ 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFTQTtJQUVJLE1BQU07UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDekIsOEJBQThCO0lBQ2xDLENBQUM7Q0FDSjtBQUVEO0lBRVUsTUFBTTs7WUFFUixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ25CLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0IsQ0FBQztLQUFBO0NBQ0o7QUFFRDs7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBRyxNQUFNLFlBQVksRUFBRSxDQUFBLENBQUMsQ0FBQztJQUcvQyxDQUFDO0NBQUE7QUFFQTtJQUVHLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUssVUFBVSxFQUFFLENBQUMsQ0FBQztBQUUxQyxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLE1BQU0sSUFBSSxHQUFHLEdBQVMsRUFBRTtJQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDeEIsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLEVBQUUsQ0FBQztBQUVQLG9DQUFvQztBQUNwQyxzQkFBNEIsUUFBa0I7O1FBQzFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDN0IsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDO0lBQ0wsQ0FBQztDQUFBO0FBRUQsZUFBcUIsWUFBb0I7O1FBQ3JDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRTtZQUMvQixVQUFVLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBRUQ7Ozs7O0VBS0UifQ==