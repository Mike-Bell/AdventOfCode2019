const computerFactory = require('../shared/computer');
const clamp = require('../utils/clamp');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
    const outputs = computerFactory.create(arr).runToCompletionWithCompleteOutputHistory();
    return outputs.filter((o, i) => o === 2 && i % 3 === 2).length;
};

const runPart2 = arr => {
    arr[0] = 2;
    const computer = computerFactory.create(arr);
    let score = 0;
    let ballPos = null;
    let paddlePos = null;
    let input = 0;
    let outputTriplet = [];
    while (true) {
        const output = computer.run(input);
        
        outputTriplet.push(output.output);
        if (outputTriplet.length === 3) {
            if (outputTriplet[0] === -1 && outputTriplet[1] === 0) {
                score = outputTriplet[2];
            } else if (outputTriplet[2] === 4) {
                ballPos = outputTriplet[0];
            } else if (outputTriplet[2] === 3) {
                paddlePos = outputTriplet[0];
            }
            outputTriplet = [];
        }

        if (ballPos != null) {
            input = clamp(ballPos - paddlePos, -1, 1);
        }

        if (output.complete) {
            break;
        }
    }

    return score;
};

module.exports = {parseInput, runPart1, runPart2};