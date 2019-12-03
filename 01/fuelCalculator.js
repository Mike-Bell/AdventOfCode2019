const calculateFuelNeeded = mass => Math.floor(mass / 3) - 2;

const calculateTotalFuelNeeded = masses => masses.reduce((a, b) => a + calculateFuelNeeded(b), 0);

const calculateFuelNeededIncludingFuel = fuel => {
    let total = 0;
    while (true) {
        const moreFuel = calculateFuelNeeded(fuel);
        
        if (moreFuel <= 0) {
            break;
        }

        total += moreFuel;
        fuel = moreFuel;
    }

    return total;
};

const calculateTotalFuelNeededIncludingFuel = masses => masses.reduce((a, b) => a + calculateFuelNeededIncludingFuel(b), 0);

module.exports = {
    calculateFuelNeeded,
    calculateTotalFuelNeeded,
    calculateFuelNeededIncludingFuel,
    calculateTotalFuelNeededIncludingFuel
};