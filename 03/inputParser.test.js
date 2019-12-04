const inputParser = require('./inputParser');

const p = (direction, distance) => ({direction: direction, distance: distance});

describe('inputParser', () => {
    describe('parse', () => {
        it('works', () => {
            expect(inputParser.parse('R1,L2,D333\nU1,D2,R665')).toStrictEqual([[p('R', 1), p('L', 2), p('D', 333)], [p('U', 1), p('D', 2), p('R', 665)]])
        });
    });
});