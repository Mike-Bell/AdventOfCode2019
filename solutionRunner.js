const fs = require('fs');
const solutionArg = process.argv[2];

if (!solutionArg) {
   console.log('Provide a number or number-number arg.\n For example: "npm run solution 1" or "npm run solution 7-2"');
   process.exit();
}

const args = solutionArg.split('-');
let day = args[0];
if (day.length == 1) {
   day = `0${day}`;
}

let input = fs.readFileSync(`./inputs/input${day}.txt`, 'utf8');
const solutionRunner = require(`./${day}/solution.js`);
if (solutionRunner.parseInput) {
   input = solutionRunner.parseInput(input);
}

if (args.length == 1) {
   console.log(solutionRunner.runPart1(input));
   console.log(solutionRunner.runPart2(input));
} else {
   const oneOrTwo = args[1];
   if (oneOrTwo != 1 && oneOrTwo != 2) {
      console.log('Number after dash must be 1 or 2');
      process.exit();
   }
   console.log(solutionRunner[`runPart${oneOrTwo}`](input));
}