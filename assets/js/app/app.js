(function () {
  'use strict';

  var app = angular.module('artGalleryApp', [
    'ngRoute',

    // import modules of Services
    'AuthService',
    'GalleryService',
    'ProfileService',
    'UserService',

    // import modules of Directives
    'OverlayDirective',

    // import modules of Controllers
    'LoginController',
    'MainController',
    'HomepageController',
    'ProfileController'
  ]);

  // configure Interceptors
  app.config([
    '$httpProvider',
    '$locationProvider',
    '$routeProvider',
    function ($httpProvider, $locationProvider, $routeProvider) {
      // add the service that will handle the interceptors
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);

      // define the routes for SPA
      $routeProvider
        .when('/',
          {
            templateUrl: '/homepage.html',
            controller: 'homepageCtrl'
          }
        )
        .when('/homepage',
          {
            templateUrl: '/homepage.html',
            controller: 'homepageCtrl'
          }
        )
        .when('/login',
          {
            templateUrl: '/login.html',
            controller: 'loginCtrl'
          }
        )
        .when('/profile',
          {
            templateUrl: '/profile.html',
            controller: 'profileCtrl'
          }
        );

      // enable HTML5 mode:
      //   enabled: true >> # is not used in URL path
      //   requireBase: false >> tag (#) is not required in URL path
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
    }
  ]);

  // create a service that will serve as interceptor
  app.factory('AuthInterceptor', function ($rootScope, $q) {
    return {
      request: function (request) {
        // show the loading bar
        $rootScope.$broadcast('show-loading');
        return request;
      },

      response: function (response) {
        // hide the loading bar
        $rootScope.$broadcast('hide-loading');
        return response;
      },

      responseError: function (response) { 
        // hide the loading bar
        $rootScope.$broadcast('hide-loading');

        // broadcast the state
        $rootScope.$broadcast('' + response.status);
        return $q.reject(response);
      }
    };
  });

}());