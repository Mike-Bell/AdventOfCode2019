const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const outputs = computerFactory.create(arr).runToCompletionWithCompleteOutputHistory();
    return outputs.filter((o, i) => o === 2 && i % 3 === 2).length;
};

module.exports = {parseInput, runPart1};