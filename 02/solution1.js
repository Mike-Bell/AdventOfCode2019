const inputHelper = require('../util/inputHelper');
const computer = require('./computer');

const nums = inputHelper.parseInputToNums(2);
const newNums = computer.applyNounAndVerb(nums, 12, 2);

const answer = computer.run(newNums);

console.log(answer);