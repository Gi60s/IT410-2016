
# Asynchronous JavaScript

<hr>

This lesson is best taught through a series of exercises.

## Exercise 1: Synchronous

 1. Navigate to a directory you can work from.
 2. From the command line: `git clone https://github.com/Gi60s/sized-files`
 3. Navigate into the size-files directory.
 4. Create a file called `sync.js`
 5. Use fs.readFileSync to read the files small.txt, medium.txt, and large.txt and output the first six (6) characters from each file in that order.
    - Lookup the [documentation for NodeJS' fs module](https://nodejs.org/api/fs.html)
 7. Output the amount of time it took to read all of the files.
 
<hr>

### Exercise 1: Solution

```js
var fs = require('fs');
var content;
var start = Date.now();

content = fs.readFileSync('./small.txt');
console.log(content);

content = fs.readFileSync('./medium.txt');
console.log(content);

content = fs.readFileSync('./large.txt');
console.log(content);

console.log(Date.now() - start);
```

<hr>

## Exercise 2: Asynchronous

 1. If you did not do exercise 1, the follow steps 1 - 3 of that exercise.
 2. Create a file named `async.js`
 3. Use fs.readFile to read the files small.txt, medium.txt, and large.txt and output the first six (6) characters of content of each in that order.
    - Lookup the [documentation for NodeJS' fs module](https://nodejs.org/api/fs.html)
 4. Output the amount of time it took to read all of the files.

<hr>

### Exercise 2: Solution 1

```js
var fs = require('fs');
var start = Date.now();

fs.readFile('./small.txt', 'utf8', function(err, data) {
    console.log(data.substr(0, 6));
});

fs.readFile('./medium.txt', 'utf8', function(err, data) {
    console.log(data.substr(0, 6));
});

fs.readFile('./large.txt', 'utf8', function(err, data) {
    console.log(data.substr(0, 6));
});

console.log(Date.now() - start);
```

**Questions:**

 1. What is wrong with this solution?
 2. What order did the file content come out in?
 3. Does the file content always come back in the same order?

<hr>

### Exercise 2: Solution 2

```js
var fs = require('fs');
var start = Date.now();

fs.readFile('./small.txt', 'utf8', function(err, data) {
    console.log(data.substr(0, 6));
    fs.readFile('./medium.txt', 'utf8', function(err, data) {
        console.log(data.substr(0, 6));
        fs.readFile('./large.txt', 'utf8', function(err, data) {
            console.log(data.substr(0, 6));
            console.log(Date.now() - start);
        });
    });
});
```

**Questions**

 1. Why didn't this run any faster then the synchronous example?
 2. Why is this more efficient then the synchronous example?

<hr>

### Exercise 2: Solution 3

This solution is also correct, but it is much more efficient and a lot more complex.

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
