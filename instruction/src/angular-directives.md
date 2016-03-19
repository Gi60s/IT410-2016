# AngularJS Directives

<hr>

- Directives are custom HTML elements or attributes that add functionality to your HTML with very little input. - They are similar to Web Components

There is a lot to know about directives and we're just going to hit a few things here. For the full documentation check out these links:

[Directive Guide](https://docs.angularjs.org/guide/directive)

[$compile](https://docs.angularjs.org/api/ng/service/$compile)

<hr>

## Modal Window Directive

We're going to build a modal window directive, using the following stater files:

[Download the starter files](./it-modal-directive.zip)

**app.js**

```js (function() { "use strict"; var app = angular.module('app', ['itModal']);

 app.controller('AppCtrl', [function() {

 this.submitCount = 0;

 this.incrementSubmitCount = function() { this.submitCount++; };

 this.createModal = function() { // TODO: call the service to create a modal directive }

 }]); })(); ```

**index.html**

```html <!doctype html> <html> <head> <title>IT Modal Directive</title> <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"> </head> <body ng-app='app' ng-controller="AppCtrl as ctrl">

 <p>Submit Count: {{ctrl.submitCount}}</p>

 <button class='btn btn-default' ng-click="ctrl.createModal()">Show Modal</button>

 <it-modal></it-modal>

 <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js"></script> <script src="app.js"></script> <script src="it-modal.js"></script> </body> </html> ```

**it-modal.js**

```js (function() { "use strict"; var module = angular.module('itModal', []);

 module.factory('itModal', [function() { // TODO: create a service that creates an it-modal }]);

 module.directive('itModal', [function() { return { restrict: 'E', templateUrl: "./it-modal-tpl.html" } }]); })(); ```

**it-modal-tpl.html**

```html <div class="modal fade in" tabindex="-1" role="dialog" style="display: block;"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title">Modal title</h4> </div> <div class="modal-body"> <p>Body content</p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Submit</button> </div> </div> </div> </div> ```

<hr>

## Exercise

### The Title

We want the title of the modal to match the `title` attribute on the directive.

1. Create an isolate scope for the directive. 2. Add the title to the scope through an attribute string evaluation using `@`. 3. If a title is provided then use it to populate the modal's title, otherwise hide the modal's title area.

<hr>

### The Close X

We want the close button to show up if there is a `close-button` attribute in the directive that evaluates to `true`.

1. Add the closeBtn to the scope through an attribute value evaluation using `=`. 2. If scope.closeBtn is false then hide the button.

<hr>

### The Body

We want to populate the body with whatever content is inside of the directive.

1. Add the ng-transclude attribute to the template's body element. 2. In the directive configuration set the property `transclude` to `true`. 3. Add content to the directive element on the `index.html` file.

<hr>

### Close Functionality

We want the modal to animate to closed when we click the close button or the X button.

1. Create a controller with `$scope` and `$element` injected. 2. Set the `controllerAs` property. 3. Define a function that will remove the popup from the DOM. - The function should remove the `in` class from the modal's child element. - After a 500ms delay it should remove the element. 4. Use `ng-click` in the html template to call the close function.

<hr>

### Open Functionality

We want the modal to animate in when it appears.

1. Add a linking function. 2. After 1 tick then add the class `in` to the modal's child element.

<hr>

### Submit Functionality

We want the submit button on the modal to execute an expression provided through the `submit` attribute.

1. In the directive, add `submit` to the scope with `&`. 2. In the directive template have the submit button call `submit(); modal.close();`. 3. In the `index.html` add a paragraph that displays the value from `message`. 4. In the `index.html` add the attribute `submit="message = 'You clicked submit.'"`.

<hr>

### Hide the Submit Button

If there is no submit attribute then we want to hide the submit button.

1. For the modal template add the directive `ng-if="submit"` to the submit button. 2. In the `index.html` file remove the `submit` attribute from the directive element.

**Question:** Why is the submit-button still showing up.

<hr>

### Hide the Submit Button (Part 2)

**Question:** Why is the submit-button still showing up.

**Answer:** Scope properties evaluated to `&` wrap the property with a function. Even when the property doesn't exist a function is still created but the function does nothing.

1. On the directive scope add a the property `hasSubmit` set to `@submit`. 2. In the directive template set the `ng-if` on the submit button to `hasSubmit`.

<hr>

### Open a new Modal

1. Generate an element structure that builds the `it-modal` through Javascript, using a configuration to define parameters. 2. Use `$compile` and scope to compile the element. 3. Place the element on the DOM. 4. Inject the `itModal` and `$scope` services into the controller. 5. Have the `createModal` function call the service to create the modal.

<hr>

[Download the Completed Code](./it-modal-directive-done.zip)