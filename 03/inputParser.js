const parse = input => input.split('\n')
                            .map(arr => arr.split(',')
                                           .map(command => ({direction: command[0], distance: +command.slice(1)})));

module.exports = {parse};