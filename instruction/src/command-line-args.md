# Command Line Arguments

<hr>

It is possible to read the command line arguments that were used to start your application.

#### Exercise

1. Create a JavaScript file called "command-line-args.js".
2. Log to the console `process.argv`.
3. Run your application with `node command-line-args` and look at the output.
4. Run it again with `node command-line-args foo bar --baz` and look at the output.

#### Questions

1. From running your application, what does the first argument represent?
2. What does the second argument represent?

<hr>

## Parsing Command Line Arguments

There are several modules that I recommend for parsing command line arguments.

- [command-line-args](https://www.npmjs.com/package/command-line-args) - A module for parsing command line arguments.
- [command-line-callback](https://www.npmjs.com/package/command-line-callback) - A module for building applications that accepts git-style commands.
- [commander](https://www.npmjs.com/package/commander) - A module that provides a complete (albiet complex) solution for command line arguments and git-style commands.

<hr>

## Current Working directory

At times when using command line arguments an argument may include a file path that should be used by the application. If the file path is relative, you can use `process.cwd()` to get the directory from which the application was launched.
