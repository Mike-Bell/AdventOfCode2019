const fs = require('fs');
const computer = require('./computer');

const input = fs.readFileSync('./input1.txt', 'utf8');
const nums = input.split(',').map(n => +n);

nums[1] = 12;
nums[2] = 2;

const answer = computer.run(nums);
console.log(answer);