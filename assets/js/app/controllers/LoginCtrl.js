(function () {
  'use strict';

  angular.module('LoginController', [])
  .controller('loginCtrl', [
    '$scope',
    function ($scope) {
      $scope.salute = 'Hello!!!';
    }
  ]);
}());