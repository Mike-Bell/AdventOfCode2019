const fuelCalcuator = require('./fuelCalculator');

describe('fuelCalcuator', () => {
    describe('calculateFuelNeeded', () => {
        it('passes examples', () => {
            expect(fuelCalcuator.calculateFuelNeeded(12)).toBe(2);
            expect(fuelCalcuator.calculateFuelNeeded(14)).toBe(2);
            expect(fuelCalcuator.calculateFuelNeeded(1969)).toBe(654);
            expect(fuelCalcuator.calculateFuelNeeded(100756)).toBe(33583);
        });
    });
    
    describe('calculateTotalFuelNeeded', () => {
        it('passes examples', () => {
            expect(fuelCalcuator.calculateTotalFuelNeeded([12, 14])).toBe(4);
        });
    });

    describe('calculateFuelNeededIncludingFuel', () => {
        it('passes example', () => {
            expect(fuelCalcuator.calculateFuelNeededIncludingFuel(100756)).toBe(50346);
        });
    });
});