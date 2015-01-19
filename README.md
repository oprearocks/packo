# packo (WIP)
### An npm package scaffolding tool

> GitHub repository: [https://github.com/opreaadrian/packo](https://github.com/opreaadrian/packo)

This project emerged out of the need to create and recreate the folder structure necessary to create a node module. I took a look at the most frequently downloaded npm modules and observed their folder structure. Based on this research, I found a common pattern amongst them, a pattern that forms the base of this module.

## Installation

    $ npm install -g packo
    $ packo

      Usage: packo [cmd] options


      Commands:

        create [module]  Create a module named [module]. Current directory name is used by default.

      Options:

        -h, --help     output usage information
        -V, --version  output the version number
        -b, --bin      Add bin/ folder and executable file for module.
        -i, --init     Initialize the module with a package.json file.

      Examples:
        $ packo create awesome-module                 Scaffolds the "awesome-module" package.
        $ packo create awesome-module --init          Scaffolds module and initializes package.json.
        $ packo create awesome-module --init --bin    Adds "bin/" dir for module that expose a CLI.


## Folder structure
The tool will generate a folder structure similar to the one below:

    module_folder/
        .editorconfig
        .jshintrc
        .gitignore
        .gitattributes
        bin/
        doc/
        examples/
        lib/
        test/
        package.json

## Future plans

* Add tests -- the reason why tests are not available is because I needed the tool fast, and did not have the time to apply a test-driven methodology.
* Add continuous integration -- same answer as above.
* Make the tool more flexible in terms of options.
* Create a friendlier, more coloured CLI.
* Improve code quality.
* Enable the possibility to add library modules, to the `lib/` folder via CLI, and also generate the appropriate spec file withing the `test/` directory.
* Add Gulp/Grunt workflows -- probably Gulp.

## Contributing
Just fork the repo, make your changes, create a pull request. I would have loved to say fork->change->run tests->submit pull request, so if anyone can help with tests, feel free to do that.

## Final thoughts: This is work in progress, so if there are suggestions, get in touch via [the repository's issues panel](https://github.com/opreaadrian/packo/issues) on GitHub , or via Twitter -- [@opreaadrian](https://twitter.com/opreaadrian).

