'use strict';

var fs             = require('fs'),
    path           = require('path'),
    npm            = require('npm'),
    async          = require('async'),

    subdirectories = ['bin', 'doc', 'examples', 'lib', 'test'],
    constants      = require('./constants'),
    exec           = require('child_process').exec,

    io        = require('./cli/io_communication');

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

    if (!options.bin) {
        subdirectories.shift();
    }

    subdirectories.forEach(function(subdirectory) {
        fs.mkdirSync(path.join(dir,subdirectory), '0755');
    });

    callback(null, dir);
}

function exit(code, message) {
    process.stdout.write(message || '\n');
    process.exit(code);
}

/**
 * Goes through the templates and adds them to the current project.
 */
function parseTemplatesAndCreateExtras(dir, callback) {

    var files           = fs.readdirSync(__dirname + '/templates/'),
        currentFilePath = '';


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

    if (options.overwrite) {
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
    if (options.overwrite) {
        io.prompt('The directory "' + path.basename(dir) + '" already exists, do you want to overwrite?(y/n):', function (answer) {
            if (answer && answer.toLowerCase().trim() === constants.CONFIRM) {
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
