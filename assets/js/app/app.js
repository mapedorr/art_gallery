(function () {
  'use strict';

  var app = angular.module('artGalleryApp', [
    'OverlayDirective',
    'LoginController',
    'HomepageController',
    'ProfileController'
  ]);

  // configure application
  // app.config([
  //   '$routeProvider',
  //   '$locationProvider',
  //   function ($routeProvider, $locationProvider) {
  //     $routeProvider
  //     .when('/login', {
  //       templateUrl: '/login.html',
  //       controller: 'loginCtrl'
  //     })
  //   }
  // ]);
}());