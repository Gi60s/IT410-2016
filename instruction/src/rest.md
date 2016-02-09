# REST and Express

<hr>

- REST was introduced in the year 2000.
- REST came about as a way to improve modularization of the web (separate the front-end from the back-end).
- REST is stateless, so the client has to maintain session and state information.
- The protocol is HTTP (or HTTPS).
- URL paths are resources and keys (no verbs).

#### Url Paths

- **Good Example** - GET /user/2341
- **Bad Example** - GET /getUser/2341

#### Exercise

1. Create a file called `rest.js`
2. Install express with `npm install express`
3. Inside the `rest.js` file include the code from the [Express Hello World](http://expressjs.com/en/starter/hello-world.html) example (or copy it from below).
4. Start your server using `node rest.js`
5. Open a web browser and navigate to http://localhost:3000/ (or whatever port you used).

**rest.js**

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

<hr>

## HTTP Methods

- There are many different methods that you can use for your REST services.
- Each method has guidelines, but not restrictions.

The most commonly used methods are:

- GET
- POST
- PUT
- DELETE

<hr>

### GET

- Probably the most commonly used method.
- Shouldn't be used to save data.
- Should be idempotent.

#### Questions

1. What does *idempotent* mean?
2. How could you send data to be saved using GET?

<hr>

#### Answers

1. What does *idempotent* mean?
    **No matter how many times to do an operation the result is the same.**
2. How could you send data to be saved using GET?
    **You could send information using query parameters, but it's not a good idea to send information with GET.**

#### Exercise

1. In your `rest.js` file change the output from "Hello, World!" to "GET"
2. Restart your server.
3. Through your browser, test that "GET" is now returned when you visit http://localhost:3000.

<hr>

### POST

- With a POST you can send information in the body of the request.
- Should not be idempotent - each time it's used it should make a change.
- Is not the CRUD equivalent of *create*, although it is often similar.

#### Exercise

1. In your `rest.js` file create a POST endpoint to `/` (same as GET, but with POST).
2. Have the response be "POST".
3. Restart your server.
4. Through your browser, POST to the URL http://localhost:3000 and you should get the response "POST".

<hr>

#### Question

1. How do you POST through your browser?

<hr>

#### Answer

1. How do you POST through your browser?
    **You can use a web form, or do an AJAX POST with JavaScript, or you can use a REST client.**

There are many REST clients that you can download to test your REST endpoints. If your using the Chrome browser I would recommend either the [Advanced REST client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=en-US&utm_source=chrome-ntp-launcher) or [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en-US&utm_source=chrome-ntp-launcher).

#### Exercise

1. Find a REST client that you'd like to use and install it.
2. Start the REST client.
3. Make a POST to your server.
4. You should get back: "POST".

<hr>

### REST Request Body

In express if you want to get the body of the request you may want to use the [body-parser module](https://www.npmjs.com/package/body-parser) that you can install with `npm install body-parser`.

- With this modules, if a request has a body then the module will attempt to parse it.
- Without this module if you want the body you'll have to manage gzip, deflate, and binary conversion on your own.

Look at the [body-parser examples](https://www.npmjs.com/package/body-parser#examples) and then complete the following exercise.

#### Exercise

In your `rest.js` file modify the post instruction so that it no long returns "POST", but instead returns the content that was sent in the body in all capital letters. You should use the bodyParser.text() to accomplish this.

<hr>

#### Solution

```js
var express = require('express')
var bodyParser = require('body-parser')
 
var app = express();
app.use(bodyParser.text())
 
app.post('/', function (req, res) {
    res.send(req.body.toUpperCase());
});
```

<hr>

## PUT

- With a PUT you can send information in the body of the request.
- Should be idempotent - no matter how many times you call it, the result is the same.
- Is not the CRUD equivalent of *update*. It can also be used to create. Example: Put the data to this state. If it doesn't exist then it creates it into that state.

<hr>

## DELETE

- With a DELETE you can send information with the body.
- Should be idempotent - no matter how many times you call it, the result is the same.
- If is is already deleted it shouldn't complain because the job is done.









