const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const runPart1 = arr => {
   const computer = computerFactory.create(arr);
   const grid = [[1]];
   let direction = 1;
   let x = 0;
   let y = 0;

   const move = multiplier => {
      ({
         1: () => y = y + multiplier,
         2: () => y = y - multiplier,
         3: () => x = x - multiplier,
         4: () => x = x + multiplier
      })[direction]();
   };

   const turnRight = () => {
      direction = {
         1: 4,
         2: 3,
         3: 1,
         4: 2
      }[direction];
   };

   const assignTile = val => {
      grid[x] = grid[x] || [];
      grid[x][y] = val;
   };

   const getTile = (cx, cy) => (grid[cx] || [])[cy];

   while (true) {
      turnRight();

      const out = computer.run(direction);
      
      if (out.output === 2) {
         move(1);
         assignTile(2);
         break;
      } else if (out.output === 1) {
         move(1);
         assignTile(1);
      } else if (out.output === 0) {
         move(1);
         assignTile(0);
         move(-1);
         turnRight();
         turnRight();
      }
   }

   const findInitial = (cx, cy, last, steps) => {
      if (cx === 0 && cy === 0) {
         return steps;
      }

      const candidates = [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]].filter(pos => {
         if (pos[0] === last[0] && pos[1] === last[1]) {
            return false;
         }

         return getTile(pos[0], pos[1]);
      });

      return Math.min(...candidates.map(pos => findInitial(pos[0], pos[1], [cx, cy], steps + 1)));
   };

   return findInitial(x, y, [NaN, NaN], 0);
};

module.exports = {parseInput, runPart1};