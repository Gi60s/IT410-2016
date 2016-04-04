# Functional Reactive Programming

<hr>

In order to understand how this works we first need to recap two other ideas that we've already covered to some degree:

1. Functional Programming
2. Event Driven Programming

<hr>

## Functional Programming

There are two ways to program: functionally and imperatively.

### Imperative

* **Programmer Focus** - How to perform tasks (algorithms) and how to track changes in state
* **State Changes** - Important
* **Order of Execution** - Important
* **Primary Flow Control** - Loops, conditions, and function calls
* **Primary Manipulation Unit** - Instances of structures or classes

```js
var numbers = [1,2,3,4,5];
var doubled = [];

for(var i = 0; i < numbers.length; i++){
  var newNumber = numbers[i] * 2;
  doubled.push(newNumber);
}
console.log(doubled); // [2,4,6,8,10]
```

### Functional Programming

* **Programmer Focus** - What information is desired and what transformations are required.
* **State Changes** - Non-existent (Immutable)
* **Order of Execution** - Low importance
* **Primary Flow Control** - Function calls, including recursion
* **Primary Manipulation Unit** - Functions and data collections

```js
var numbers = [1,2,3,4,5];

var doubled = numbers.map(function(n) {
  return n * 2
});

console.log(doubled); //[2,4,6,8,10]
```

<hr>

### Imperative is Conceptually Straight Forward

The following two examples do the exact same thing, but one is imperative and one is functional. Both functions below take an array of numbers and return the sum of them.

```js
var x = sum([1, 2, 3, 4]);  // 10
```

**Imperative Example: For Loop**

```js
function sum(numbers) {
    var i;
    var total = 0;
    for (i = 0; i < numbers.length; i++)
        total += numbers[i];
    }
    return total;
}
```

**Functional Example: Recursion**

```js
function sum(numbers) {
    if (numbers.length === 0) {
        return 0;
    } else if (numbers.length === 1) {
        return numbers[0];
    } else if (numbers.length > 1) {
        var copyRest = numbers.slice(1);
        return numbers[0] + sum(copyRest);
    }
}
```

<hr>

### The Real World More Closely Models Imperative Programming

**Imperative Mutable Object**

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var p = new Person('Bob', 15);
p.age = 16;
```

**Functional Immutable Object**

```js
function Person(name, age) {
    this.name = function() {
        return name;
    };
    this.age = function() {
        return age;
    }
}

var p = new Person('Bob', 15);
p = new Person('Bob', 16);
```

<hr>

### Imperative is Less Stable, Functional Might be Stale

**Imperative Example**

```js
function asyncFullName(person, callback) {
    var fullName = person.firstName + ' ';
    setTimeout(function() {
        fullName += person.lastName;
        callback(fullName);
    });
}

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

var p = new Person('Bob', 'Smith');
asnycFullName(p, console.log);          // will eventually output "Bob Jones"
p.lastName = 'Jones';
```

**Functional Example**

```js
function asyncFullName(person, callback) {
    var fullName = person.firstName() + ' ';
    setTimeout(function() {
        fullName += person.lastName();
        callback(fullName);
    });
}

function Person(firstName, lastName) {
    this.firstName = () => firstName;
    this.lastName = () => lastName;
}

var p = new Person('Bob', 'Smith');
asnycFullName(p, console.log);          // will eventually output "Bob Smith"
p = new Person('Bob', 'Jones');
```
<hr>

### Functional Programming Is the Future

Code is becoming increasingly complex (conceptually) and higher performing through asynchronous code.

> There is no doubt in my mind, and most experts agree, that concurrency and parallelism are the future of programming.
>
> https://www.fpcomplete.com/blog/2012/04/the-downfall-of-imperative-programming

If we continue to program imperatively it will be very difficult to manage state with asynchronous code.

> A race condition or race hazard is the behavior of an electronic, software or other system where the output is dependent on the sequence or timing of other uncontrollable events. It becomes a bug when events do not happen in the order the programmer intended.
>
> https://en.wikipedia.org/wiki/Race_condition

--

> So why are data races so much harder to detect and fix than regular bugs? It all has to do with non-determinism. Every time a multi-threaded program is run, its threads may interleave differently. The number of possible interleavings is astronomical.
>
> https://www.fpcomplete.com/blog/2012/04/the-downfall-of-imperative-programming

--

> One way of reducing the complexity [of software] is to reduce or eliminate (ideally) the footprint of state change taking place in our programs.
>
> Fogus, Michael. Functional JavaScript.  O’Reilly Media, Inc. 2013

--

> Imperative programs will always be vulnerable to data races because they contain mutable variables… There are no data races in purely functional languages because they don't have mutable variables.
>
> https://www.fpcomplete.com/blog/2012/04/the-downfall-of-imperative-programming

<hr>

## Event Driven Programming

There are multiple ways that you have already used event driven programming:

- Asynchronous callbacks
- Promises
- Browser events
- Database interaction

### The Event Handler Paradigm

There are two components:

- An event emitter sends an event
- An event listener (or handler) listens for the emitted event.

The example below is partially pseudo code but demonstrates a few things:

1. There is generally a single emitter for each event type.
2. There can be any number of event listeners.
3. Event listeners are completely decoupled from the addUser function.

```js
var event = require('event');
var store = [];
var count = 0;

function addUser(name) {
    store.push(name);
    event.emit('user added', name);
}

event.on('user add', function(name) {
    console.log('user added: ' + name);
});

event.on('user add', function(name) {
    count++;
});
```

### The Callback Paradigm

You pass a function as a parameter to another function. That function will eventually call the passed function and pass it specific variables.

**Example**

The `setTimeout` function takes two parameters: the callback function and a number.

```js
function delayMessage(message, callback) {
    setTimeout(function() {
        callback(message);
    }, 500);
}

delayMessage('Hello, World!', function(message) {
     console.log(message);
});
```

### Browser Events

- Every element has one or more events.
- Events propagate upwards in the DOM.

The following example has a button that when clicked will be handled twice. First by the button click listener and second by the body click listener.

**index.html**

```html
<html>
    <body>
        <p>
            <button id='MyButton'>Click Me</button>
        </p>
        <script src="myscript.js"></script>
    </body>
</html>
```

**myscript.js**

```js
var button = document.querySelector('#MyButton');
button.addEventListener('click', function() {
    console.log('Button clicked');
})

var body = document.body;
body.addEventListener('click', function() {
    console.log('Body clicked');
});
```

<hr>

## Streams

Streams can be:

- readable
- writable
- duplex (both read and write)
- transform (a specific type of duplex)

When we used Gulp we saw readable, writable, and transform streams.

```js
var gulp = require('gulp');
var uglify = require("gulp-uglify");

gulp.task('minify-js', function () {
    gulp.src('./js/*.js')               // readable stream
        .pipe(uglify())                 // transform stream
        .pipe(gulp.dest('dest'));       // writable stream
});
```

You can image a data stream to be much like a regular stream of water.

- The stream comes from one or more sources.
- It might split or merge.
- It has outlets.

## Functional Reactive Programming

- Purely functional, immutable data.
- Events are used to produce streams.
- Functions subscribe to those streams and other streams to produce new streams.
- Lots of callback functions.

Two (of several) reactive JavaScript libraries:

- [Bacon.js](https://baconjs.github.io/)
- [RxJS](https://github.com/Reactive-Extensions/RxJS)

