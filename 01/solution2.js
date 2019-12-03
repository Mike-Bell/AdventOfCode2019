const inputHelper = require('../util/inputHelper');
const fuelCalculator = require('./fuelCalculator');

const nums = inputHelper.parseInputToNums(1);

const answer = fuelCalculator.calculateTotalFuelNeededIncludingFuel(nums);

console.log(answer);