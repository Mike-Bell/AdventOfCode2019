const fuelCalculator = require('./fuelCalculator');

const run = nums => {
    return fuelCalculator.calculateTotalFuelNeededIncludingFuel(nums);
}

module.exports = {run};