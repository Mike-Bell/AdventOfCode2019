const fuelCalculator = require('./fuelCalculator');

const parseInput = input => input.split('\n').map(n => +n);

const runPart1 = nums => {
   return fuelCalculator.calculateTotalFuelNeeded(nums);
};

const runPart2 = nums => {
   return fuelCalculator.calculateTotalFuelNeededIncludingFuel(nums);
};

module.exports = {parseInput, runPart1, runPart2};