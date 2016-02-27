# AngularJS Introduction

<hr>

AngularJS is a framework. As such:

- You are bound to the constraints they impose.
- You receive a wealth of tools to make your life easier.

AngularJS is an MVC framework:

- **Model** - The data.
- **View** - The way the data is presented.
- **Controller** - The bridge between the view and the model, enabling communication between them.

Some of the tools that angular provides are:

- **Directives** - Custom HTML elements or attributes.
- **Services** - Functions you can use in your JavaScript to help you get things done. For example, AJAX.
- **Filters** - Tools for modifying output without modifying the value.
- **Routing** - Load specific views based on URL without actually reloading the page.

<hr>

#### Exercise

1. Create a directory where you can put the code for an AngularJS application.
2. Create an `index.html` file in that directory.
3. Add this content to the `index.html` file:

    ```html
    <!doctype html>
    <html>
      <head>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
      </head>
      <body></body>
    </html>
    ```

At this point we are ready to begin writing our first AngularJS application.

For the exercises in this project we'll need a static file server. Feel free to use the one that you build in class, or do the following:

1. Install the NodeJS http-server globally: `npm install -g http-server`
2. Start the server: `http-server [PATH] [OPTIONS]`
    - If you don't specify the path then the current working directory will be used.
    - Start http-server in your application's directory.
3. Open a web browser and try loading your app from `http://localhost:8080` or whatever port was used.

<hr>

## Bootstrap and Data Bind

In AngularJS bootstrapping is the process of binding an application to the HTML (or more precisely to the DOM).

**Question:** What is the DOM?

#### Exercise

1. Add the attribute `ng-app` to your `<html>` tag. Don't worry about having `ng-app` equal anything.
2. In the body add: `<p><input ng-model="data"></p>`.
3. Also add to the body: `<p>Data: {{data}}</p>`.
4. Reload your app in the browser.
5. Enter some data into the input field and watch what happens.

#### Exercise Explanation

**ng-app** is an AngularJS directive that makes it so that the application is scoped to the element that this attribute is placed on.
**ng-model** is an attribute that sets up a two way binding of data. Changes to the input update the model.
**{{data}}** is an AngularJS evaluation. Anything within

the double-squiggly brackets will be evaluated at the current scope.

Every time the model is updated, the view is also updated. This is facilitated by the controller.

- We have not included a controller yet, so the global controller is used in this example.
- We also didn't give the `ng-app` directive a name, so it is using the default app object.

<hr>

## Hands on Development: Guess the Number Application

We're going to create an application, using AngularJS, that meets this criteria:

- Has an input field of type `number`.
- Gives you 7 guesses to guess a random number between 0 and 100.
- Tells you which guesses you've already made, using `ng-repeat`. (Talk about scope.)
- Tells you whether you need to guess higher or lower after each guess. Use a filter to make this uppercase.
- Tells you the number of guesses remaining.
- Disables the input field (with `ng-disabled`) and the form when the game is over.

<hr>

#### Solution

**index.html**

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title>
</head>
<body ng-app="app" ng-controller="AppController as ctrl">

<form ng-submit="ctrl.submit($event)">
    <p>
        <label for="guess">Guess the Number</label>
        <input type="number" id="guess" ng-model="ctrl.guess" ng-disabled="ctrl.done()">
    </p>
</form>

<p>{{ctrl.message | uppercase}}</p>
<p>
    Previous Guesses:
    <span ng-repeat="g in ctrl.guesses">{{g}} &nbsp; </span>
</p>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js"></script>
<script type="text/javascript" src="js/main.js"></script>

</body>
</html>
```

**main.js**

```js
(function() {
    "use strict";
    var app;

    app = angular.module('app', []);

    app.controller('AppController', [function() {
        var answer = Math.round(Math.random() * 100);
        var available = 7;
        var controller = this;
        var done = false;

        controller.done = function() {
            return done;
        };

        controller.guess = '';

        controller.guesses = [];

        controller.remaining = available;

        controller.message = 'Guess a number between 1 and 100.';

        controller.submit = function(e) {
            e.preventDefault();
            if (done) return;
            if (controller.guess === answer) {
                controller.message = 'You guessed the number!';
                done = true;
            } else {
                controller.guesses.push(controller.guess);
                controller.remaining--;
                if (controller.remaining > 0) {
                    controller.message = 'Guess ' + (controller.guess > answer ? 'lower' : 'higher') + '. ' +
                        controller.remaining + ' guesses remaining.';
                } else {
                    done = true;
                    controller.message = 'You ran out of guesses. The answer was ' + answer;
                }
            }
        };

    }]);

})();
```

<br>

## $http Service

- Requires dependency injection to inject the service.
- Used to make AJAX calls.

```js
angular.module('app', [])
  .controller('MyCtrl', ['$http', function($http) {
    var ctrl = this;

    this.foo = null;

    $http.get('/some/url')
      .then(function(result) {
        ctrl.foo = result;
      })
  }]);
```

<hr>

## Views and Routes

https://docs.angularjs.org/api/ngRoute/directive/ngView

Within the `index.html` file:

- angular-route.js has to be included separately from angular.js
- their exists an ng-view directive.
- the links actually change the URL (but not all browsers support HTML5 mode)

Within the `scripts.js` file:

- The ngRoute is a dependency of the main app.
- We have to configure the routes during the config phase.
- Each route is given a template and a controller.
