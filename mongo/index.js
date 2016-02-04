"use strict";
var MongoClient = require('mongodb').MongoClient;

// Connection url
var url = 'mongodb://localhost:27017/test';

// Connect using MongoClient
MongoClient.connect(url, function(err, db) {

    var collection = db.collection('test');

    collection.insertOne({ foo: 'bar' })
        .then(function(result) {
            return collection.find().toArray();
        })
        .then(function(result) {
            console.log(result);
            return db.close();
        })
        .catch(function(e) {
            console.error(e.stack);
        });

});