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
    '$location',
    'authSrv',
    function ($scope, $location, $authSrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.username = '';
      $scope.password = '';
      $scope.remember = false;
      $scope.errorMsg = '';
      console.log('444');

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------
      $scope.login = function () {
        $authSrv.login({
          username: $scope.username,
          password: $scope.password
        }, function (err) {
          if (err) {
            $scope.errorMsg = err;
            return;
          }

          $location.path('/homepage');
        });
      };
    }
  ]);
}());