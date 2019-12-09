const permutations = require('../utils/permutations');
const range = require('../utils/range');
const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const candidates = permutations(range(5));
    const outputs = candidates.map(p => p.reduce((val, n) => {
        return computerFactory.create([...arr], n, true).runToCompletion(val);
    }, 0));
    return Math.max(...outputs);
};

const runPart2 = arr => {
    const candidates = permutations(range(5, 10));
    const outputs = candidates.map(p => {
        let val = 0;
        let valFromE = -1;
        let amplifier = 0;
        let computers = p.map(n => computerFactory.create([...arr], n, true));
        while (true) {
            const output = computers[amplifier].run(val);
            val = output.output;
            
            if (amplifier === 4) {
                valFromE = val;
            }

            if (output.complete) {
                return valFromE;
            }
            
            amplifier = (amplifier + 1) % 5;
        }
    });
    return Math.max(...outputs);
};

module.exports = {parseInput, runPart1, runPart2};