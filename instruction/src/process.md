# Process

<hr>

## What is a Process

A process is a running computer program. When we write a NodeJS application and then run it `node myapp.js` we create a running process for our NodeJS application.

Some processes are meant to be run once and then terminate. Some processes are meant to run indefinitely.

### Questions

1. What is an example of an application that should run once and then terminate?
2. What is an example of an application that should run indefinitely?
3. In NodeJS, what happens if an Error is thrown and not caught?

<hr>

## Uncaught Exceptions (Errors)

If your program throws an error and it is not caught then your program will crash.

### Questions

1. How can you catch all errors that might be thrown?
2. Should you catch all errors to prevent a program crash?

<hr>

## Catch All Errors

This is how you can catch all errors in NodeJS, **you shouldn't**.

```js
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
```

> By the very nature of how throw works in JavaScript, there is almost never any way to safely "pick up where you left off", without leaking references, or creating some other sort of undefined brittle state. https://nodejs.org/api/domain.html

Some errors are safe to recover from, for example: You've created a web server. A client makes a request to your webserver for a specific file. You attempt to read the file but it doesn't exist, throwing an error. You can catch the error and return a 404 status code (file not found) and your code can continue to run with stability.

If your process becomes unstable your best option is to shut it down.

<hr>

## The PM2 Daemon

Pronounced [dee-muh n] http://dictionary.reference.com/browse/daemon

A daemon is a computer process that runs in the background and often starts up with the operating system. Often they are used to start other processes.

PM2 is a NodeJS module that is best installed globally on the machine. It's primary role is to start your application and keep it running. If your program crashes, it starts it again.

#### Exercise

1. Visit http://pm2.keymetrics.io/docs/usage/quick-start/ in your browser and follow the installation instructions.
2. Create a JavaScript file that:
  - Writes to the console `I'm running`.
  - Runs a function every 1 second, using `setInterval`. This function will get a random number using `Math.random()`. If the number is less than `.2` then throw an Error. Otherwise log to the console `Still running.`
3. Start your application as you normally would `node app.js` and watch it until it crashes.
4. Use PM2 to start your application.

<hr>

#### Exercise Solution

JavaScript code - app.js

```js
console.log("I'm running");
setInterval(function() {
  if (Math.random() < 0.2) throw Error('Crash!');
  console.log('Still running');
}, 1000);
```

Console command

```sh
pm2 start app.js
```

#### Questions

1. What does the status report show you? You can use `pm2 status` to see it again.
2. Where are your console messages being output?

<hr>

## Useful PM2 Commands

Try some of these commands out to see for yourself how easy they are to use and to see their output.

### Process Management

`pm2 status` or `pm2 list` - Get the current status of all running processes.

`pm2 start <file> --name "App"` - Start the node app at <file> and give it the name "App".

`pm2 stop <app_name|id>` - Stop a specific process.

`pm2 restart <app_name|id>` - Restart a specific process.

`pm2 start <file> --watch` - Start the node app and watch it, files in the same directory, and files in sub-directories for changes. If a change occurs then the app will automatically restart.

`pm2 stop <app_name|id> --watch` - Stop watching for changes.

### Logs

`pm2 logs` - Get a live stream of all logs for all pm2 applications.

`pm2 logs 0` - Get a live stream of all logs for a single application.

### Monitoring

`pm2 monit` - Get CPU and memory usage for all running processes.

<hr>

## Clustering

- Modern CPUs have multiple cores that allow it to process multiple things concurrently.
- Clustering has to do with running your node application on multiple CPUs at the same time.
- Clustering is load balancing for a single machine.

`pm2 start <file> -i 0` - Start clustering on all CPUs.

`pm2 start <file> -i 2` - Start clustering on 2 CPUs.

`pm2 reload <app_name|id>` - Gracefully restart the application. At least one clustered process will be running at all times during the restart. This maintains 100% up time of your application, ideal for production environments.
