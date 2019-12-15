const parseInput = input => input.split(',').map(n => +n);
const computerFactory = require('../shared/computer');
const range = require('../utils/range');

const runGridToCompletion = (grid, arr) => {
   let coords = [0, 0];
   let direction = [0, 1];
   const rotateDirection = n => {
      direction = [(n ? 1 : -1) * direction[1], (n ? -1 : 1) * direction[0]];
   };
   const computer = computerFactory.create(arr);
   while (true) {
      const [x, y] = coords;
      grid[x] = grid[x] || [];
      const currentColor = grid[x][y] || 0;
      const output = computer.run(currentColor);
      if (output.complete) {
         break;
      }

      grid[x][y] = output.output;
      const output2 = computer.run(currentColor);
      if (output2.complete) {
         break;
      }
      rotateDirection(output2.output);
      coords = [x + direction[0], y + direction[1]];
   }

   return grid;
};

const runPart1 = arr => {
   const grid = runGridToCompletion([], arr);

   let total = 0;
   for (const x in grid) {
      // eslint-disable-next-line no-unused-vars
      for (const y in grid[x]) {
         total++;
      }
   }

   return total;
};

const runPart2 = arr => {
   const grid = runGridToCompletion([[1]], arr);
   let lowestX = 0;
   let lowestY = 0;
   let highestX = 0;
   let highestY = 0;
   for (const sx in grid) {
      const x = +sx;
      lowestX = x < lowestX ? x : lowestX;
      highestX = x > highestX ? x : highestX;
      for (const sy in grid[x]) {
         const y = +sy;
         lowestY = y < lowestY ? y : lowestY;
         highestY = y > highestY ? y : highestY;
      }
   }

   let img = '';
   range(lowestY, highestY + 1).reverse().forEach(y => {
      range(lowestX, highestX + 1).forEach(x => {
         img += (grid[x] || [])[y] ? '#' : ' ';
      });
      img += '\n';
   });

   return img;
};

module.exports = {parseInput, runPart1, runPart2};