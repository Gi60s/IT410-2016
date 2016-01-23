"use strict";
var chokidar            = require('chokidar');
var crypto              = require('crypto');
var fs                  = require('fs');
var path                = require('path');
var Promise             = require('bluebird');

var distDirectory = path.resolve(__dirname, '../dist');
var readFile = Promise.promisify(fs.readFile);
var srcDirectory = path.resolve(__dirname, '../src');
var writeFile = Promise.promisify(fs.writeFile);

module.exports = function(username, password) {
    var store = {};
    var transpile = require('./transpile')(username, password);
    var watcher;

    // read the dist directory and get stats for each file into a store
    loadDistStore(store, distDirectory);

    // watch the resources directory, if file is changed and mtime is newer than dist mtime then transpile. If remove then remove dist file
    watcher = chokidar.watch(srcDirectory, { alwaysStat: true });
    watcher.on('all', function(event, filePath, stats) {
        var ar = path.relative(__dirname, filePath).split(path.sep).slice(2);
        var src = ar.join(path.sep);
        var dest = path.resolve(distDirectory, src).replace(/\.md$/i, '.html');
        var key;
        var mtime;

        // if it's not a mark down file then exit
        if (!/\.md$/i.test(filePath)) return;

        // get the file key
        key = filePath.substr(srcDirectory.length).replace(/\.md$/i, '').substr(1);

        switch (event) {
            case 'add':
            case 'change':
                mtime = stats.mtime.getTime();

                // if the mtime is less than or equal to store's mtime then exit
                if (store.hasOwnProperty(key) && mtime <= store[key].mtime) return;

                // initialize store
                if (!store.hasOwnProperty(key)) store[key] = {};

                // update the store's mtime
                store[key].mtime = mtime;

                // read the file
                readFile(filePath, 'utf8')

                    // determine if the has has changed and if so transpile
                    .then(function(data) {
                        var hash = getHash(data);
                        if (hash !== store[key].hash) {
                            store[key].hash = hash;
                            return transpile(data);
                        }
                    })

                    // wrap the transpiled content
                    .then(function(content) {
                        var html;
                        if (content) {
                            html = "<!doctype html><html lang=''><head>" +
                                "<meta charset='utf8'>" +
                                '<meta name="viewport" resources="width=device-width, initial-scale=1">' +
                                '<link rel="stylesheet" href="markdown.css">' +
                                '<link rel="stylesheet" href="main.css">' +
                                '</head><body><div id="Main" class="markdown-body">\n' +
                                content +
                                '\n<script src="main.js"></script>' +
                                '</body></html>';
                            console.log('Transpiled: ' + key);
                            return writeFile(dest, html, 'utf8');
                        }
                    });
                break;
            case 'unlink':
                fs.unlink(dest);
                delete store[key];
                break;
        }
    });
};

function getHash(content) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(content);
    return content.length + ':' + md5sum.digest('hex');
}

function loadDistStore(store, directoryPath) {
    var stat = fs.statSync(directoryPath);
    if (stat.isDirectory()) {
        fs.readdirSync(directoryPath)
            .forEach(function(filePath) {
                var content;
                var key;
                var stat;
                filePath = path.resolve(directoryPath, filePath);
                stat = fs.statSync(filePath);
                if (stat.isFile() && /\.html$/.test(filePath)) {
                    key = filePath.substr(distDirectory.length).replace(/\.html$/, '').substr(1);
                    store[key] = {
                        mtime: stat.mtime.getTime()
                    };
                } else if (stat.isDirectory()) {
                    loadDistStore(store, filePath);
                }
            });
    }
}