(function() {
  "use strict";
  var module = angular.module('itModal', []);

  module.factory('itModal', ['$compile', function($compile) {
    return function(scope, config) {
      var el = angular.element('<it-modal>');
      if (config.title) el.attr('title', config.title);
      if (config.buttonClose) el.attr('button-close', 'true');
      if (config.submit) el.attr('submit', config.submit);
      if (config.body) el.html(config.body);

      $compile(el)(scope);

      angular.element(document.body).append(el);
    };
  }]);

  module.directive('itModal', [function() {
    return {
      restrict: 'E',
      templateUrl: "./it-modal-tpl.html",
      transclude: true,
      scope: {
        title: '@',
        buttonClose: '=',
        submit: '&',
        hasSubmit: '@submit'
      },
      controller: ['$element', function($element) {

        this.close = function() {
          $element.children().removeClass('in');
          setTimeout(function() {
            $element.remove();
          }, 500);
        }

      }],
      controllerAs: 'ctrl',
      link: function(scope, element, attr, controller, transclude) {
        setTimeout(function() {
          element.children().addClass('in');
        }, 0);
      }
    }
  }]);
})();
