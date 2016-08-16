/**
 * ProfileCtrl.js
 *
 * @description :: AngularJS Controller that handles the operations made in the
 *                 profile page (views/app/admin/profile.jade).
 */

(function () {
  'use strict';

  angular.module('ProfileController', [])
  .controller('profileCtrl', [
    '$scope',
    '$location',
    'authSrv',
    function ($scope, $location, $authSrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.editPassword = false;
      $scope.userCopy = null;

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------

      // method that initializes the variables in the controller and calls functions
      // if required
      $scope.initialize = function () {
        // make a copy of the user object
        $authSrv.getSession(function () {
          $scope.cancelChanges();
        });
      };

      // method that sends to the server the new values for the user to be saved
      $scope.saveChanges = function () {
        if ($scope.userObj.username !== $scope.userCopy.username) return;
        // ToDo
      };

      // method that restores the default values for the user properties
      $scope.cancelChanges = function () {
        $scope.editPassword = false;
        if ($scope.currentUser()) {
          $scope.userCopy = angular.copy($scope.currentUser());
          $scope.userCopy.passwordConfirm = '';
          $scope.userCopy.initials = ($scope.userCopy.firstName[0] + " " +
            $scope.userCopy.lastName[0]).toUpperCase();
        }
      };

      // -----------------------------------------------------------------------
      // initialize
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());