
# Promises

<hr>

Promises simplify complex asynchronous data flow.

Without promises, a simple asynchronous operation can be complex. For example, simultaneously loading the contents of three files and getting
there data back in the order you requested. You can see an example of this below:

```js
var fs = require('fs');
var start = Date.now();
var results = [];
var done = 3;

function checkDone() {
    done--;
    if (done === 0) {
        results.forEach(function(result) {
            console.log(result);
        });
        console.log(Date.now() - time);
    }
}

fs.readFile('./small.txt', 'utf8', function(err, data) {
    results[0] = data.substr(0, 6);
    checkDone();
});

fs.readFile('./medium.txt', 'utf8', function(err, data) {
    results[1] = data.substr(0, 6);
    checkDone();
});

fs.readFile('./large.txt', 'utf8', function(err, data) {
    results[2] = data.substr(0, 6);
    checkDone();
});
```

<hr>

## Basics

- A Promise is a JavaScript object with properties.
- Some properties contain status information about the asynchronous operation.
- Some properties have functions that allow you to access the result of the asynchronous operation once it is ready.
- Promises mimic synchronous data flow.

### Mimicking Synchronous Data Flow

The following two examples show the similarities between synchronous and asynchronous promise code structures.
These two examples would produce the exact same results, pass or fail.

#### Synchronous Example

```js
try {
    var content = readFileSync('./file.txt');
    console.log(content);
} catch (err) {
    console.error(err.stack);
}
```

#### Asynchronous Example

```js
readFile('./file.txt')
    .then(function(content) {
        console.log(content);
    })
    .catch(err) {
        console.error(err.stack);
    });
```

<hr>

## A+ Promises

- A standard was created to define how promises should work.
- Before browsers or NodeJS implemented promises, other developers followed the promise specifications to build libraries that implemented promises.
- There are many Promise libraries. For a list of fully compliant promise libraries, visit https://promisesaplus.com/implementations.
- Bluebird is currently considered the best implementation due to it's high performance nature.

Some of the very latest JavaScript engines implement Promise natively, but bluebird is currently higher performing than
even the native implementations. See: http://programmers.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird

### Terminology

Here are some terms you should be familiar with and that you should use when talking about promises.

