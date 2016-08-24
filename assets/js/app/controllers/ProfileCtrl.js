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
    'profileSrv',
    function ($scope, $location, $authSrv, $profileSrv) {
      // -----------------------------------------------------------------------
      // private variables
      // -----------------------------------------------------------------------
      var file = null;
      var fileInput = null;

      // -----------------------------------------------------------------------
      // scope properties
      // -----------------------------------------------------------------------
      $scope.editPassword = null;
      $scope.userCopy = null;
      $scope.updateAvatar = null;
      $scope.confirmPasswordError = null;
      $scope.EMAIL_REGEXP = null;

      // -----------------------------------------------------------------------
      // private functions
      // -----------------------------------------------------------------------
      var checkPasswords = function () {
        if (!$scope.userCopy) return;
        if ($scope.userCopy.password && !$scope.userCopy.passwordConfirm ||
            $scope.userCopy.password !== $scope.userCopy.passwordConfirm) {
          $scope.confirmPasswordError = true;
        }
        else {
          $scope.confirmPasswordError = false;
        }
      };

      // -----------------------------------------------------------------------
      // scope methods
      // -----------------------------------------------------------------------

      /**
       * Method that initializes the variables in the controller and calls functions
       * if required.
       */
      $scope.initialize = function () {
        $scope.editPassword = false;
        $scope.updateAvatar = false;
        $scope.confirmPasswordError = false;
        $scope.EMAIL_REGEXP = /^\b[A-Z0-9._%+-]+@[A-Z0-9-.]+\.[A-Za-z]{2,3}\b/i;

        // make a copy of the user object
        $authSrv.getSession(function () {
          $scope.cancelChanges();
        });
      };

      /**
       * Method that sends to the server the new values for the user to be saved.
       */
      $scope.saveChanges = function () {
        var originUser = $scope.currentUser();

        // omit the flow if no data was changed
        $scope.userCopy.username = originUser.username;

        $profileSrv.saveData($scope.userCopy, function (err) {
          if (err) {
            console.error('error updating data:', err);
            return;
          }

          // check if the avatar has changed
          if ($scope.updateAvatar === true) {
            $profileSrv.saveAvatar(file, function (err) {
              if (err) {
                console.error('error updating avatar:', err);
                return;
              }

              $scope.cancelChanges();

              // add a random number to the avatar URL to force the browser skip
              // the data in cache
              $scope.userCopy.avatarUrl += "?rnd=" + Date.now();
            });
          }
        });
      };

      /**
       * Method that restores the default values for the user properties.
       */
      $scope.cancelChanges = function () {
        $scope.editPassword = false;

        if ($scope.currentUser()) {
          $scope.userCopy = angular.copy($authSrv.getCurrentUser());
          $scope.userCopy.password = null;
          $scope.userCopy.passwordConfirm = null;
          $scope.userCopy.initials = $scope.userCopy.firstName[0].toUpperCase() +
            $scope.userCopy.lastName[0].toLowerCase();
          $scope.userCopy.role = undefined;
        }
        else {
          $location.path('/login');
        }
      };

      /**
       * Method called when the user picks a file for the avatar.
       */
      $scope.onPhotoChange = function (e) {
        $scope.updateAvatar = true;

        fileInput = e;
        file = e.files[0];

        // verify that the file is an image (type)
        if ((file.type).indexOf('image') >= 0) {
          var fr = new FileReader();
          fr.onload = function (elm) {
            $scope.userCopy.avatarUrl = elm.target.result;
            $scope.$apply();
          }

          fr.readAsDataURL(file);
        }
      };

      $scope.$watch('userCopy.password', checkPasswords);
      $scope.$watch('userCopy.passwordConfirm', checkPasswords);

      // -----------------------------------------------------------------------
      // initialize
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());