"use strict";
var Promise         = require('bluebird');
var request         = require('request');

module.exports = function(username, password) {
    var encoded = username ? new Buffer(username + ':' + password).toString('base64') : null;
    return function(content) {
        return new Promise(function(resolve, reject) {
            var config = {
                headers: {
                    'User-Agent': 'Gi60s',
                    'Content-Type': 'text/plain'
                },
                body: content
            };
            if (encoded) config.headers.Authorization = 'Basic ' + encoded;
            request.post('https://api.github.com/markdown/raw', config, function(err, data) {
                if (err) {
                    reject(err);
                } else if (data.statusCode === 200) {
                    resolve(data.body);
                } else {
                    reject(new Error(data.body));
                }
            });
        });
    };
};