const fuelCalculator = require('./fuelCalculator');

const run = nums => {
    return fuelCalculator.calculateTotalFuelNeeded(nums);
}

module.exports = {run};