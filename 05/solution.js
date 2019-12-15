const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
   return computerFactory.create([...arr]).runToCompletion(1);
};

const runPart2 = arr => {
   return computerFactory.create([...arr]).runToCompletion(5);
};

module.exports = {parseInput, runPart1, runPart2};