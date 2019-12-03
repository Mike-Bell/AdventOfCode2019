const fs = require('fs');
const computer = require('./computer');

const input = fs.readFileSync('./input1.txt', 'utf8');
const nums = computer.stringToNums(input);
const newNums = computer.applyNounAndVerb(nums, 12, 2);

const answer = computer.run(newNums);

console.log(answer);