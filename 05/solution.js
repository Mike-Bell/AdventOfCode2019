const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    return runComputer(1, [...arr]);
}

const runPart2 = arr => {
    return runComputer(5, [...arr]);
}

const runComputer = (input, arr) => {
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
            arr[arr[pos + 1]] = input;
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

module.exports = {parseInput, runPart1, runPart2};