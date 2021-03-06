const range = require('../utils/range');
const sum = require('../utils/sum');
const clamp = require('../utils/clamp');
const lcm = require('../utils/lcm');

const parseInput = input => input.split('\n').map(line => ({
   position: line.split(',').map(chunk => +chunk.replace(/(x|y|z|<|>|=|\s)/g, '')),
   velocity: [0, 0, 0]
}));

const runStep = moons => {
   moons.forEach((m1, i) => {
      moons.forEach((m2, j) => {
         if (i === j) {
            return;
         }

         m1.velocity = m1.velocity.map((v, v1) => v + clamp(m2.position[v1] - m1.position[v1], -1, 1));
      });
   });

   moons.forEach(m => {
      m.position = m.position.map((p, pi) => p + m.velocity[pi]);
   });
};

const runPart1 = moons => {
   range(1000).forEach(() => {
      runStep(moons);
   });

   return sum(moons.map(m => sum(m.position.map(Math.abs)) * sum(m.velocity.map(Math.abs))));
};

const runPart2 = moons => {
   const initial = JSON.parse(JSON.stringify(moons));
   let periods = range(3).map(() => 0);

   const moonIsInIitialState = (m, mi, axis) => m.position[axis] === initial[mi].position[axis] && m.velocity[axis] === initial[mi].velocity[axis];

   for (let i = 1; !periods.every(p => p); i++) {
      runStep(moons);

      periods = periods.map((p, axis) => p || (moons.every((m, mi) => moonIsInIitialState(m, mi, axis)) ? i : 0));
   }

   return periods.reduce(lcm);
};

module.exports = {parseInput, runPart1, runPart2};