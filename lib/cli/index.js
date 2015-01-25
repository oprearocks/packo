'use strict';

var fs        = require('fs'),
    path      = require('path'),

    program = require('commander'),

    constants = require('../constants'),
    scaffold  = require('../scaffold');


exports.createPackage = function(packageName) {
    var packagePath = '';

    if (packageName) {
        packagePath = path.join(process.cwd(), packageName);
    } else {
        packagePath = process.cwd();
    }

    scaffold(packagePath, {
        init      : program.init,
        bin       : program.bin,
        overwrite : fs.existsSync(packagePath)
    });
};

exports.createModule = function(moduleName) {
    var modulePath = path.join(process.cwd(), 'lib', moduleName + '.js'),
        specPath = path.join(process.cwd(), 'test', moduleName + '_spec.js');

    if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        process.stdout.write('In order to create a module you must be in the root folder of an npm package.\n');
        process.stdout.write('You are here: ' + path.join(process.cwd()) + '\n');
        process.exit(constants.ERROR_EXIT);
    }

    if (!fs.existsSync(modulePath) && !fs.existsSync(specPath)){
        fs.writeFile(modulePath, '', function(err) {
            if (err) {
                throw err;
            }

            fs.writeFileSync(specPath, '');
            process.stdout.write('Successfully created lib/' + moduleName + '.js module and test/' + moduleName + '_spec.js.\n');
            process.exit(constants.SUCCESS_EXIT);
        });
    } else {
        process.stdout.write('There was a problem creating your module.\n');
        process.exit(constants.ERROR_EXIT);
    }

};


