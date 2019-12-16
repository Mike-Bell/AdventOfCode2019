const range = require('../utils/range');
const sum = require('../utils/sum');

const parseInput = input => input.split('').map(n => +n);

const runPart1 = arr => {
   const patterns = arr.map((_, i) => [0, 1, 0, -1]
      .map(p => new Array(i + 1).fill(p))
      .reduce((acc, curr) => acc.concat(curr), [])
   );

   let current = [...arr];
   let next = [];
   range(100).forEach(i => {
      next = range(arr.length).map(j => {
         const pattern = patterns[j];
         const patternLength = pattern.length;
         return Math.abs(sum(current.map((a, k) => {
            let p = pattern[k % patternLength + 1];
            p = typeof p === 'undefined' ? pattern[0] : p;
            return a * p;
         }))) % 10;
      });
      current = [...next];
   });

   return next.slice(0, 8).reduce((acc, curr) => acc + curr, '');
};

const repeatArray = (arr, count) => {
   let b = [];
   for (let i = 0; i < count; i++) {
      b = b.concat(arr);
   }
   return b;
};

const runPart2 = arr => {
   const outputIndex = +arr.slice(0, 7).reduce((acc, curr) => acc + curr, '');
   arr = repeatArray(arr, 10000);

   let current = [...arr];
   const next = [];
   range(100).forEach(i => {
      range(arr.length).reverse().forEach(j => {
         next[j] = Math.abs((next[j + 1] || 0) + current[j]) % 10;
      });
      current = [...next];
   });

   return next.slice(outputIndex, outputIndex + 8).reduce((acc, curr) => acc + curr, '');
};

module.exports = {parseInput, runPart1, runPart2};