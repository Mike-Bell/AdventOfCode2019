const parseInput = input => input.split('\n').map(line => line.split(''));

const slopBetweenAsteroids = (a1, a2) => (a2.y - a1.y) / (a2.x - a1.x);

const areSameAsteroid = (a1, a2) => a2.x === a1.x && a2.y === a1.y;

const asteroidIsBetweenBounds = (y1, y2, x1, x2, a)  => a.x >= x1 && a.x <= x2 && a.y >= y1 && a.y <= y2;

const getAsteroids = grid => {
    const asteroids = []; 
    grid.forEach((line, y) => {
        line.forEach((ele, x) => {
            if (ele === '#') {
                asteroids.push({x: x, y: y});
            }
        });
    });

    return asteroids;
}

const getMaximallyObservantViewData = asteroids => {
    const viewData = asteroids.map(a1 => {
        const views = asteroids.filter(a2 => {
            if (areSameAsteroid(a2, a1)) {
                return false;
            }

            const slope = slopBetweenAsteroids(a1, a2);
            const [y2, y1] = a2.y > a1.y ?  [a2.y, a1.y] : [a1.y, a2.y];
            const [x2, x1] = a2.x > a1.x ?  [a2.x, a1.x] : [a1.x, a2.x];
            const candidateBlockers = asteroids.filter(a3 => asteroidIsBetweenBounds(y1, y2, x1, x2, a3) && !areSameAsteroid(a3, a2) && !areSameAsteroid(a3, a1));
            return !candidateBlockers.some(a3 => slopBetweenAsteroids(a1, a3) === slope);
        }).length;
        return {x: a1.x, y: a1.y, views: views};
    });

    let m = null;
    viewData.forEach(v => {
        if (m === null || v.views > m.views) {
            m = v;
        }
    });

    return m;
};

const runPart1 = grid => {
    return getMaximallyObservantViewData(getAsteroids(grid)).views;
};

const runPart2 = grid => {
    const asteroids = getAsteroids(grid);
    const station = getMaximallyObservantViewData(asteroids);
};

module.exports = {parseInput, runPart1, runPart2};