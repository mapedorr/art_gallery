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
      $scope.currentUser = $authSrv.currentUser;

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------
      $scope.$on('401', function () {
        console.log('???');
        $location.path('/login');
      });
    }
  ]);
}());