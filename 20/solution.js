const range = require('../utils/range');

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

const display = (grid, maxLines) => {
   maxLines = maxLines || grid.length;
   const maxY = Math.max(...grid.map(line => line.length));
   console.log(range(maxLines).map(x => `${x}`.padEnd(3) + range(maxY).map(y => (grid[x] || [])[y] || '.').join('')).join('\n'));
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const dPosAdjacent = [[0, 1], [0, -1], [1, 0], [-1, 0]];

const getNeighborPortals = (neighbors, grid, portals, x, y, lastX, lastY, steps) => {
   const val = grid[x][y];
   
   if (alphabet.includes(val)) {
      const entering = portals.findIndex(p => p.entrance[0] === x && p.entrance[1] === y);
      const enteringPortal = portals[entering];
      const exiting = portals.findIndex((p, i) => p.tag === enteringPortal.tag && i !== entering);
      if (exiting !== -1 || enteringPortal.tag === 'ZZ') {
         neighbors.push({index: exiting, distance: steps});
      }
   } else if (!val) {
      dPosAdjacent.forEach(dpos => {
         const x2 = x + dpos[0];
         const y2 = y + dpos[1];
         if (x2 !== lastX || y2 !== lastY) {
            getNeighborPortals(neighbors, grid, portals, x2, y2, x, y, steps + 1);
         }
      });
   }
};

const runPart1 = grid => {
   pruneDeadEnds(grid);
   
   const portals = [];
   
   //build list of portals
   grid.forEach((line, x) => {
      line.forEach((val, y) => {
         if (alphabet.includes(val)) {
            const secondLetterOffset = dPosAdjacent.find(dpos => alphabet.includes((grid[x + dpos[0]] || [])[y + dpos[1]]));
            const [x2, y2] = [x + secondLetterOffset[0], y + secondLetterOffset[1]];
            const val2 = grid[x2][y2];
            const portalTag = [val, val2].sort().join('');
            const isPortalEntrance = dPosAdjacent.some(dpos => (grid[x + dpos[0]] || [])[y + dpos[1]] === 0);
            const portalEntrancePos = isPortalEntrance ? [x, y] : [x2, y2];
            const landingOffset = dPosAdjacent.find(dpos => (grid[portalEntrancePos[0] + dpos[0]] || [])[portalEntrancePos[1] + dpos[1]] === 0);
            const landingPos = [portalEntrancePos[0] + landingOffset[0], portalEntrancePos[1] + landingOffset[1]];
            if (!portals.some(p => p.tag === portalTag && p.entrance[0] === portalEntrancePos[0])) {
               portals.push({tag: portalTag, entrance: portalEntrancePos, landing: landingPos});
            }
         }
      });
   });

   // get portals that can be walked to (adjacents) for each portal
   portals.forEach(portal => {
      portal.adjacents = [];
      getNeighborPortals(portal.adjacents, grid, portals, portal.landing[0], portal.landing[1], portal.entrance[0], portal.entrance[1], 0);
   });

   const startingpi = portals.findIndex(p => p.tag === 'AA');
   let lowest = null;

   // do a BFS while the exit is not found, or while a given state has a total distance less than the lowest found total distance
   let states = [{pi: startingpi, totalDistance: 0}];
   while (states.length > 0) {
      const nextStates = [];
      states.forEach(s => {
         const portal = portals[s.pi];
         if (s.pi === -1) {
            if (lowest == null || s.totalDistance < lowest) {
               lowest = s.totalDistance;
            }
            return;
         } else if (lowest != null && s.totalDistance > lowest) {
            return;
         }
         portal.adjacents.forEach(a => {
            nextStates.push({pi: a.index, totalDistance: s.totalDistance + a.distance});
         });
      });
      states = nextStates;
   }
   return lowest - 1;
};

module.exports = {parseInput, runPart1};