'use strict';

var fs        = require('fs'),
    path      = require('path'),

    program = require('commander'),

    scaffold  = require('../scaffold'),
    constants = require('../constants'),

    io        = require('./io_communication');


exports.createModule = function (moduleName, options) {
    var directoriesInPath = process.cwd().split('/');;

    moduleName = moduleName || directoriesInPath[directoriesInPath.length - 1];

    if (fs.existsSync(path.join(process.cwd(), moduleName))) {

        io.prompt('The directory "' + moduleName + '" already exists, do you want to overwrite?(y/n):', function (answer) {
            if (answer && answer.toLowerCase().trim() == constants.CONFIRM) {
                scaffold(moduleName, {
                    overwrite : true,
                    init : program.init,
                    bin  : program.bin
                });
            } else {
                process.exit(constants.ERROR_EXIT);
            }
        });
    } else {
        scaffold(moduleName, {
            init : program.init,
            bin  : program.bin
        });
    }
};


