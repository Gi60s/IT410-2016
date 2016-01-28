"use strict";
var fs = require('fs');
var Path = require('path');
var Promise = require('bluebird');

exports.getType = function(path) {
    return new Promise(function(resolve, reject) {

    });
};

exports.readdir = function(path) {
    return getType(path)
        .then(function(type) {
            if (type !== 'directory') throw Error('Not a directory');
            return new Promise(function(resolve, reject) {
                fs.readdir(path, function(err, files) {
                    if (err) return reject(err);
                    return resolve(files);
                });
            });
        });
};

exports.getDirectoryTypes = function(path, depth, filter) {
    var result = {};

    if (arguments.length < 2) depth = -1;
    if (arguments.length < 3) filter = function() { return true };

    return exports.readdir(path)
        .then(function(files) {
            var promises = [];
            files.forEach(function(file) {
                var fullPath = Path.resolve(path, file);
                var promise = exports.getType(fullPath)
                    .then(function(type) {
                        if (filter(path, type)) result[fullPath] = type;
                        if (type === 'directory' && depth !== 0) {
                            return exports.getDirectoryTypes(fullPath, depth - 1, filter)
                                .then(function(map) {
                                    Object.assign(result, map);
                                });
                        }
                    });
                promises.push(promise);
            });
            return Promise.all(promises)
                .then(function() {
                    return result;
                });
        });
}