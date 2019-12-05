const range = require('../utils/range');

const run = passwordRange => {
    return range(passwordRange[0], passwordRange[1]).filter(password => {
        let hasDouble = false;
        let alwaysIncrements = true;
        const strPassword = '' + password;

        [...strPassword].forEach((c, ci) => {
            const n = +c;
            const lastN = strPassword[ci - 1];
            if (lastN > n) {
                alwaysIncrements = false;
            } else if (lastN == n) {
                hasDouble = true;
            }
        });

        return hasDouble && alwaysIncrements;
    }).length;
};

module.exports = {run};