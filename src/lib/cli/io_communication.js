'use strict';
var stdin     = process.stdin,
    stdout    = process.stdout;


function _writeToConsole(message) {
    stdout.write(message);
}

function _getUserInput(message, fn) {

    stdin.setEncoding('utf-8');
    _writeToConsole(message);

    stdin.once('data', function(chunk) {
        fn(chunk);
    });

}

function _disableListeners(fn) {
    stdin.removeListener('data', fn);
}

exports.prompt = _getUserInput;
exports.removeStdinListeners = _disableListeners;
