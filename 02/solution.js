const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const applyNounAndVerb = (nums, noun, verb) => {
   nums = [...nums];
   nums[1] = noun;
   nums[2] = verb;
   return nums;
};

const runPart1 = nums => {
   const newNums = applyNounAndVerb(nums, 12, 2);
   const computer = computerFactory.create(newNums);
   computer.runToCompletion();
   return computer.getElementZero();
};

const runPart2 = nums => {
   let noun;
   let verb;
   outerLoop:
   for (noun = 0; noun < 100; noun++) {
      for (verb = 0; verb < 100; verb++) {
         const newNums = applyNounAndVerb(nums, noun, verb);
         const computer = computerFactory.create(newNums);
         computer.runToCompletion();
         if (computer.getElementZero() == 19690720) {
            break outerLoop;
         }
      }
   }

   return noun * 100 + verb;
};

module.exports = {parseInput, runPart1, runPart2};