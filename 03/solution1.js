const worker = require('./worker');

const run = commands => {
    const wire1Commands = commands[0];
    const wire2Comamnds = commands[1];

    const wire1Points = worker.pointsFromCommands(wire1Commands);
    const wire2Points = worker.pointsFromCommands(wire2Comamnds);
    const intersections = worker.findIntersections(wire1Points, wire2Points);
    const intersectionDistances = intersections.map(intersection => Math.abs(intersection[0]) + Math.abs(intersection[1]));
    
    return Math.min(...intersectionDistances);
};

module.exports = {run};