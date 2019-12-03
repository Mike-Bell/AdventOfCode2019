const fs = require('fs');

const parseInputToNums = dayNum => {
    const input = fs.readFileSync(`../inputs/input${dayNum}.txt`, 'utf8');
    if (input.indexOf(',') >= 0) {
        return input.split(',').map(n => +n);
    } else {
        return input.split('\n').map(n => +n);
    }
}

module.exports = {parseInputToNums};