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
    function ($scope) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.userObj = null;
      $scope.userCopy = null;

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------

      // method that initializes the variables in the controller and calls functions
      // if required
      $scope.initialize = function () {
        // make a fake user object for testing while templating and styling
        $scope.userObj = {
          id: '481244kj34k12j3h4k12j34h',
          username: 'admin',
          password: 'admin',
          email: 'mapedorr@gmail.com',
          firstName: 'Razputin',
          lastName: 'Aquato',
          country: 'Psychocity',
          picture: 'http://nintendoagemedia.com/users/8507/avatars/psychonauts_n.jpg'
        };

        // make a copy of the user object
        $scope.cancelChanges();
      };

      // method that sends to the server the new values for the user to be saved
      $scope.saveChanges = function () {
        if ($scope.userObj.username !== $scope.userCopy.username) return;
        // ToDo
      };

      // method that restores the default values for the user properties
      $scope.cancelChanges = function () {
        $scope.userCopy = angular.copy($scope.userObj);
      };

      // -----------------------------------------------------------------------
      // initialize
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());