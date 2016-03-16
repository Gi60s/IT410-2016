"use strict";
var express             = require('express');
var fs                  = require('fs');
var path                = require('path');

module.exports = function(port) {
    var app = express();
    var distDirectory = path.resolve(__dirname, '../dist');
    var markdownCssPath = path.resolve(__dirname, '../node_modules/github-markdown-css/github-markdown.css');
    var resourceDirectory = path.resolve(__dirname, './resources');

    app.get('*', function (req, res) {
        var ext;
        var filePath;
        var url;

        url = req.url.split('?')[0];
        if (url === '/') url = 'index.html';

        switch (url) {
            case '/markdown.css':
                res.sendFile(markdownCssPath);
                break;
            case '/main.css':
            case '/main.js':
                res.sendFile(resourceDirectory + url);
                break;
            default:
                res.sendFile(distDirectory + '/' + url);
        }
    });

    app.listen(port, function () {
        console.log('Server listening on port ' + port);
        console.log('Press Ctrl-C to terminate server.');
    });

};