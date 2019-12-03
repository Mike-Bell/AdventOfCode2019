const computer = require('./computer');

const run = nums => {
    const newNums = computer.applyNounAndVerb(nums, 12, 2);
    
    return computer.run(newNums);
};

module.exports = {run};