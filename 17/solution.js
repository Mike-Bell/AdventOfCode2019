const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
   const outputs = computerFactory.create(arr).runToCompletionWithCompleteOutputHistory();
   const map = [[]];
   outputs.forEach(o => {
      (({
         35: () => map[map.length - 1].push(1),
         46: () => map[map.length - 1].push(0),
         10: () => map.push([])
      })[o] || (i => map[map.length - 1].push(i)))(0);
   });

   const getTile = (x, y) => (map[y] || [])[x];

   let total = 0;
   map.forEach((line, y) => {
      line.forEach((ele, x) => {
         const values = [[0, -1], [-1, 0], [0, 0], [1, 0], [0, 1]].map(offset => getTile(x + offset[0], y + offset[1]));
         if (values.every(v => v === 1)) {
            total += x * y;
         }
      });
   });

   return total;
};

module.exports = {parseInput, runPart1};