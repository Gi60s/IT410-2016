# Gulp

<hr>

- Gulp is a task orchestration system.
- Run multiple small tasks to accomplish one large end task.
- Similar to Grunt, but less configuration and it runs faster.

[Objective Comparison of Grunt vs Gulp](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4#.l50838ihv)

<hr>

## Getting Started

Throughout this lesson we'll be using a specific file structure. Do the following to get your project set up:

1. Install gulp globally.

    ```sh
    $ npm install --global gulp-cli
    ```

2. Create a directory for your project.
3. Install gulp locally as a dev dependency:

    ```sh
    $ npm install --save-dev gulp
    ```

4. Create the following files within that directory.

    **./gulpfile.js**
    
    ```js
    var gulp = require('gulp');
    
    gulp.task('default', function() {
        console.log('Ran default task.');
    });
    ```
    
    **./src/index.html**
    
    ```html
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Colors</title>
        <link type="text/css" rel="stylesheet" href="css/main.css">
    </head>
    <body>
        <h1 class="red">Hello, World!</h1>
        <script type="text/javascript" src="js/main.js"></script>
    </body>
    </html>
    ```
    
    **./src/css/main.css**
    
    ```css
    .red {
        color: red;
    }
    
    .green {
        color: green;
    }
    
    .blue {
        color: blue;
    }
    ```
    
    **./src/js/main.js**
    
    ```js
    (function() {
        "use strict";
    
        var h1Elements = document.getElementsByTagName('h1');
        var h1Element = h1Elements[0];
        var classIndex = 0;
        var classNames = ['red', 'green', 'blue'];
    
        function changeClass() {
            classIndex++;
            if (classIndex >= classNames.length) classIndex = 0;
            h1Element.className = classNames[classIndex];
        }
    
        setInterval(changeClass, 1000);
    })();
    ```
5. Run the gulp default task from the directory.

    ```sh
    gulp [TASK]...
    ```
    
    If you don't specify a task to run then the `default` task will be run.

<hr>

## Gulp Tasks

[gulp.task](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulptaskname--deps-fn)

Notice that there is a second argument that is optional that allows you to pass in an array of tasks to run before the callback is called.

## JavaScript Streams

- Streams are similar to arrays except that they can have an infinite length.
- Often in a stream some code is feeding into the stream while other code is reading from the stream.
- The first item in the stream is usually the first one out.
- The stream reader waits until data arrives.
- The stream write writes data whenever it chooses to.
- You may be familiar with pipes (from Unix) and how you can pipe (or stream) the output from one command into the input of another command.

<hr>

## Vinyl

- A simple metadata object that describes a file's properties (such as file size, location, content, etc.)
- Vinyl adapters expose methods for `.src(globs)`, `.dest(globs)`, and `.watch(globs)`.
    - The parameters for these functions can be either a string or an array of strings.
- It's used for virtual files (saving time by not writing to disk).

## Globs

You can learn all about globs at [http://mywiki.wooledge.org/glob](http://mywiki.wooledge.org/glob).

- Globs are a file path matching pattern system.
- They originated with Unix.

Here are some common matching strings that you can use:

- `*.js` - This will match any files ending in .js in the current directory.
- `dir/*.js` - This will match any files in the dir directory that end in a .js.
- `**/*.js` - This will recursively dive through all directories, matching all files that end in .js, but it will not include the base directory in its search.

<hr>

## Define a JavaScript Minify Task

The objective here is to take all of the JavaScript files within our `./src/` directory and create minified versions of those files in the `./dist/` directory.

#### Questions
 
1. What is minification?
2. Why should we minify?

#### Exercise

1. Use [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) to write a task to minify all of your JavaScript files.
2. Install gulp-uglify: `npm install --save-dev gulp-uglify`.
3. Save minified copies of the JavaScript files in the dist directory.
4. Run your task using `gulp [TASK_NAME]`.

<hr>

#### Solution

```js
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('compress-js', function() {
    return gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
```

#### Exercise

It is good practice to rename minified files so that they have `.min` in the name. For example, `main.js` would become `main.min.js` when minified.

1. Use [gulp-rename](https://www.npmjs.com/package/gulp-rename) to rename the file.
2. Install gulp-rename: `npm install --save-dev gulp-rename`.
3. Add the rename function into the JavaScript minification transform sequence, setting the suffix to `.min`.

<hr>

#### Solution

```js
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('compress-js', function() {
    return gulp.src(['src/*.js', 'src/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
```

<hr>

## Useful Gulp Plugins

- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - Will automatically add vendor specific prefixes to your CSS.
- [gulp-sass](https://www.npmjs.com/package/gulp-sass) - Will convert your SASS and SCSS files into CSS files.
- [gulp-csso](https://www.npmjs.com/package/gulp-csso) - Will minify CSS.
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin) - Will automatically optimize your images for faster web page loading.
- [gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html) - Will take comments and unnecissary white space out ouf your HTML.
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - Will prevent errors from crashing your streams.
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - Will minify your JavaScript.
- [gulp-useref](https://www.npmjs.com/package/gulp-useref) - Useful for building source maps. 

<hr>

## Watching

[gulp.watch](https://github.com/gulpjs/gulp/blob/master/docs/API.md#gulpwatchglob--opts-tasks-or-gulpwatchglob--opts-cb)

- You can set up a watch that tells gulp to run specific tasks whenever files change.
- You'll probably want to add change plugins in case things haven't changed.
    - [gulp-changed](https://github.com/sindresorhus/gulp-changed) - Only pass changed files down stream.
    - [gulp-cached](https://github.com/contra/gulp-cached) - In memory file cache.
    - [gulp-remember](https://github.com/ahaurw01/gulp-remember) - Adds already passed files back into the stream.
    - [gulp-newer](https://github.com/tschaub/gulp-newer) - Passes source files that are newer than destination files down stream.