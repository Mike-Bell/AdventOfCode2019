const computerFactory = require('../shared/computer');
const range = require('../utils/range');
const sum = require('../utils/sum');

const parseInput = input => input.split(',').map(n => +n);

const hasTractorBeam = (arr, x, y) => {
   const computer = computerFactory.create([...arr]);
   computer.runTilNextInput(x);
   computer.runTilNextInput(x);
   const output = computer.run(y);
   return output.output;
};

const runPart1 = arr => {
   const grid = [[]];
   range(50).forEach(x => {
      grid[x] = [];
      range(50).forEach(y => {
         grid[x][y] = hasTractorBeam(arr, x, y);
      });
   });

   return sum(grid.map(line => sum(line)));
};

const display = (grid, maxLines) => {
   const maxY = Math.max(...grid.map(l => l.length));
   maxLines = maxLines || maxY;
   console.log(maxLines);
   maxLines = Math.min(maxLines, maxY);
   console.log(range(maxLines).map(y => `${y}`.padEnd(3) + range(700, maxLines).map(x => (grid[x] || [])[y] || '.').join('')).join('\n'));
};

const runPart2 = arr => {
   const grid = [[]];
   range(50).forEach(x => {
      grid[x] = [];
      range(50).forEach(y => {
         grid[x][y] = hasTractorBeam(arr, x, y);
      });
   });

   const getGridValue = (x, y) => {
      grid[x] = grid[x] || [];
      if (typeof grid[x][y] === 'undefined') {
         grid[x][y] = hasTractorBeam(arr, x, y);
      }
      return grid[x][y];
   };

   const spaceShipSize = 100;
   const lower = 700;
   const upper = 1300;

   for (let y = lower; y < upper; y++) {
      for (let x = lower; x < upper; x++) {
         if (!getGridValue(x, y)) {
            continue;
         }

         if (!getGridValue(x + spaceShipSize - 1, y)) {
            continue;
         }

         if (!getGridValue(x, y + spaceShipSize - 1)) {
            continue;
         }

         return x * 10000 + y;
      }
   }
};

module.exports = {parseInput, runPart1, runPart2};