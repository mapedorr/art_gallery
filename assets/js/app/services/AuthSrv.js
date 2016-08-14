/**
 * AuthSrv.js
 *
 * @description :: Service used for User Authentication operations
 */

(function () {
  'use strict';

  angular.module('AuthService', [])
  .factory('authSrv', [
    '$http',
    function ($http) {
      // -----------------------------------------------------------------------
      // service variables
      // -----------------------------------------------------------------------

      // -----------------------------------------------------------------------
      // service methods
      // -----------------------------------------------------------------------
      var _isLoggedIn = function () {};

      var _currentUser = function () {};

      var _logIn = function () {};

      var _logOut = function () {};

      // return the object that will be used by other modules in the application
      return {
        isLoggedIn: _isLoggedIn,
        currentUser: _currentUser,
        logIn: _logIn,
        logOut: _logOut
      };
    }
  ]);
}());