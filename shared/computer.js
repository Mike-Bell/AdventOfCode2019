const create = (arr, phaseSetting, usePhaseSetting) => {
    let pos = 0;
    let output = null;
    let hasUsedPhaseSetting = !usePhaseSetting;
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

    const run = inp => {
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
    };

    const runToCompletion = inp => {
        while (true) {
            const output = run(inp);
            if (output.complete) {
                return output.output;
            }
        }
    };

    const getElementZero = () => arr[0];

    return {run, runToCompletion, getElementZero};
};

module.exports = {create};