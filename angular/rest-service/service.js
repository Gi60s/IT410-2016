/*

THIS IS PSEUDO CODE

 */

(function() {
    "use strict";

    var app = angular.module('app', ['user-rest']);

    app.controller('MyCtrl', ['user-rest', function(ur) {
        var ctrl = this;

        this.message = '';

        this.userCreateSubmitClick = function(e) {
            e.preventDefault();
            ur.create(...)
                .then(function(result) {
                    if (result === true) ctrl.message = 'Created';
                })
        }

    }]);


    var module = angular.module('user-rest', []);

    module.service('user-rest', ['$http', function($http) {

        this.create = function(username, password, email, whatever) {
            return $http.put('/some/url:9000', { username: username, password: password })
                .then(function() {
                    return true;
                }, function() {
                    return false;
                })
        }

    }]);
})();