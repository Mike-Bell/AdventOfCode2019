const pointsFromCommands = commands => {
    let x = 0;
    let y = 0;
    const points = [];
    const directionsToIncrementers = {
        'R': () => x++,
        'L': () => x--,
        'U': () => y++,
        'D': () => y--
    };

    commands.forEach(c => {
        const incrementer = directionsToIncrementers[c.direction];
        for (let i = 0; i < c.distance; i++) {
            incrementer();
            points.push([x, y]);
        }
    });

    return points;
};

const findIntersections = (s1, s2) => s1.filter(p1 => s2.some(p2 => p1[0] == p2[0] && p1[1] == p2[1]));

module.exports = {pointsFromCommands, findIntersections};