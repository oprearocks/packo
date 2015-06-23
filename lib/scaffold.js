'use strict';

var fs             = require('fs');
var path           = require('path');
var npm            = require('npm');
var async          = require('async');
var subdirectories = ['bin', 'doc', 'examples', 'lib', 'test'];
var constants      = require('./constants');
var exec           = require('child_process').exec;
var inquirer       = require('inquirer');

/**
 * Generates the module's subdirectory tree, with the following structure:
 *
 *     module_folder/
 *         bin/
 *         doc/
 *         examples/
 *         lib/
 *         test/
 *
 * @param  {String}  root   The absolute path to the root folder of the module.
 * @param  {Boolean} hasBin Is this module going to be used form the command line?
 */
function createSubdirectoryTree(dir, options, callback) {

    if (!options.cli) {
        subdirectories.shift();
    }

    subdirectories.forEach(function(subdirectory) {
        fs.mkdirSync(path.join(dir,subdirectory), '0755');
    });

    callback(null, dir, options);
}

function exit(code, message) {
    process.stdout.write(message || '\n');
    process.exit(code);
}

/**
 * Goes through the templates and adds them to the current project.
 */
function parseTemplatesAndCreateExtras(dir, options, callback) {

    /**
     * @member files
     * Temporary holder for our template filenames, to be populated based on user options.
     */
    var files = ['index.js', '.gitattributes'];

    if (options.editorconfig) {
        files.push('.editorconfig');
    }

    if (options.lint.toLowerCase() === 'jshint') {
        files.push('.jshintrc');
    } else {
        files.push('.eslintrc');
    }

    if (options.gitignore) {
        files.push('.gitignore');
    }

    var currentFilePath = '';

    files.forEach(function(file) {
        currentFilePath = __dirname + '/templates/' + file;
        fs.createReadStream(currentFilePath).pipe(fs.createWriteStream(file));
    });

    callback(null, dir);
}

/**
 * This function initializes the `npm init` process.
 * It will be on by default
 * Makes sure that package.json is generated in the right directory
 */
function initNpm(dir, callback) {
    npm.load({}, function(err) {

        if (err) {
            exit(constants.ERROR_EXIT,
                'npm.init() -- package.json not generated -- ABORTING\n');
        }

        npm.init(dir, {}, function(error) {

            if (error) {
                exit(constants.ERROR_EXIT,
                    'npm.init() -- package.json not generated -- ABORTING\n');
            }
            callback(null);

        });
    });
}

/**
 * Creates the module root folder based on the module name passed to the create subdommand.
 * @param  {String} dir     The path directory(future) that will host the module's codebase.
 * @param  {Object} options Tool configuration options.
 * @param {Function} callback The next function in line -- required by async.waterfall
 */
function createModuleRoot(dir, options, callback) {
    function _runWhenDone(err) {
        if (err) {
            throw err;
        }

        process.chdir(dir);
        callback(null, dir, options);
    }

    if (options.moduleExists) {
        process.chdir(dir);
        exec('rm -rf `ls -Ab`', _runWhenDone);
    }  else {
        fs.mkdir(dir, _runWhenDone);
    }
}

/**
 * Processes user input and decides whether the user wants to create a new module or overwrite an old one.
 * @param  {String}   dir      The absolute path for the new/current module
 * @param  {Object}   options  The tool configuration options
 * @param  {Function} callback The callback to be called next -- required by async.waterfall
 */
function processOptions(dir, options, callback) {
    if (options.moduleExists) {
        inquirer.prompt([
            {
                type : 'confirm',
                name : 'overwrite',
                message : 'The directory "' + path.basename(dir) + '" already exists, do you want to overwrite?',
                default : false
            }
        ], function (answers) {
            if (answers.overwrite) {
                callback(null, dir, options);
            } else {
                process.exit(constants.ERROR_EXIT);
            }
        });
    } else {
        callback(null, dir, options);
    }
}


module.exports = function(dir, options) {
    async.waterfall([
        async.apply(processOptions, dir, options),
        createModuleRoot,
        createSubdirectoryTree,
        parseTemplatesAndCreateExtras,
        initNpm
    ], function(err) {
        if (err) {
            throw err;
        }

        exit(constants.SUCCESS_EXIT,
                'Successfully scaffolded npm package.\n');
    });

};
