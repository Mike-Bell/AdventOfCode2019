const computer = require('./computer');

const run = input => {
    const nums = input.split(',').map(n => +n);
    const newNums = computer.applyNounAndVerb(nums, 12, 2);
    
    return computer.run(newNums);
};

module.exports = {run};