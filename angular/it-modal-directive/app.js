(function() {
  "use strict";
  var app = angular.module('app', ['itModal']);

  app.controller('AppCtrl', ['itModal', '$scope', function(itModal, $scope) {

    this.submitCount = 0;

    this.incrementSubmitCount = function() {
      this.submitCount++;
    };

    this.showInitialModal = true;

    this.createModal = function() {
      itModal($scope, {
        title: 'Foo',
        body: 'Foo body'
      });
    };

  }]);
})();