# packo (WIP)
### An npm package scaffolding tool

> GitHub repository: [https://github.com/opreaadrian/packo](https://github.com/opreaadrian/packo)

This project emerged out of the need to create and recreate the folder structure necessary to create a package that I could easily install from a private NPM instance. I took a look at the most frequently downloaded npm packages and observed their folder structure. Based on this research, I found a common pattern amongst them, a pattern that forms the base of this tool.

## Installation

    $ npm install -g packo
    $ packo

      Usage: packo [cmd] options


      Commands:

        create [package]  Create a package named [package]. Current directory name is used by default.
        module [name]     Create the "lib/[name].js" module. Also creates "test/[name]_spec.js" for the module.

      Options:

        -h, --help     output usage information
        -V, --version  output the version number
        -b, --bin      Add bin/ folder and executable file for package.

      Examples:
        $ packo create                              Scaffolds an npm package in the current directory.
        $ packo create awesome-package               Scaffolds the "awesome-package" package.
        $ packo create awesome-package --bin         Adds "bin/" dir for package that expose a CLI.
        $ packo module dataReader                    Creates "lib/dataReader.js" and "test/dataReader_spec.js"

## Caution

        $ packo create awesome-package
        The directory "awesome-package" already exists, do you want to overwrite?(y/n):

By answering with "y" or "Y", you acknowledge the fact that everything will be deleted from the "awesome-package" directory.

Same holds true when running `packo create` with no `[name]` argument, as the tool treats the current directory as the pacakge's root, and scaffolds the structure inside it.

    $ mkdir awesome-package && cd awesome-package
    $ packo create
    The directory "awesome-package" already exists, do you want to overwrite?(y/n):

## Folder structure
The tool will generate a folder structure similar to the one below:

    package_folder/
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
* __[DONE]__ Enable the possibility to add library modules, to the `lib/` folder via CLI, and also generate the appropriate spec file withing the `test/` directory.
* Add Gulp/Grunt workflows -- probably Gulp.

## Contributing
Just fork the repo, make your changes, create a pull request. I would have loved to say fork->change->run tests->submit pull request, so if anyone can help with tests, feel free to do that.

## Final thoughts: This is work in progress, so if there are suggestions, get in touch via [the repository's issues panel](https://github.com/opreaadrian/packo/issues) on GitHub , or via Twitter -- [@opreaadrian](https://twitter.com/opreaadrian).

