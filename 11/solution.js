const parseInput = input => input.split(',').map(n => +n);
const computerFactory = require('../shared/computer');

const runPart1 = arr => {
    const grid = [];
    let coords = [0, 0];
    let direction = [0, 1];
    const rotateDirection = n => {
        direction = [(n ? 1 : -1) * direction[1], (n ? -1 : 1) * direction[0]];
    };
    const computer = computerFactory.create(arr);
    while(true) {
        const [x, y] = coords;
        grid[x] = grid[x] || [];
        const currentColor = grid[x][y] || 0;
        const output = computer.run(currentColor);
        if (output.complete) {
            break;
        }

        grid[x][y] = output.output;
        const output2 = computer.run(currentColor);
        if (output2.complete) {
            break;
        }
        rotateDirection(output2.output);
        coords = [x + direction[0], y + direction[1]];
    }

    let total = 0;
    for (const x in grid) {
        for (const y in grid[x]) {
            total++;
        }
    }

    return total;
};

module.exports = {parseInput, runPart1};