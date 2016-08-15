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
    'authSrv',
    function ($scope, $authSrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.username = '';
      $scope.password = '';
      $scope.remember = false;
      $scope.errorMsg = '';

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

          // [!]
          // in case of success, the AuthController (/api/controllers/AuthController.js)
          // will render the homepage page
        });
      };
    }
  ]);
}());