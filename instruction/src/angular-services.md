# AngularJS Services

<hr>

- A service is view independent business logic.
- A controller should contain just the logic needed for communication between the model and the view.
- Services help to keep your code organized.
- Services are reusable throughout your code.
- A service is a black box with inputs and outputs (interfaces). The code inside can change whenever as long as the interfaces stay the same.

<hr>

## Controller Logic vs Service Logic

In the last class we developed a guess the number game, but we mixed controller logic with business logic. Here we'll separate the two.

This is our controller from before.

```js
app.controller('AppController', [function() {
    var answer = Math.round(Math.random() * 100);

    this.done = false;

    this.guess = 50;

    this.guesses = [];

    this.remaining = 7;

    this.message = '';

    this.checkGuess = function(e) {
        e.preventDefault();

        if (this.done) return;

        this.remaining--;
        if (this.guess === answer) {
            this.message = 'You are so right!';
            this.done = true;
        } else if (this.guess < answer) {
            this.message = 'Guess higher.';
        } else {
            this.message = 'Guess lower.';
        }

        if (this.remaining === 0) this.done = true;

        this.guesses.push(this.guess);
    };

}]);
```

#### Questions

1. Which components of this controller are controller logic?
2. Which components of the controller are service logic?
3. Are there any components that are both controller and service logic?

#### Exercise

We're going to separate the service logic from the controller logic for the above example.

1. Create a service called "guessGame".
2. Move answer, remaining, guesses made, and make a guess to the service.
3. Inject the service into the controller and add controller logic to use service logic.
4. Add a function to reset the game to the service. 

<hr>

## Guess the Number Service

```html
<!doctype html>
<html ng-app="app" ng-controller="AppController as ctrl">
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
    <script src="app.js"></script>
</head>
<body>
    <form ng-submit="ctrl.checkGuess($event)">
        <p>
            <input type="number" ng-model="ctrl.guess"
                ng-disabled="ctrl.done()">
        </p>
    </form>
    <p>You have {{ctrl.remaining()}} guesses.</p>
    <p>{{ctrl.message}}</p>
    <p>
        You have already guessed these numbers:
        <span ng-repeat="g in ctrl.guesses() track by $index">
            {{g}} &nbsp;
        </span>
    </p>

</body>
</html>
```

```js
(function() {
    "use strict";

    var app = angular.module('app', []);

    app.controller('AppController', ['guessGame', function(game) {

        this.done = function() {
            return game.remaining() === 0;
        };

        this.guess = 50;

        this.guesses = game.guesses;

        this.remaining = game.remaining;

        this.message = '';

        this.checkGuess = function(e) {
            e.preventDefault();
            this.message = 'Guess was ' + game.guess(this.guess);
        };

    }]);

    app.service('guessGame', [function() {
        var answer;
        var guesses = [];
        var remaining;

        this.guess = function(number) {
            var value;

            if (remaining > 0) {
                guesses.push(number);
                remaining--;

                if (number === answer) {
                    remaining = 0;
                    value = 'correct';
                } else if (number < answer) {
                    value = 'too low';
                } else if (number > answer) {
                    value = 'too high';
                }

                return value;
            }
        };

        this.guesses = function() {
            return guesses.slice(0)
        };

        this.remaining = function() {
            return remaining;
        };

        this.reset = function() {
            answer = Math.round(Math.random() * 100);
            remaining = 7;
        };

        // start the game
        this.reset();
    }]);
})();
```

<hr>

## Service vs Factory

A service

- is instantiated the first time that you inject it into another service type.
- is a singleton (there is only ever one).
- is called using as a constructor function (hence the use of `this`).
- is probably best having no state.
- is produced behind the scenes using a factory (syntactic sugar).

A factory

- is instantiated the first time that you inject it into another service type.
- requires you to return something.
- is more versatile than a service.

With all that said, it probably wasn't the best idea to create the guess game as a service. It should instead be a factory.

#### Exercise

1. Recreate the guessGame service as a factory.
2. Have the factory return a function that creates an instance of the game.
3. Allow the factory to take a parameter that specifies the maximum possible value for guessing.

<hr>

#### Solution

```js
app.controller('AppController', ['guessGame', function(guessGame) {
    var game = guessGame();

    // ... the rest of the code is unchanged

}]);

app.factory('guessGame', [function() {
    return function(max) {
        var answer;
        var factory = {};
        var guesses = [];
        var remaining;

        if (arguments.length === 0) max = 100;

        factory.guess = function (number) {
            var value;

            if (remaining > 0) {
                guesses.push(number);
                remaining--;

                if (number === answer) {
                    remaining = 0;
                    value = 'correct';
                } else if (number < answer) {
                    value = 'too low';
                } else if (number > answer) {
                    value = 'too high';
                }

                return value;
            }
        };

        factory.guesses = function () {
            return guesses.slice(0)
        };

        factory.remaining = function () {
            return remaining;
        };

        factory.reset = function () {
            answer = Math.round(Math.random() * max);
            remaining = 7;
        };

        // start the game
        factory.reset();

        return factory;
    }
}]);
```

<hr>

## Terminology: Providers and Services

- A provider can be run during the configuration phase.
- A service is run during the run phase, including:
    - Services
    - Factories
    - Values
    - Constants
    
<hr>
    
## $http Service

https://docs.angularjs.org/api/ng/service/$http

- This service can be injected into any module component.
- It makes AJAX calls for you.
- It returns a [promise](/promises.html). You should use `.then(successCallback, errorCallback)` for the results of the promise.
- It has shortcut methods for [$http.get](https://docs.angularjs.org/api/ng/service/$http#get), [$http.post](https://docs.angularjs.org/api/ng/service/$http#post), [$http.put](https://docs.angularjs.org/api/ng/service/$http#put), [$http.delete](https://docs.angularjs.org/api/ng/service/$http#delete), and more.
- It has defaults (headers and configurations) that can be configured through the provider.
- It has security built it, but needs your help to make things very secure.
    
<hr>

#### Exercise

A few weeks ago we had a homework assignment to make web services that access our user management system. Now we're going to create an AngularJS service service to access those REST services.

1. Create a service. You might want to name it "ums" or "userManagementSystem".
2. The service should return these functions:
    - createUser
    - updateUser
    - authenticate
3. Set up a controller that will use the service to access your web resources.