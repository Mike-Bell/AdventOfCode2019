const run = range => {
    let validPasswords = 0;
    for (let i = range[0]; i < range[1]; i++) {
        let hasDouble = false;
        let alwaysIncrements = true;
        const strI = '' + i;

        [...strI].forEach((c, ci) => {
            const n = +c;
            const lastN = strI[ci - 1];
            if (lastN > n) {
                alwaysIncrements = false;
            } else if (lastN == n) {
                hasDouble = true;
            }
        });

        if (hasDouble && alwaysIncrements) {
            validPasswords++;
        }
    }

    return validPasswords;
};

module.exports = {run};