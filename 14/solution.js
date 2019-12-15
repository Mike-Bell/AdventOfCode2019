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

const runPart1 = reactions => {
   return getOreNeededFor('FUEL', 1, reactions, {});
};

const runPart2 = reactions => {
   let total = 0;
   const T = 1000 * 1000 * 1000 * 1000;
   const leftOvers = {};
   let fuel = 0;
   let cyclesToRun = 1;

   while (true) {
      const oreNeededForCycles = getOreNeededFor('FUEL', cyclesToRun, reactions, leftOvers);
      if (total + oreNeededForCycles < T) {
         total += oreNeededForCycles;
         fuel += cyclesToRun;
         
         const remainingOreToUse = T - total;
         cyclesToRun = Math.floor(remainingOreToUse * cyclesToRun / oreNeededForCycles);
      } else {
         if (cyclesToRun > 1) {
            cyclesToRun = Math.floor(cyclesToRun / 2);
            continue;
         }
         break;
      }
   }

   return fuel;
};

module.exports = {parseInput, runPart1, runPart2};