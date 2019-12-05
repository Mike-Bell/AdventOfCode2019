const range = require('../utils/range');

const run = passwordRange => range(passwordRange[0], passwordRange[1]).filter(password => {
    const windows = ('' + password).split('')
        .reduce((acc, _, i, o) => i > 0 ? [...acc, [o[i - 2], o[i - 1], o[i], o[i + 1]]] : acc, []);

    return windows.some(w => w[1] == w[2] && w[1] != w[0] && w[1] != w[3]) && !windows.some(w => w[1] > w[2]);
}).length;

module.exports = {run};