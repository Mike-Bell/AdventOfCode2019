const range = require('../utils/range');

const parseInput = input => input.split('-').map(n => +n);

const runPart1 = passwordRange => range(passwordRange[0], passwordRange[1])
    .filter(password => ('' + password).split('')
        .reduce((acc, _, i, o) => i > 0 ? [...acc, o.slice(i - 1, i + 1)] : acc, [])
        .reduce((acc, w) => [acc[0] || w[0] == w[1], acc[1] && w[1] >= w[0]], [false, true])
        .every(ele => ele)
    ).length;

const runPart2 = passwordRange => range(passwordRange[0], passwordRange[1])
    .filter(password => ('' + password).split('')
        .reduce((acc, _, i, o) => i > 0 ? [...acc, [o[i - 2], o[i - 1], o[i], o[i + 1]]] : acc, [])
        .reduce((acc, w) => [acc[0] || w[1] == w[2] && w[1] != w[0] && w[1] != w[3], acc[1] && w[2] >= w[1]], [false, true])
        .every(ele => ele)
    ).length;

module.exports = {parseInput, runPart1, runPart2};