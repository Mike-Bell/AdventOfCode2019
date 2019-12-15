const sum = require('../utils/sum');

const parseInput = input => input.split('\n').map(line => line.split(')'));

const getAdjacents = (node, edges) => edges.filter(e => e[0] === node)
   .map(e => e[1])
   .concat(edges.filter(e => e[1] === node)
      .map(e => e[0])
   );

const getChildren = (node, edges) => {
   return edges.filter(edge => edge[0] === node).map(edge => edge[1]);
};

const sumChildrenDepths = (depth, node, edges) => {
   return depth + sum(getChildren(node, edges).map(c => sumChildrenDepths(depth + 1, c, edges)));
};

const findSanta = (depth, node, edges, traversed) => {
   const adjacents = getAdjacents(node, edges).filter(n => !traversed.includes(n));
   if (!adjacents.some(n => n)) {
      return -1;
   }

   for (const i in adjacents) {
      const n = adjacents[i];
      if (n === 'SAN') {
         return depth;
      }
        
      const santaDepth = findSanta(depth + 1, n, edges, [...traversed, n]);
      if (santaDepth !== -1) {
         return santaDepth;
      }
   }

   return -1;
};

const runPart1 = edges => {
   return sumChildrenDepths(0, 'COM', edges);
};

const runPart2 = edges => {
   return findSanta(0, 'YOU', edges, []) - 1;
};

module.exports = {parseInput, runPart1, runPart2};