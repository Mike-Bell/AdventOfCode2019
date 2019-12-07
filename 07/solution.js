const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const candidates = getPermutations([0, 1, 2, 3, 4]);
    const outputs = candidates.map(p => p.reduce((val, n) => runComputer(val, n, arr), 0));
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

2

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

module.exports = {parseInput, runPart1};