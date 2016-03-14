# AngularJS Scope

<hr>

- Angular applies scope to the DOM (similar to JavaScript scope).
- Scope defines a context.
- Expressions in the HTML are evaluated against the scope they reside within.

<hr>

## Relationship Between $scope and Controller As

### index.html

**With Controller As**

- We need to specify a variable name that is applied to the instance of the controller.
- To evaluate controller properties we need to use that variable name.

```html
...

<body ng-app="app" ng-controller="AppController as ctrl">
  <p>{{ctrl.message}}</p>
</body>

...
```

**With $scope**

- We don't set a variable name for the instance of the controller.
- Properties are evaluated against the current scope (or context).

```html
...

<body ng-app="app" ng-controller="AppController">
  <p>{{message}}</p>
</body>

...
```

### main.js

**With Controller As**

- We set properties on the `this` object.

```js
(function() {
    "use strict";
    var app = angular.module('app', []);

    app.controller('AppController', [function() {

        this.message = 'You are awesome!';

    }]);

})();
```

**With $scope**

- We inject the current $scope (or context).
- We set properties on the $scope object.

```js
(function() {
    "use strict";
    var app = angular.module('app', []);

    app.controller('AppController', ['$scope', function($scope) {

        $scope.message = 'You are awesome!';

    }]);

})();
```

<hr>

## How Controller As Works

There is no real magic to Controller As.

1. The directive `ng-controller` reads its property value.
2. If it has the `as` keyword after the controller followed by a name, it adds that name to the $scope.

This is what it would look like if you did it through the Controller definition:

```js
(function() {
    "use strict";
    var app = angular.module('app', []);

    app.controller('AppController', ['$scope', function($scope) {

        this.message = 'You are awesome!';

        $scope.ctrl = this;

    }]);

})();
```

<hr>

## Pros and Cons / $scope vs Controller As

### $scope

**Pros**

- Can observe model mutations (using $watch).
- Can propagate model changes (using $apply).
- Can digest model changes (using $digest).
- Can both send (using $broadcast or $emit) and receive events.
- Can inherit prototypically from parent scopes.

**Cons**

- Can be more complicated.
- Can inherit prototypically from parent scopes.

### Controller As

**Pros**

- Less complicated.
- No inheritance.

**Cons**

- No custom observers or appliers.
- No event propagation or reception.
- No inheritance.

#### Question

How can prototypical inheritance be both a pro and a con?

<hr>

#### Question

How can prototypical inheritance be both a pro and a con?

#### Answer

In the following example:

- We don't worry about creating a controller.
- The `ng-app` directive binds the `$rootScope` to the `<body>` tag.
- The first `input` property is being defined on the `$rootScope`.
- The `ng-if` directive creates a prototypically inherited child scope.
- The second input is not part of the DOM until the first input has content.

[Try the Demo](./angular-scope/scope-inheritance.html)

```html
<!doctype html>
<html>
  <head>
    <title>Scope Inheritance</title>
  </head>
  <body ng-app>
    <p><input ng-model="input"></p>
    <div ng-if="input">
      <p><input ng-model="input"></p>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script>
  </body>
</html>
```

1. Type into the first input and watch both update.
2. Type into the second input and only the second update.
3. Type again into the first input and the first updates.

This occurs because of prototypical inheritance.

**Read** - If you try to read a property on an object and the property doesn't exist then it will look to see if the parent that the object inherits from has that property and will continue to look upward on the prototype chain until it is either exhausted or found.

**Write** - When you write a property to an object it is writing the property directly onto the object. The object still may have a property with the same name that it inherits from, but when you read the property now it sees the one that you just wrote and it doesn't look to the prototype chain to resolve the property.

<hr>

## $scope events

[$scope API](https://docs.angularjs.org/api/ng/type/$rootScope.Scope)

- **$scope.$broadcast(name [, args]...)** - Dispatches an event downward to all child scopes.
- **$scope.$emit(name [, args]...)** - Dispatches an event upward to all parent scopes.
- **$scope.on(name, listener)** - Listens for an event with the name specified and calls the callback listener function with the event and arguments as parameters.

<hr>

## $scope.$apply()

[$scope API](https://docs.angularjs.org/api/ng/type/$rootScope.Scope)

- When you modify properties on the $scope, the $scope is aware of those modifications.
- If you modify a value out of $scope that affects what $scope's values should be then you'll need to use $scope.$apply().
- This will start at the $rootScope and run $digest cycles for all child scopes.

<hr>

## $scope.$watch

[$scope API](https://docs.angularjs.org/api/ng/type/$rootScope.Scope)

**$scope.$watch(expression, listener [, objectEquality])**

- Every $digest the $watch expression is evaluated.
- The expression can be:
  - A string representing a property name on the $scope.
  - A function that returns a value.
- The expression should be idempotent (same input produces same output).
- If the evaluated expression has changed value then the listener function is called with two parameters: previousValue and newValue.
- If objectEquality is set to true then a deep equal test is made. This is more costly than a regular equal.
