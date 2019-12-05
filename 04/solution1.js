const range = require('../utils/range');

const run = passwordRange => range(passwordRange[0], passwordRange[1])
    .filter(password => ('' + password).split('')
        .reduce((acc, _, i, o) => i > 0 ? [...acc, o.slice(i - 1, i + 1)] : acc, [])
        .reduce((acc, w) => [acc[0] || w[0] == w[1], acc[1] && w[1] >= w[0]], [false, true])
        .every(ele => ele)
    ).length;

module.exports = {run};