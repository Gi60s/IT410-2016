(function() {
  "use strict";
  var module = angular.module('itModal', []);

  module.factory('itModal', ['$compile', function($compile) {
    return function(scope, config) {
      var body = angular.element(document.body);
      var el;

      el = angular.element('<it-modal>');
      if (config.closeBtn) el.attr('close-btn', 'true');
      if (config.title) el.attr('title', config.title);
      if (config.submit) el.attr('submit', config.submit);
      if (config.body) el.html(config.body);

      $compile(el)(scope);
      body.append(el);
    }
  }]);

  module.directive('itModal', [function() {
    return {
      restrict: 'E',
      templateUrl: "./it-modal-tpl.html",
      transclude: true,
      scope: {
        title: '@',
        closeBtn: '=',
        submit: '&',
        hasSubmit: '@submit'
      },
      controller: ['$scope', '$element', function($scope, $element) {
        this.close = function() {
          $element.children().removeClass('in');
          setTimeout(function() {
            $element.remove();
          }, 500);
        };
      }],
      controllerAs: 'modal',
      link: function(scope, el, attrs, controller) {
        setTimeout(function() {
          el.children().addClass('in');
        }, 0);
      }
    }
  }]);
})();
