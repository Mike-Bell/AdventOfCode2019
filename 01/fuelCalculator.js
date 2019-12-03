const calculateFuelNeeded = mass => Math.floor(mass / 3) - 2;

const calculateTotalFuelNeeded = masses => masses.reduce((a, b) => a + calculateFuelNeeded(b), 0);

module.exports = {calculateFuelNeeded, calculateTotalFuelNeeded};