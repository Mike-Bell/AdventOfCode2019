const parseInput = input => input.split(input.indexOf('\r\n') > -1 ? '\r\n' : '\n').map(line => line.split('').map(c => c === '.' ? 0 : c));

const pruneDeadEnds = grid => {
   while (true) {
      let prunedSomething = false;
      grid.forEach((line, y) => {
         line.forEach((val, x) => {
            let neighbors = 0;
            [[-1, 0], [1, 0], [0, 1], [0, -1]].forEach(dpos => {
               if ((grid[y + dpos[1]] || [])[x + dpos[0]] === '#') {
                  neighbors++;
               }
            });
   
            if (neighbors > 2 && !val) {
               grid[y][x] = '#';
               prunedSomething = true;
            }
         });
      });

      if (!prunedSomething) {
         break;
      }
   }

   return grid;
};

const runPart1 = grid => {
   let x0 = null;
   let y0 = null;
   const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
   let totalKeys = 0;
   grid.forEach((line, y) => {
      line.forEach((val, x) => {
         if (val === '@') {
            x0 = x;
            y0 = y;
         } else if (keys.includes(val)) {
            totalKeys++;
         }
      });
   });

   grid = pruneDeadEnds(grid);

   let states = [{x: x0, y: y0, keys: []}];
   let traveled = {};
   let i = 0;
   while (true) {
      i++;
      let nextStates = [];
      states.forEach(s => {
         const x = s.x;
         const y = s.y;
         const keys = s.keys;
         [[x, y + 1], [x, y - 1], [x - 1, y], [x + 1, y]].forEach(newPos => {
            const [newX, newY] = newPos;
            const cacheKey = `${newX},${newY},${keys.join('')}`;
            if (traveled[cacheKey]) {
               return;
            }
            traveled[cacheKey] = true;
   
            const val = grid[newY][newX];
            if (!val || val === '@') {
               const newState = {x: newX, y: newY, keys: keys};
               nextStates.push(newState);
            } else if (val !== '#') {
               const lowerVal = val.toLowerCase();
               if (val === lowerVal && !keys.includes(lowerVal)) {
                  const newKeys = [...keys, val].sort();
                  const newState = {x: newX, y: newY, keys: newKeys};
                  nextStates.push(newState);
               } else if (keys.includes(lowerVal)) {
                  const newState = {x: newX, y: newY, keys: keys};
                  nextStates.push(newState);
               }
            }
         });
      });

      states = nextStates;

      if (states.some(s => s.keys.length >= totalKeys)) {
         break;
      }
   }

   return i;
};

const runPart2 = grid => {
   let x0 = null;
   let y0 = null;
   const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');
   let totalKeys = 0;
   grid.forEach((line, y) => {
      line.forEach((val, x) => {
         if (val === '@') {
            x0 = x;
            y0 = y;
         } else if (keys.includes(val)) {
            totalKeys++;
         }
      });
   });

   grid[y0][x0] = '#';
   grid[y0 + 1][x0] = '#';
   grid[y0 - 1][x0] = '#';
   grid[y0][x0 + 1] = '#';
   grid[y0][x0 - 1] = '#';

   [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(dpos => {
      grid[y0 + dpos[0]][x0 + dpos[1]] = '@';
   });

   grid = pruneDeadEnds(grid);

   [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(dpos => {
      grid[y0 + dpos[0]][x0 + dpos[1]] = 0;
   });

   let maxKeys = 0;
   let states = [0, 1, 2, 3].map(ri => ({positions: [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(dp => [x0 + dp[0], y0 + dp[1]]), activeRobot: ri, keys: {}, keyStr: ''}));
   let i = 0;
   let traveled = {};
   while (true) {
      let maxKeysChanged = false;
      i++;
      let nextStates = [];
      states.forEach(s => {
         const keys = s.keys;
         const keyStr = s.keyStr;
         const r = s.positions[s.activeRobot];
         const x = r[0];
         const y = r[1];
         [[x, y + 1], [x, y - 1], [x - 1, y], [x + 1, y]].forEach(newPos => {
            const [newX, newY] = newPos;
            const nextPositions = [...s.positions];
            nextPositions[s.activeRobot] = newPos;
            
            const cacheKey = `${nextPositions.flat().join(',')},${keyStr}`;
            if (traveled[cacheKey]) {
               return;
            }
            traveled[cacheKey] = true;

            const newState = {positions: nextPositions, keys: keys, keyStr: keyStr, activeRobot: s.activeRobot};
            const val = grid[newY][newX];
            
            if (!val) {
               nextStates.push(newState);
            } else if (val !== '#') {
               const lowerVal = val.toLowerCase();
               if (val === lowerVal) { //stepped on a key
                  if (!keys[val]) { // new key. Add it to keyring and switch robots
                     const newKeys = {...keys, [val]: true};
                     const keysList = Object.keys(newKeys);
                     if (keysList.length > maxKeys) {
                        maxKeys = keysList.length;
                        maxKeysChanged = true;
                     }
                     const newKeyStr = keysList.sort().join('');
                     [0, 1, 2, 3].forEach(ri => {
                        nextStates.push({positions: nextPositions, keys: newKeys, keyStr: newKeyStr, activeRobot: ri});
                     });
                  } else { // old key. Continue.
                     nextStates.push(newState);
                  }
               } else if (keys[lowerVal]) { // unlocked door
                  nextStates.push(newState);
               }
            }
         });
      });

      if (maxKeysChanged) {
         if (maxKeys >= totalKeys) {
            break;
         }
         const maxKeyPruneFudgeFactor = 4; // lower numbers make this run faster but risk pruning the solution
         nextStates = nextStates.filter(s => s.keyStr.length >= maxKeys - maxKeyPruneFudgeFactor);
         traveled = Object.keys(traveled).filter(key => key.length >= maxKeys + 25 - maxKeyPruneFudgeFactor).map(key => traveled[key]);
      }
      console.log(nextStates.length, maxKeys);

      states = nextStates;
   }

   return i;
};

module.exports = {parseInput, runPart1, runPart2};