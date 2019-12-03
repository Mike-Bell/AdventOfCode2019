const fs = require('fs');
const solutionArg = process.argv[2];

if (!solutionArg) {
    console.log('Provide a number or number-number arg.\n For example: "npm run solution 1" or "npm run solution 7-2"')
    return;
}

const args = solutionArg.split('-');
let day = args[0];
if (day.length == 1) {
    day = `0${day}`;
}

const input = fs.readFileSync(`./inputs/input${day}.txt`, 'utf8');

const runSolution = n => {
    const main = require(`./${day}/solution${n}.js`);
    const answer = main.run(input);
    console.log(answer);
}

if (args.length == 1) {
    runSolution(1);
    runSolution(2);
} else {
    const oneOrTwo = args[1];
    if (oneOrTwo != 1 && oneOrTwo != 2) {
        console.log('Number after dash must be 1 or 2');
        return;
    }
    runSolution(oneOrTwo);
}