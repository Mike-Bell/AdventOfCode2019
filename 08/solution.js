const range = require('../utils/range');

const width = 25;
const height = 6;
const pixelsPerLayer = width * height;

const parseInput = input => input.split('').map(n => +n);

const runPart1 = arr => {
   const slices = range(arr.length / pixelsPerLayer)
      .map((_, i) => arr.slice(i * pixelsPerLayer, (i + 1) * pixelsPerLayer));
   let lowestZeros = null;
   let product = null;
   slices.forEach(s => {
      const zeros = s.filter(n => n === 0).length;
      const ones = s.filter(n => n === 1).length;
      const twos = s.filter(n => n === 2).length;
      if (lowestZeros === null || zeros < lowestZeros) {
         lowestZeros = zeros;
         product = ones * twos;
      }
   });
   return product;
};

const runPart2 = arr => {
   const slices = range(arr.length / pixelsPerLayer)
      .map((_, i) => arr.slice(i * pixelsPerLayer, (i + 1) * pixelsPerLayer));
   const finalImage = Array(pixelsPerLayer).fill(2);
   slices.forEach(s => {
      s.forEach((n, i) => {
         if (finalImage[i] === 2) {
            finalImage[i] = n;
         }
      });
   });
   let output = '';
   for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
         if (j === 0) {
            output += '\n';
         }
         const val = finalImage[i * width + j];
         output += val ? '*' : ' ';
      }
   }
   return output;
};

module.exports = {parseInput, runPart1, runPart2};