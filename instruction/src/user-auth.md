# Passport and Express

<hr>

## What is Passport?

> Passport is authentication *middleware* for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application.
>
> [http://passportjs.org/](http://passportjs.org/)

- It reduces the amount of work you need to do for authentication.
- It has the ability to do local authentication.
- It has OAuth capabilities (use Facebook, Google, or other services to log in).
- It is modular, you need to include the components that you are interested in.

[Passport Documentation](http://passportjs.org/docs)

<hr>

## Strategies

Using passport you'll hear about strategies. A strategy:

- Is a module that integrates with Passport.
- Handles a specific type of authentication (local, OAuth, etc).
- Must be installed (via npm) independently of the Passport module.
- Has its own documentation with instructions for usage.

<hr>

## Starter Code Example

```js
// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');

// initialize express app
var app = express();

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
    if (username && password === 'pass') return done(null, { username: username });
    return done(null, false);
}));

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
    done(null, { username: id });
});

// tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// home page
app.get('/', function (req, res) {
    if (req.user) return res.send('Hello, ' + req.user.username);
    res.send('Hello, Stranger!');
});

// specify a URL that only authenticated users can hit
app.get('/protected',
    function(req, res) {
        if (!req.user) return res.sendStatus(401);
        res.send('You have access.');
    }
);

// specify the login url
app.put('/auth',
    passport.authenticate('local'),
    function(req, res) {
        res.send('You are authenticated, ' + req.user.username);
    });

// log the user out
app.delete('/auth', function(req, res) {
    req.logout();
    res.send('You have logged out.');
});

// start the server listening
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
```

<hr>

## Code Break Down

This part of the code should look pretty familiar. We include the modules we plan to use and start up the express web server.

```js
// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');

// initialize express app
var app = express();

...

// start the server listening
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
```

Here we tell express what middleware to use:

- The body-parser will extract body information from the request and store it at req.body for each request.
- The cookie-parser will determine what cookies the client has on it and store it at req.cookie.
- The express-session works with cookies to create and maintain session information.
- The passport.initialize() is required to initialize passport.
- The passport.session() must be added at some point **after** express-session middleware. It augments express-sessions by adding authentication information to the session.

```js
...

// tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

...
```

This code tells passport of an authentication strategy that we will use.

- It is possible to have more than one strategy.
- The local strategy expects two parameters to be sent with the request, *username* and *password*.
- It is possible to change the names of those parameters through the local strategy configuration.
- The done function must be called after you are done checking the username and password.
    - If there was an error then the first parameter of `done` will be that error.
    - If there is no error then the first parameters should be null and the second can be the user object or false on failed authentication.

```js
...

// tell passport to use a local strategy and tell it how to validate a username and password
passport.use(new LocalStrategy(function(username, password, done) {
    if (username && password === 'pass') return done(null, { username: username });
    return done(null, false);
}));

...
```

- With session management, when a user authenticates, the user object from `done` can be serialized into a string.
- The deserialize function is used to turn the string back into the user object. This function is called when a request is made and the user is already authenticated.


```js
...

// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user.username);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(id, done) {
    done(null, { username: id });
});

...
```

Here we set up routes. If the req parameter has a `user` property then the user is authenticated.

```js
...

// home page
app.get('/', function (req, res) {
    if (req.user) return res.send('Hello, ' + req.user.username);
    res.send('Hello, Stranger!');
});

// specify a URL that only authenticated users can hit
app.get('/protected',
    function(req, res) {
        if (!req.user) return res.sendStatus(401);
        res.send('You have access.');
    }
);

// specify the login url
app.put('/auth',
    passport.authenticate('local'),
    function(req, res) {
        res.send('You are authenticated, ' + req.user.username);
    });

// log the user out
app.delete('/auth', function(req, res) {
    req.logout();
    res.send('You have logged out.');
});

...
```

<hr>

## Deeper Understanding

To better understand how these components work together:

- Run this code in debug mode.
- Set up breakpoints for the different route callbacks as well as on the LocalStrategy and the serialize/deserialize methods.
- Make GET, PUT, and DELETE requests to the various endpoints.