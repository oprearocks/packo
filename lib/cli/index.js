'use strict';

var fs        = require('fs'),
    path      = require('path'),

    program = require('commander'),

    scaffold  = require('../scaffold');


exports.createModule = function (moduleName) {
    var modulePath = '';

    if (moduleName) {
        modulePath = path.join(process.cwd(), moduleName);
    } else {
        modulePath = process.cwd();
    }

    scaffold(modulePath, {
        init      : program.init,
        bin       : program.bin,
        overwrite : fs.existsSync(modulePath)
    });
};


