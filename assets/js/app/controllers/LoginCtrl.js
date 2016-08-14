/**
 * LoginCtrl.js
 *
 * @description :: AngularJS Controller that handles the operations made in the
 *                 login page (views/app/login/login.jade).
 */

(function () {
  'use strict';

  angular.module('LoginController', [])
  .controller('loginCtrl', [
    '$scope',
    function ($scope) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.username = '';
      $scope.password = '';
      $scope.remember = false;

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------
      $scope.login = function () {
        console.log("Let's login");
      };
    }
  ]);
}());