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

  app.factory('AuthInterceptor', function ($rootScope, $q) {
    return {
      responseError: function (response) { 
        // $rootScope.$broadcast({
        //   401: AUTH_EVENTS.notAuthenticated,
        //   403: AUTH_EVENTS.notAuthorized,
        //   419: AUTH_EVENTS.sessionTimeout,
        //   440: AUTH_EVENTS.sessionTimeout
        // }[response.status], response);

        $rootScope.$broadcast('' + response.status);
        return $q.reject(response);
      }
    };
  });

}());