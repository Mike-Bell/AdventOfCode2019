const parseInput = input.split('\n').map(line => line.split(''));

const runPart1 = arr => computerFactory.create(arr).runToCompletion(1);

const runPart2 = arr => computerFactory.create(arr).runToCompletion(2);

module.exports = {parseInput, runPart1, runPart2};