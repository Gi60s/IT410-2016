(function() {
  "use strict";
  var module = angular.module('itModal', []);

  module.factory('itModal', [function() {
    // TODO: create a service that creates an it-modal
  }]);

  module.directive('itModal', [function() {
    return {
      restrict: 'E',
      templateUrl: "./it-modal-tpl.html"
    }
  }]);
})();
