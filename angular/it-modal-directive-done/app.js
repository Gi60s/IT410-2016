(function() {
  "use strict";
  var app = angular.module('app', ['itModal']);

  app.controller('AppCtrl', ['itModal', '$scope', function(itModal, $scope) {

    this.submitCount = 0;

    this.incrementSubmitCount = function() {
      this.submitCount++;
    };

    this.createModal = function() {
      itModal($scope, {
        title: 'The Title',
        body: '<p>The body</p>',
        submit: 'ctrl.incrementSubmitCount()'
      });
    }

  }]);
})();
