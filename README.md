[![NPM](https://nodei.co/npm/packo.png?downloads=true)](https://nodei.co/npm/packo/)

# packo
### An npm package scaffolding tool

> GitHub repository: [https://github.com/opreaadrian/packo](https://github.com/opreaadrian/packo)

This project emerged out of the need to create and recreate the folder structure necessary to create a package that I could easily install from a private NPM instance. I took a look at the most frequently downloaded npm packages and observed their folder structure. Based on this research, I found a common pattern amongst them, a pattern that forms the base of this tool.

## Installation

```bash
$ npm install -g packo
$ packo

  Usage: packo [cmd] options


  Commands:

    create [package]  Create a package named [package]. Current directory name is used by default.
    module [name]     Create the "lib/[name].js" module. Also creates "test/[name]_spec.js" for the module.
    check [module]    Check for vulnerabilities in the current module's dependencies -- uses npm-shrinkwrap.json.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
    -b, --bin      Add bin/ folder and executable file for package.

  Examples:
    $ packo create                              Scaffolds an npm package in the current directory.
    $ packo create awesome-package               Scaffolds the "awesome-package" package.
    $ packo create awesome-package --bin         Adds "bin/" dir for package that expose a CLI.
    $ packo module dataReader                    Creates "lib/dataReader.js" and "test/dataReader_spec.js"
    $ packo check                               Validates npm-shrinkwrap.json against the Node Security Project API
    $ packo check semver@4.2.0                  Checks the semver module, version 4.2.2 for vulnerabilities against the Node Security Project API
    $ packo check semver                        Checks the latest version of the semver module.
```

## Caution

```bash
$ packo create awesome-package
The directory "awesome-package" already exists, do you want to overwrite?(y/n):
```

By answering with "y" or "Y", you acknowledge the fact that everything will be deleted from the "awesome-package" directory.

Same holds true when running `packo create` with no `[name]` argument, as the tool treats the current directory as the pacakge's root, and scaffolds the structure inside it.

```bash
$ mkdir awesome-package && cd awesome-package
$ packo create
The directory "awesome-package" already exists, do you want to overwrite?(y/n):
```
## Folder structure
The tool will generate a folder structure similar to the one below:

```bash
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
```
## Future plans

* __[WIP]__ Add tests -- the reason why tests are not available is because I needed the tool fast, and did not have the time to apply a test-driven methodology.
* __[WIP]__ Add continuous integration -- same answer as above.
* __[ONGOING]__ Make the tool more flexible in terms of options.
* __[WIP]__ Create a friendlier, more coloured CLI.
* __[ONGOING]__ Improve code quality.
* __[DONE]__ Enable the possibility to add library modules, to the `lib/` folder via CLI, and also generate the appropriate spec file withing the `test/` directory.
* __[WIP]__ Add Gulp/Grunt workflows -- probably Gulp.

## Contributing
Just fork the repo, make your changes, create a pull request. I would have loved to say fork->change->run tests->submit pull request, so if anyone can help with tests, feel free to do that.

## Final thoughts
This is work in progress, so if there are any suggestions, get in touch via [the repository's issues panel](https://github.com/opreaadrian/packo/issues) on GitHub , or via Twitter -- [@opreaadrian](https://twitter.com/opreaadrian).