- **promise** - An object with a `then` method whose behavior conforms to the [A+ Promise specifications](https://promisesaplus.com/)
- **resolve** - If a promise completes successfully then the promise has been *resolved* and it returns a *value*.
- **reject** - If a promise does not complete succesfully then the promise has been *rejected* and it returns a *reason*.
- **reason** - The value that indicates why the promise was *rejected*.
- **value** - The value that was returned by a successful promise resolution.
    
<hr>

## Creating a Promise

Creating a promise can be daunting at first, so let's break it up before we see the whole:

#### 1. Function Signature

The function signature for a promise is simple. You pass a callback function into the Promise function as its first
parameter. The Promise function must be called with the `new` keyword so that you can get back an instance of a promise.

```js
var promise = new Promise (promiseCallback);
```

#### 2. Callback Signature

- The callback function will be called with two parameters: resolve and reject. 
- Resolve and reject are functions.
- To *resolve* the promise, call the resolve function and optionally give it one parameter, a *value*.
- To *reject* the promise, call the reject function and optionally give it one parameter, a *reason*.
- If an Error is thrown within the promise callback and it is not caught then the promise instance will catch the Error for you and cause a rejection to occur, with the reason being the Error.
- Once you resolve or reject the promise, you cannot resolve or reject it again later.

```js
var promise = new Promise(function(resolve, reject) {
    if ( ... ) return reject("Didn't work.");
    resolve("It worked");
});
```

#### 3. Returning a Promise

It is common to write a function that returns a promise. Here is an example of how you would do that:

```js
function doSomething(x, y) {
    return new Promise(function(resolve, reject) {
        if (x > y) return resolve(x);
        reject(y);
    });
}
```


<hr>

## Exercise

1. Create a function that takes a callback and a number as parameters and returns a promise.
2. The number will specify a delay that you should create using the `setTimeout` function.
3. The callback will be called after the delay and should return a value.
3. The value that is returned from the callback should be used to resolve the promise.

You can model your solution after the example we just saw:

```js
function doSomething(x, y) {
    return new Promise(function(resolve, reject) {
        if (x > y) return resolve(x);
        reject(y);
    });
}
```

<hr>

### Exercise Solution

Keep a copy of this code because we'll be using it in the next few exercises.

```js
function timeoutPromise(delay, callback) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            var value = callback();
            resolve(value);
        }, delay);
    });
}
```

<hr>

## Processing a Promise's Outcome


### Promise.then

- The `then` property from a Promise is a function that accepts a callback function.
- The callback function will only get one parameter, the result of the asynchronous operation.

```js
var promise = readFile('./file.txt');
promise.then(function(content) {
    console.log('File Contents: ' + content);
});
```

- There is also a second optional parameter for `then`.
- This parameter also must be a callback function, but it will receive any thrown errors.

```js
var promise = readFile('./file.txt');
promise.then(function(content) { ... }, function(err) {
    console.error(err.stack);
});
```

So this is the function signature for `then`: **.then ( successCallback [, errorCallback ] );**

It's all a matter of preference, but I usually omit the error callback function an instead use the `catch` function (below).

### Promise.catch

- The `catch` property is a function that accepts a callback function.
- The callback that you give the `catch` will only be called if an error is thrown.

```js
var promise = readFile('./file.txt');
promise.catch(function(err) {
    console.error(err.stack);
});
```

### Promise Property Chains

An interesting thing about `then` and `catch` is that they ***always*** return a promise. If you are in a `then` or a
`catch` callback and your callback...

- Returns a value, then the value is returned as a *resolved* promise *value*.
- Returns a Promise instance, then that instance is returned.
- Throws an Error, then a promise is returned that is *rejected* with the *reason* being the error.

What that means is that you can create promise property chains where you call `then` or `catch` after any `then` or `catch`.

Note that if a promise is ever *rejected* then all `then` functions that follow will be skipped until a `catch` function
catches the *rejected* promise.

#### Example

```js
getPromise()
    .then(function(value) {
        console.log(value);
    })
    .catch(function(reason) {
        console.error(reason);
    });
```

<hr>

## Exercise

1. Create a function called `returnValue` that returns a value.
2. Use the `timeoutPromise` function to call this function.
3. Use `then` and `catch` along with `console.log` to determine how the result was returned.

#### Question

1. Was the promise resolved or rejected?

<hr>

## Exercise

1. Create a function called `throwError` that throws an Error.
2. Use the `timeoutPromise` function to call this function.
3. Use `then` and `catch` along with `console.log` to determine how the result was returned.

#### Questions

1. Was the promise resolved or rejected?
2. `timeoutPromise` never calls the *reject* function, so how was this rejected?

<hr>

## Exercise

1. Create a function that returns an Error.
2. Use the `timeoutPromise` function to call this function.
3. Use `then` and `catch` along with `console.log` to determine how the result was returned.

#### Question

1. Was the promise resolved or rejected?

<hr>

## Exercise

Take the following synchronous example and build it's asynchronous equivalent using `timeoutPromise` for both the
`throwError` and `returnValue` functions.

```js
try {
    throwError();
    console.log('Ok');
} catch (err) {
    console.log('Oops');
}
console.log(returnValue());
```

<hr>

## Solution

```js
timeoutPromise(100, throwError)
    .then(function(value) {
        console.log('Ok');
    });
    .catch(function(err) {
        console.log('Oops');
    })
    .then(function(value) {
        return timeoutPromise(100, returnValue);
    })
    .then(function(value) {
        console.log(value);
    });
```

<hr>

## Exercise

Take the following synchronous example and build it's asynchronous equivalent using `timeoutPromise` for both the
`throwError` and `returnValue` functions.

The subtle distinction between this exercise and the previous is that the result isn't output until the end.

```js
var result;
try {
    throwError();
    result = 'Ok';
} catch (err) {
    result = 'Oops';
}
result += returnValue();
console.log(result);
```

<hr>

## Solution

```js
timeoutPromise(100, throwError)
    .then(function(value) {
        return 'Ok';
    });
    .catch(function(err) {
        return 'Oops';
    })
    .then(function(value1) {
        return timeoutPromise(100, returnValue)
            .then(function(value2) {
                return value1 + value2;
            });
    })
    .then(function(value) {
        console.log(value);
    });
```