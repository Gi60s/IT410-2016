"use strict";
var Promise     = require('bluebird');

exports.add = function(a, b) {
    return a + b;
};

exports.absAdd = function(a, b) {
    return Math.abs(a) + Math.abs(b);
};

exports.addEventually = function(a, b) {
    return new Promise(function(resolve, reject) {
        resolve(a + b);
    });
}