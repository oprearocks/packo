# packo (WIP)
### An npm package scaffolding tool

> GitHub repository: [https://github.com/opreaadrian/packo](https://github.com/opreaadrian/packo)

This project emerged out of the need to create and recreate the folder structure necessary to create a node module. I took a look at the most frequently downloaded npm modules and observed their folder structure. Based on this research, I found a common pattern amongst them, a pattern that forms the base of this module.

## Installation

    $ npm install -g packo
    $ packo

      Usage: packo [options]

      Options:

        -h, --help             output usage information
        -V, --version          output the version number
        -d, --dir <directory>  Application <directory>.
        -i, --init             Initialize with package.json (runs npm init).
        -b, --bin              The module can be executed from the command line.

      Examples:
        $ packo --dir=application-dir           Scaffolds a new module in the <application-dir> directory
        $ packo --dir=application-dir --init    Scaffolds module and initializes package.json.
        $ packo --dir=myModule --init --bin     Npm module that also exposes a CLI.


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

