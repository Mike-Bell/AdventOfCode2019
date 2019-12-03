const fs = require('fs');
const computer = require('./computer');

const input = fs.readFileSync('./input1.txt', 'utf8');
const nums = computer.stringToNums(input);

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