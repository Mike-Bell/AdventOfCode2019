const computer = require('./computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = nums => {
    const newNums = computer.applyNounAndVerb(nums, 12, 2);
    
    return computer.run(newNums);
};

const runPart2 = nums => {
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

    return noun * 100 + verb;
};

module.exports = {parseInput, runPart1, runPart2};