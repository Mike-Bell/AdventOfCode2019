const computerFactory = require('../shared/computer');

const parseInput = input => input.split(',').map(n => +n);

const exploreUntil = (arr, until) => {
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

   while (true) {
      turnRight();

      const out = computer.run(direction);
      
      if (out.output === 2) {
         move(1);
         assignTile(2);
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

      if (until(x, y, out)) {
         break;
      }
   }

   return [x, y, grid];
};

const runPart1 = arr => {
   const [x, y, grid] = exploreUntil(arr, (_x, _y, out) => out.output === 2);
   
   const getTile = (cx, cy) => (grid[cx] || [])[cy];

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

const runPart2 = arr => {
   let ox = 0;
   let oy = 0;
   let foundOxygen = false;

   const [x, y, grid] = exploreUntil(arr, (cx, cy, out) => {
      if (out.output === 2) {
         foundOxygen = true;
         ox = cx;
         oy = cy;
      }
      return foundOxygen && cx === 0 && cy === 0;
   });

   const getTile = (cx, cy) => (grid[cx] || [])[cy];
   
   const travel = (cx, cy, last, steps) => {
      const candidates = [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]].filter(pos => {
         if (pos[0] === last[0] && pos[1] === last[1]) {
            return false;
         }

         return getTile(pos[0], pos[1]);
      });

      if (candidates.length === 0) {
         return steps;
      }

      return Math.max(...candidates.map(pos => travel(pos[0], pos[1], [cx, cy], steps + 1)));
   };

   return travel(ox, oy, [NaN, NaN], 0);
};

module.exports = {parseInput, runPart1, runPart2};