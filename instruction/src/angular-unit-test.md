# AngularJS Unit Testing

<hr>

## Karma

[Karma](http://karma-runner.github.io/), a great front-end testing tool, was built to test Angular applications.

> On the AngularJS team, we rely on testing and we always seek better tools to make our life easier. That's why we created Karma - a test runner that fits all our needs.
>
> http://karma-runner.github.io/

- Karma is not an assertion library
- Karma is a test runner.
- Karma can use plugins.
- Karma tests your code in whatever browser's you tell it to.

## Jasmine

- A testing tool that is similar to mocha and chai combined
- It is most frequently used with Karma to test angular.

[Jasmine Documentation](http://jasmine.github.io/)

## AngularJS Mock

- An angular module with mocking tools.
- Allows you to simulate an otherwise actual environment.
- Has synchronous services that act like actual counterparts.

[ngMock Documentation](https://docs.angularjs.org/api/ngMock)

<hr>

## Setup

1. Install karma globally: `npm install -g karma-cli`
2. Install karma locally: `npm install --save-dev karma`
3. Install karma plugins: `npm install --save-dev karma-jasmine karma-chrome-launcher`
4. Set up a karma configuration file: `karma init`
    - For the files to use:
        - Make sure you include the path to angular.js first.
        - Make sure you include angular-mock.js in your source directory.
        - Add paths for source JavaScript files.
        - Add paths for test JavaScript files.
5. Start karma: `karma start karma.conf.js`

If you're browser didn't open, then open it to the address listed in your command line.

<hr>

### Writing Tests

AngularJS has documentation on how to write unit tests for Controllers, Filters, and Directives. You can use a search engine to find how to do the others.

[AngularJS Unit Test Documentation](https://docs.angularjs.org/guide/unit-testing)
[Sitepoint Examples](http://www.sitepoint.com/unit-testing-angularjs-services-controllers-providers/)
