const fuelCalculator = require('./fuelCalculator');

const run = input => {
    const nums = input.split('\n').map(n => +n);
    return fuelCalculator.calculateTotalFuelNeededIncludingFuel(nums);
}

module.exports = {run};