const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const candidates = getPermutations([0, 1, 2, 3, 4]);
    const outputs = candidates.map(p => p.reduce((val, n) => runComputer(val, n, arr), 0));
    return Math.max(...outputs);
}

const runPart2 = arr => {
    const candidates = getPermutations([5, 6, 7, 8, 9]);
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

const runComputer = (input, phaseSetting, arr) => {
    let pos = 0;
    let output = 0;

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
            arr[arr[pos + 1]] = pos == 0 ? phaseSetting : input;
            pos += 2;
        },
        4: v1 => {
            output = v1;
            pos += 2;
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

    while (true) {
        const opcode = arr[pos] % 100;
        const strOpcode = arr[pos].toString().split('').reverse();
        const values = [2, 3].map(i => +strOpcode[i] == 1 ? arr[pos + i - 1] : arr[arr[pos + i - 1]])

        if (opcode == 99) {
            return output;
        } else {
            operations[opcode](...values);
        }
    }
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
            const strOpcode = this.arr[this.pos].toString().split('').reverse();
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

const getPermutations = inputArr => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}

module.exports = {parseInput, runPart1, runPart2};