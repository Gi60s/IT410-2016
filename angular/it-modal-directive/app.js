(function() {
  "use strict";
  var app = angular.module('app', ['itModal']);

  app.controller('AppCtrl', [function() {

    this.submitCount = 0;

    this.incrementSubmitCount = function() {
      this.submitCount++;
    };

    this.createModal = function() {
      // TODO: call the service to create a modal directive
    }

  }]);
})();