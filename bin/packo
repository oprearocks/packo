#!/usr/bin/env node

'use strict';

const fs = require('fs');
const constants = require('../lib/constants');
const helpFileContents = fs.readFileSync(__dirname + '/../lib/example.txt', 'UTF-8');
const pkg = require('../package.json');
const CLI = require('../lib/cli');
const program = require('commander');
const HELP_MESSAGES = require('./bin_help_messages.json');

program.version(pkg.version)
    .option('-b, --bin', OPTIONS.packageHelp)
    .usage('[cmd] options');


program.on('--help', function() {
    process.stdout.write(helpFileContents);
});

program.command('create [package]')
    .description(HELP_MESSAGES.create)
    .action(function(packageName, options) {
        CLI.createPackage(packageName, options);
    });

program.command('module [name]')
    .description(HELP_MESSAGES.module)
    .action(function(moduleName) {
        CLI.createModule(moduleName);
    });

/**
 * @example
 *
 * packo check # Validates the current package dependencies. Uses npm-shrinkwrap.json.
 * packo check <PACKAGE> # Checks <PACKAGE> reported vulnerabilites on https://nodesecurity.io/advisories
 */
program.command('check [module]')
    .description(HELP_MESSAGES.check)
    .action(function(module) {
        CLI.checkDependencies(module);
    });

program
    .parse(process.argv);

if (process.argv.length === 2) {
    program.outputHelp();
    process.exit(constants.ERROR_EXIT);
}
