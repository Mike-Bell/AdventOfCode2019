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

    let totalDistance = 0;
    commands.forEach(c => {
        const incrementer = directionsToIncrementers[c.direction];
        for (let i = 0; i < c.distance; i++) {
            totalDistance++;
            incrementer();
            points.push([x, y, totalDistance]);
        }
    });

    return points;
};

const getFirstMatchingPoint = (point, points) => points.find(p2 => point[0] == p2[0] && point[1] == p2[1]);

const findIntersections = (s1, s2) => s1.filter(p1 => getFirstMatchingPoint(p1, s2));

const findItersectionTotalDistances = (s1, s2) => s1.map(p1 => {
        const hit = getFirstMatchingPoint(p1, s2);
        return {intersects: !!hit, distance: hit ? hit[2] + p1[2] : NaN};
    })
    .filter(hit => hit.intersects)
    .map(hit => hit.distance);

module.exports = {pointsFromCommands, findIntersections, findItersectionTotalDistances};