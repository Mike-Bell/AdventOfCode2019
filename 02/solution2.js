const inputHelper = require('../util/inputHelper');
const computer = require('./computer');

const nums = inputHelper.parseInputToNums(2);

let noun;
let verb;
outerLoop:
for (noun = 0; noun < 100; noun++) {
    for (verb = 0; verb < 100; verb++) {
        const newNums = computer.applyNounAndVerb(nums, noun, verb);
        if (computer.run(newNums) == 19690720) {
            break outerLoop;
        }
    }
}

console.log(noun * 100 + verb);