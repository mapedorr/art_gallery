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
    '$rootScope',
    'authSrv',
    function ($scope, $location, $rootScope, $authSrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.currentUser = $authSrv.getCurrentUser;
      $scope.loading = false;
      $scope.view = null;
      $scope.ascOrder = null;
      $scope.orderFilter = null;
      $scope.smartPhoneMenu = false;
      $scope.showSearchField = false;

      // -----------------------------------------------------------------------
      // scope methods
      // -----------------------------------------------------------------------
      $scope.initialize = function () {
        $authSrv.getSession();
      };

      $scope.goto = function (page) {
        if (page !== $scope.view) {
          $location.path(page);
        }
      };

      $scope.logout = function () {
        $scope.view = null;
        $authSrv.logout(function () {
          $location.path('/login');
        });
      };

      $scope.orderBy = function (attr) {
        // ($scope.propertyName === propertyName) ? !$scope.reverse : false
        if ($scope.ascOrder === null) $scope.ascOrder = true;
        else if ($scope.orderFilter === attr) $scope.ascOrder = !$scope.ascOrder;
        $scope.orderFilter = attr;
        $rootScope.$broadcast('orderCardsBy', attr, $scope.ascOrder);
      };

      $scope.toggleMenu = function () {
        $scope.smartPhoneMenu = !$scope.smartPhoneMenu;
      };

      $scope.toggleSearch = function () {
        $scope.showSearchField = !$scope.showSearchField;
        $scope.toggleMenu();
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

      $scope.$on('$routeChangeSuccess', function(event, current) {
        var match = ((current.loadedTemplateUrl).match(/homepage|profile/));
        // reset the ordering filters
        $scope.smartPhoneMenu = false;
        $scope.ascOrder = null;
        $scope.orderFilter = null;

        // look for 'homepage' XOR 'profile' in the URL of the template to know
        // which is the current view
        $scope.view = match && match.length > 0 && match[0];
      });

      // -----------------------------------------------------------------------
      // controller initiazion
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());