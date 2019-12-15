const worker = require('./worker');

describe('worker', () => {
   describe('pointsFromCommands', () => {
      it('works', () => {
         const commands = [{direction: 'R', distance: 2}, {direction: 'U', distance: 2}];
         const expectedOutput = [[1, 0, 1], [2, 0, 2], [2, 1, 3], [2, 2, 4]];
         expect(worker.pointsFromCommands(commands)).toStrictEqual(expectedOutput);
      });
   });
});