# MongoDB

<hr>

## What is MongoDB

- It is a [NoSQL](/nosql.html) document database.
- It is open source.
- It is built for high performance, high availability, and automatic scaling.

#### Questions

1. What is availability referring to?
2. What is automatic scaling?

<hr>

### MongoDB Documents

Instead of storing rows (like you would do in an SQL database) you store documents. A document is very similar to the JSON object format.

```js
{
    name: 'Bob',
    age: 25,
    roles: ['Support', 'Developer']
}
```

## Installation

Depending on your operating system, there are a few ways to install MongoDB. Follow the link below to install MongoDB for your specific operating system.

There are also two versions of mongo you can install. The community version is open source and can do everything that the enterprise version does. The enterprise version comes with some extra features that make it easier to manage and monitor your databases.

- [Install Community](https://docs.mongodb.org/manual/administration/install-community/)
- [Install Enterprise](https://docs.mongodb.org/manual/administration/install-enterprise/)

Take a few minutes to install [MongoDB Community Edition](https://docs.mongodb.org/manual/administration/install-community/) on your machine.

<hr>

## SQL to MongoDB

There isn't exactly a one-to-one relationship between the concepts you may be familiar with from SQL, but there are similarities.

- [SQL Comparison](https://docs.mongodb.org/manual/reference/sql-comparison/)
- [SQL Aggregation](https://docs.mongodb.org/manual/reference/sql-aggregation-comparison/)

<hr>

## MongoDB Node Modules

These two NodeJS modules are very helpful in interfacing NodeJS with MongoDB.

- [mongodb](https://www.npmjs.com/package/mongodb) - Use this module for a simple interface for connecting to your MongoDB instance.
- [mongoose](https://www.npmjs.com/package/mongoose) - Use this module to establish models and schemas over MongoDB. This allows you to enforce at the server level consistency between documents within a collection.

#### Exercise - Part 1

1. Open a terminal.
2. Type `mongod --help` and read up on the help to find:
  - How to specify a port for your database to listen on.
  - How to specify the storage directory for your data.
3. Start `mongod` with the port and directory of your choosing, or let them stay at default values.

#### Exercise - Part 2

1. Create a directory to play around with MongoDB.
2. Add an `index.js` file to the directory.
3. Install the `mongodb` module using `npm`.
4. Later there will be code samples that you can try out using this file.

<hr>

## Start Your Mongo Server and Connect

```sh
mongod --dbpath=/data --port 27017
```

```js
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  if (err) {
      console.error(err.stack);
  } else {
      console.log("Connected correctly to server");
      db.close();
  }
});
```

<hr>

## Documentation

- The API can be found at http://mongodb.github.io/node-mongodb-native/2.1/api/.
- The API has a lot of function calls and hundreds if not thousands of examples.
- Functions in the API that take a callback often also will return a promise if no callback is supplied.

### Collections

Before you can start reading from and writing to your database, you'll have to specify the collection that you are interested in. If you specify a collection that doesn't exist then it will create it for you when you do an insert.

```js
MongoClient.connect(url, function(err, db) {

    var collection = db.collection('test');

    collection.insertOne({ foo: 'bar' })
        .then(function(result) {
            return db.close();
        })
        .catch(function(e) {
            console.error(e.stack);
        });

});
```

### Insert

There are various insert methods. Here are two:

- [insertOne](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#insertOne)
- [insertMany](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#insertMany)

### Find

You can use find to get back a cursor. A cursor is a pointer to data. You can iterate over the cursor to get the data from the database.

- [find](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#find)
- [cursor](http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html)

Two common functions that you can use from the cursor are [forEach](http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html#forEach) and [each](http://mongodb.github.io/node-mongodb-native/2.1/api/Cursor.html#each).

### Update

- [findOneAndUpdate](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#findOneAndUpdate) - An atomic operation that performs a lock on the database.
- [updateOne](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateOne) - Update the first document that matches the filter.
- [updateMany](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#updateMany) - Update multiple documents at once.

### Delete

- [deleteMany](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#deleteMany) - Delete all documents that match the filter.
- [deleteOne](http://mongodb.github.io/node-mongodb-native/2.1/api/Collection.html#deleteOne) - Delete the first document that matches the filter.
