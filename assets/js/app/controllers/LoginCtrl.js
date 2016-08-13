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
      // controller functions
      // -----------------------------------------------------------------------
      $scope.login = function () {
        console.log("Let's login");
      };
    }
  ]);
}());