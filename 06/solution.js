const parseInput = input => input.split('\r\n').map(line => line.split(')'));

const sum = arr => arr.reduce((acc, curr) => acc + curr, 0)

const runPart1 = edges => {
    return sumChildrenDepths(0, 'COM', edges);
};

const sumChildrenDepths = (depth, node, edges) => {
    return depth + sum(getChildren(node, edges).map(c => sumChildrenDepths(depth + 1, c, edges)));
};

const getChildren = (node, edges) => {
    return edges.filter(edge => edge[0] === node).map(edge => edge[1]);
};

const runPart2 = edges => {
    return findSanta(0, 'YOU', edges, []) - 1;
};

const findSanta = (depth, node, edges, traversed) => {
    const adjacents = getAdjacents(node, edges).filter(n => !traversed.includes(n));
    if (!adjacents.some(n => n)) {
        return -1;
    }

    for (const i in adjacents) {
        const n = adjacents[i];
        if (n === 'SAN') {
            return depth;
        }
        
        const santaDepth = findSanta(depth + 1, n, edges, [...traversed, n]);
        if (santaDepth !== -1) {
            return santaDepth;
        }
    }

    return -1;
};

const getAdjacents = (node, edges) => edges.filter(e => e[0] === node)
    .map(e => e[1])
    .concat(edges.filter(e => e[1] === node)
        .map(e => e[0])
    );

module.exports = {parseInput, runPart1, runPart2};