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

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------
      /** 
       * Method used for the initialization of the controller.
       */
      $scope.initialize = function () {
        $scope.gotoHomepage();
      };

      /**
       * Method that change the current location if the user already has a session.
       */
      $scope.gotoHomepage = function () {
        if ($scope.currentUser()) return $location.path('/homepage');
      };

      /**
       * Method that sends the data in the login form to the AuthSrv to execute
       * the login.
       */
      $scope.login = function () {
        if (!$scope.username || !$scope.password) {
          return $scope.errorMsg = 'All fields are required.';
        }

        $authSrv.login({
          username: $scope.username,
          password: $scope.password
        }, function (err) {
          if (err) {
            $scope.errorMsg = err;
            return;
          }

          $scope.gotoHomepage();
        });
      };

      // -----------------------------------------------------------------------
      // initialize
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());