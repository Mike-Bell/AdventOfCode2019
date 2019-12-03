# AdventOfCode2019
Advent of code 2019

Folders are organized by day

Within each day is a bundle of scripts / node modules, notably two scripts named `solution1.js` and `solution2.js`. `solution1.js` represents the solution for the first part of the problem and `solution2.js` represents the solution to the second part of the problem. There should also be modules with tests (hopefully).

To run a given solution, from the top-level folder, run `npm run solution [X]`. Where `X` is one of the advent days. If a single number is specified, (e.g. `npm run solution 12`), both parts of the solution will be run and their output will be put in the console. Alternatively, you can run a single part of the solution, by specifying `1` or `2` after a dash (e.g. `npm run solution 7-1` or `npm run solution 20-2`).

To run all tests I've written, you can run `npm run test`. You can also specify tests to run for a certain day by including that as an argument (e.g. `npm run test 5`)
