const fs = require('fs');
const fuelCalculator = require('./fuelCalculator');

const input = fs.readFileSync('./input1.txt', 'utf8');
const nums = input.split('\n').map(n => +n);

const answer = fuelCalculator.calculateTotalFuelNeeded(nums);

console.log(answer);