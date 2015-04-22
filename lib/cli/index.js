'use strict';

var fs        = require('fs');
var path      = require('path');
var program   = require('commander') ;
var constants = require('../constants');
var scaffold  = require('../scaffold');
var NSPAPI    = require('nsp-api');
var chalk     = require('chalk');

exports.createPackage = function(moduleName) {
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

exports.createModule = function(moduleName) {
    var modulePath = path.join(process.cwd(), 'lib', moduleName + '.js'),
        specPath = path.join(process.cwd(), 'test', moduleName + '_spec.js');

    if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
        process.stdout.write('In order to create a module you must be in the root folder of an npm module.\n');
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

/**
 * Performs validations against the Node Security Project reports
 *
 * @see https://www.npmjs.com/package/nsp-api
 * @see  https://nodesecurity.io
 *
 * @param  {object} [moduleName] Optional parameter. If specified, the validation takes place for the
 * specified module, and not for all the dependencies. If not specified, the application will try to
 * use npm-shrinkwrap.json.
 */
exports.checkDependencies = function(moduleName) {

    /**
     * Outputs the results coming from the Node Security Project API
     *
     * @param  {object} err     The error object passed by the NSPAPI module if something goes wrong.
     * @param  {object} results An object containing all the vulnerabilities found for the current API
     * call.
     */
    function _validationHandler(err, results) {
        console.log(chalk.black.bgYellow('Validating... hold on tight!'));

        if (err) {
            throw err;
        }

        console.log(results.length === 0 ?
            'Yay, no vulnerabilities here!' : JSON.stringify(results, null, 2));
    }

    if (moduleName && typeof moduleName === 'string') {
        // semver@4.2.0 = ["semver", "4.2.0"]
        var moduleData = moduleName.split('@');

        /**
         * @see  https://www.npmjs.com/package/nsp-api#validatemodule-module-version-callback
         */
        NSPAPI.validateModule(moduleData[0], moduleData[1], _validationHandler);
    } else {
        var shrinkwrap = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'npm-shrinkwrap.json')));
        /**
         * @see  https://www.npmjs.com/package/nsp-api#validateshrinkwrap-shrinkwrap-callback
         */
        NSPAPI.validateShrinkwrap(shrinkwrap, _validationHandler);
    }
};


