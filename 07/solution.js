const permutations = require('../utils/permutations');
const range = require('../utils/range');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const candidates = permutations(range(5));
    const outputs = candidates.map(p => p.reduce((val, n) => {
        const computer = new Computer([...arr], n);
        while (true) {
            const output = computer.run(val);
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
        let computers = p.map(n => new Computer([...arr], n));
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
}

class Computer {
    constructor(arr, phaseSetting) {
        this.arr = arr;
        this.phaseSetting = phaseSetting;
        this.pos = 0;
        this.output = null;
        this.hasUsedPhaseSetting = false;
        this.input = null;
        this.operations = {
            1: (v1, v2) => {
                this.arr[this.arr[this.pos + 3]] = v1 + v2;
                this.pos += 4;
            },
            2: (v1, v2) => {
                this.arr[this.arr[this.pos + 3]] = v1 * v2;
                this.pos += 4;
            },
            3: () => {
                this.arr[this.arr[this.pos + 1]] = this.pos == 0 ? this.phaseSetting : this.input;
                this.pos += 2;
            },
            4: v1 => {
                this.output = v1;
                this.pos += 2;
                return true;
            },
            5: (v1, v2) => {
                if (v1 != 0) {
                    this.pos = v2;
                }
                else {
                    this.pos += 3;
                }
            },
            6: (v1, v2) => {
                if (v1 == 0) {
                    this.pos = v2;
                }
                else {
                    this.pos += 3;
                }
            },
            7: (v1, v2) => {
                this.arr[this.arr[this.pos + 3]] = (v1 < v2) ? 1 : 0;
                pos += 4;
            },
            8: (v1, v2) => {
                this.arr[this.arr[this.pos + 3]] = (v1 == v2) ? 1 : 0;
                this.pos += 4;
            }
        }
    }

    run(input) {
        this.input = input;
        while (true) {
            const opcode = this.arr[this.pos] % 100;
            const strOpcode = `${this.arr[this.pos]}`.split('').reverse();
            const values = [2, 3].map(i => +strOpcode[i] == 1 ? this.arr[this.pos + i - 1] : this.arr[this.arr[this.pos + i - 1]])
    
            if (opcode == 99) {
                return {output: this.output, complete: true};
            } else {
                if (this.operations[opcode](...values)) {
                    return {output: this.output, complete: false};
                }
            }
        }
    }
}

module.exports = {parseInput, runPart1, runPart2};