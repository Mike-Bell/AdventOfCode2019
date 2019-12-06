const parseInput = input => input.split(',').map(n => +n); 

const runPart1 = arr => {
    arr = [...arr];
    let input = 1;
    let pos = 0;
    let output = 0;

    while (true) {
        const opcode = arr[pos] % 100;
        const strOpcode = arr[pos].toString().split('').reverse();
        const v1 = +strOpcode[2] == 1 ? arr[pos + 1]: arr[arr[pos + 1]];
        const v2 = +strOpcode[3] == 1 ? arr[pos + 2]: arr[arr[pos + 2]];

        switch (opcode) {
            case 1: {
                arr[arr[pos + 3]] = v1 + v2;
                pos += 4;
                break;
            }
            case 2: {
                arr[arr[pos + 3]] = v1 * v2;
                pos += 4;
                break;
            }
            case 3: {
                arr[arr[pos + 1]] = input;
                pos += 2;
                break;
            }
            case 4: {
                output = v1;
                pos += 2;
                break;
            }
            case 99: {
                return output;
            }
        }
    }
}

const runPart2 = arr => {
    arr = [...arr];
    let input = 5;
    let pos = 0;
    let output = 0;

    while (true) {
        const opcode = arr[pos] % 100;
        const strOpcode = arr[pos].toString().split('').reverse();
        const v1 = +strOpcode[2] == 1 ? arr[pos + 1] : arr[arr[pos + 1]];
        const v2 = +strOpcode[3] == 1 ? arr[pos + 2] : arr[arr[pos + 2]];

        switch (opcode) {
            case 1: {
                arr[arr[pos + 3]] = v1 + v2;
                pos += 4;
                break;
            }
            case 2: {
                arr[arr[pos + 3]] = v1 * v2;
                pos += 4;
                break;
            }
            case 3: {
                arr[arr[pos + 1]] = input;
                pos += 2;
                break;
            }
            case 4: {
                output = v1;
                pos += 2;
                break;
            }
            case 5: {
                if (v1 != 0) {
                    pos = v2;
                }
                else {
                    pos += 3;
                }
                break;
            }
            case 6: {
                if (v1 == 0) {
                    pos = v2;
                }
                else {
                    pos += 3;
                }
                break;
            }
            case 7: {
                arr[arr[pos + 3]] = (v1 < v2) ? 1 : 0;
                pos += 4;
                break;
            }
            case 8: {
                arr[arr[pos + 3]] = (v1 == v2) ? 1 : 0;
                pos += 4;
                break;
            }
            case 99: {
                return output;
            }
        }
    }
}

module.exports = {parseInput, runPart1, runPart2};