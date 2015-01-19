'use strict';

var fs             = require('fs'),
    path           = require('path'),
    npm            = require('npm'),

    subdirectories = ['bin', 'doc', 'examples', 'lib', 'test'],
    constants      = require('./constants'),
    exec           = require('child_process').exec;

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
function _createSubdirectoryTree(root, hasBin) {

    if (!hasBin) {
        subdirectories.shift();
    }

    subdirectories.forEach(function(subdirectory) {
        fs.mkdirSync(path.join(root,subdirectory), '0755');
    });
}

/**
 * Goes through the templates and adds them to the current project.
 */
function _parseTemplatesAndCreateExtras() {
    fs.readdir(__dirname + '/templates/', function(err, files) {
        var currentFilePath = '';

        if (err) {
            throw err;
        }

        files.forEach(function(file) {
            currentFilePath = __dirname + '/templates/' + file;
            fs.createReadStream(currentFilePath).pipe(fs.createWriteStream(file));
        });
    });
}

/**
 * This function initializes the `npm init` process, if the user whishes to initialize their module
 * with a `package.json`.
 */
function _initNpm() {
    npm.load({}, function(err) {

        if (err) {
            process.stdout.write('npm.load() -- package.json not generated -- ABORTING\n');
            process.exit(constants.ERROR_EXIT);
        }

        npm.init({}, function(error) {

            if (error) {
                process.stdout.write('npm.init() -- package.json not generated -- ABORTING\n');
                process.exit(constants.ERROR_EXIT);
            }

        });
    });
}

/**
 * Creates the module root folder based on the --dir/-d option value. Is also responsible for calling
 * the methods responsible for generating the module subtree.
 * @param  {String} dir     The name of the directory that will host the module's codebase.
 * @param  {Object} options Tool configuration options.
 */
function _createModuleRoot(dir, options) {
    var moduleFolder = path.join(process.cwd(), dir);

    if (options.overwrite === true) {

        process.chdir(moduleFolder);

        exec('rm -rf * .*', function(err, stdout, stderr) {

            _createSubdirectoryTree(moduleFolder, options.bin);
            _parseTemplatesAndCreateExtras();

            process.stdout.write('Successfully created npm package: ' + dir + '\n');
            process.exit(constants.SUCCESS_EXIT);
        });
    } else {
        fs.mkdir(moduleFolder, '0755', function(err) {
            if (err) {
                throw err;
            }

            process.chdir(moduleFolder);

            _createSubdirectoryTree(moduleFolder, options.bin);

            _parseTemplatesAndCreateExtras();

            process.stdout.write('Successfully created npm package: ' + dir + '\n');
            process.exit(constants.SUCCESS_EXIT);
        });
    }
}


module.exports = function(dir, options) {

    _createModuleRoot(dir, options);

    if (options.init) {
        _initNpm();
    }
};
