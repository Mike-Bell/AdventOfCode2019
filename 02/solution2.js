const computer = require('./computer');

const run = input => {
    const nums = input.split(',').map(n => +n);
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

module.exports = {run};