/**
 * MainCtrl.js
 *
 * @description :: AngularJS Controller that contains global properties and
 *                 methods used by the whole application.
 */

(function () {
  'use strict';

  angular.module('MainController', [])
  .controller('mainCtrl', [
    '$scope',
    '$location',
    'authSrv',
    function ($scope, $location, $authSrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.currentUser = $authSrv.getCurrentUser;
      $scope.loading = false;

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------
      $scope.initialize = function () {
        $authSrv.getSession();
      };

      // -----------------------------------------------------------------------
      // controller listeners
      // -----------------------------------------------------------------------
      $scope.$on('show-loading', function () {
        $scope.loading = true;
      });

      $scope.$on('hide-loading', function () {
        // too fast you can't see the loading bar
        setTimeout(function () {
          $scope.loading = false;
          $scope.$apply();
        }, 500);
      });

      $scope.$on('401', function () {
        $location.path('/login');
      });

      // -----------------------------------------------------------------------
      // controller initiazion
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());