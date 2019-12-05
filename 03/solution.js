const worker = require('./worker');

const parseInput = input => input.split('\n')
    .map(arr => arr.split(',')
        .map(command => ({direction: command[0], distance: +command.slice(1)}))
    );

const runPart1 = commands => {
    const [wire1Points, wire2Points] = commands.map(worker.pointsFromCommands);

    const intersections = worker.findIntersections(wire1Points, wire2Points);
    const intersectionDistances = intersections.map(intersection => Math.abs(intersection[0]) + Math.abs(intersection[1]));

    return Math.min(...intersectionDistances);
};

const runPart2 = commands => {
    const [wire1Points, wire2Points] = commands.map(worker.pointsFromCommands);

    const intersectionDistances = worker.findItersectionTotalDistances(wire1Points, wire2Points);

    return Math.min(...intersectionDistances);
};

module.exports = {parseInput, runPart1, runPart2};