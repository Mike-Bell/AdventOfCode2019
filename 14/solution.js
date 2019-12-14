const sum = require('../utils/sum');

const parseInput = input => input.split('\n').map(line => {
    const parseCompound = c => {
        const splitC = c.trim().split(' ');
        return {amount: +splitC[0], name: splitC[1]};
    };

    const splitLine = line.split('=>');
    const reactants = splitLine[0].trim().split(',').map(parseCompound);
    const product = parseCompound(splitLine[1].trim());

    return {reactants, product};
});

const runPart1 = reactions => {
   return getOreNeededFor('FUEL', 1, reactions, {}); 
};

const getOreNeededFor = (compound, amount, reactions, leftOvers) => {
    if (compound === 'ORE') {
        return amount;
    }

    leftOvers[compound] = leftOvers[compound] || 0;
    const leftOversTouse = Math.min(amount, leftOvers[compound]);
    amount -= leftOversTouse;
    leftOvers[compound] -= leftOversTouse;
    if (amount === 0) {
        return 0;
    }

    const reaction = reactions.find(r => r.product.name === compound);
    const reactionsNeeded = Math.ceil(amount / reaction.product.amount);
    const amountProduced = reaction.product.amount * reactionsNeeded;
    
    leftOvers[compound] += amountProduced - amount;
    return sum(reaction.reactants.map(r => getOreNeededFor(r.name, r.amount * reactionsNeeded, reactions, leftOvers)));
};

module.exports = {parseInput, runPart1};