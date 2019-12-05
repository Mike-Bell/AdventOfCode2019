const range = require('../utils/range');

const run = passwordRange => range(passwordRange[0], passwordRange[1]).filter(password => {
    const windows = ('' + password).split('')
        .reduce((acc, _, i, o) => i > 0 ? [...acc, o.slice(i - 1, i + 1)] : acc, []);

    return windows.some(w => w[0] == w[1]) && !windows.some(w => w[0] > w[1]);
}).length;

module.exports = {run};