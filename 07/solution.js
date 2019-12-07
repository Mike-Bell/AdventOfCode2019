const permutations = require('../utils/permutations');
const range = require('../utils/range');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const candidates = permutations(range(5));
    const outputs = candidates.map(p => p.reduce((val, n) => {
        const computer = computerFactory([...arr], n);
        while (true) {
            const output = computer(val);
            if (output.complete) {
                return output.output;
            }
        }
    }, 0));
    return Math.max(...outputs);
}

const runPart2 = arr => {
    const candidates = permutations(range(5, 10));
    const outputs = candidates.map(p => {
        let val = 0;
        let valFromE = -1;
        let amplifier = 0;
        let computers = p.map(n => computerFactory([...arr], n));
        while (true) {
            const output = computers[amplifier](val);
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
}

const computerFactory = (arr, phaseSetting) => {
    let pos = 0;
    let output = null;
    let hasUsedPhaseSetting = false;
    let input = null;
    
    const operations = {
        1: (v1, v2) => {
            arr[arr[pos + 3]] = v1 + v2;
            pos += 4;
        },
        2: (v1, v2) => {
            arr[arr[pos + 3]] = v1 * v2;
            pos += 4;
        },
        3: () => {
            arr[arr[pos + 1]] = hasUsedPhaseSetting ? input : phaseSetting;
            hasUsedPhaseSetting = true;
            pos += 2;
        },
        4: v1 => {
            output = v1;
            pos += 2;
            return true;
        },
        5: (v1, v2) => {
            if (v1 != 0) {
                pos = v2;
            }
            else {
                pos += 3;
            }
        },
        6: (v1, v2) => {
            if (v1 == 0) {
                pos = v2;
            }
            else {
                pos += 3;
            }
        },
        7: (v1, v2) => {
            arr[arr[pos + 3]] = (v1 < v2) ? 1 : 0;
            pos += 4;
        },
        8: (v1, v2) => {
            arr[arr[pos + 3]] = (v1 == v2) ? 1 : 0;
            pos += 4;
        }
    }

    return inp => {
        input = inp;
        while (true) {
            const opcode = arr[pos] % 100;
            const strOpcode = `${arr[pos]}`.split('').reverse();
            const values = [2, 3].map(i => +strOpcode[i] == 1 ? arr[pos + i - 1] : arr[arr[pos + i - 1]])
    
            if (opcode == 99) {
                return {output: output, complete: true};
            } else {
                if (operations[opcode](...values)) {
                    return {output: output, complete: false};
                }
            }
        }
    }
};

module.exports = {parseInput, runPart1, runPart2};