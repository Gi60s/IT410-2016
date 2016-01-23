#!/usr/bin/env node

"use strict";
var commandLineArgs     = require('command-line-args');
var inquirer            = require('inquirer');
var fileSync            = require('./server/file-sync');
var server              = require('./server/server');


var cli = commandLineArgs([
    { name: 'username', alias: 'u', type: String },
    { name: 'password', alias: 'P', type: String },
    { name: 'port', alias: 'p', type: Number }
]);

var options = cli.parse();

if (!options.username) {
    start(null, null, options.watch);

} else if (!options.password) {
    inquirer.prompt([{
        type: 'password',
        name: 'password',
        message: 'Password:'
    }], function(answers) {
        start(options.username, answers.password, options.watch);
    });
} else {
    start(options.username, options.password, options.watch);
}

function start(username, password, port) {
    fileSync(username, password);
    server(port || 9000);
}