const computer = require('./computer');

describe('computer', () => {
    describe('applyNounAndVerb', () => {
        it('does what is expected', () => {
            const answer = computer.applyNounAndVerb([1,2,3,4,5,6], 20, 75);
            expect(answer).toStrictEqual([1,20,75,4,5,6]);
        });
    });

    describe('run', () => {
        it('passes example 1', () => {
            const answer = computer.run([1,1,1,4,99,5,6,0,99]);
            expect(answer).toBe(30);
        });
    });
});