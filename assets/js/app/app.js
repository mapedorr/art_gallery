(function () {
  'use strict';

  var app = angular.module('artGalleryApp', [
    // import modules of Services
    'AuthService',
    'GalleryService',
    'ProfileService',
    'UserService',

    // import modules of Directives
    'OverlayDirective',

    // import modules of Controllers
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