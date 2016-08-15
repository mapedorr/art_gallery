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
      var currentUser = null;

      // -----------------------------------------------------------------------
      // service methods
      // -----------------------------------------------------------------------
      var _currentUser = function () {
        return currentUser;
      };

      /**
       * Method that sends the login data to the server. In case of error, the
       * error message is send to the callback function.
       * 
       * @param  {Object}   loginObj Object with the required data for the login.
       *           => username
       *           => password
       * @param  {Function} callback Function to which an error message should
       *                             be send in case of authentication failure.
       */
      var _login = function (loginObj, callback) {
        $http({
          method: 'POST',
          url: '/login',
          data: loginObj
        }).success(function(data, status, headers, config){
          currentUser = data;
          callback();
        }).error(function(data, status, headers, config) {
          callback(data);
        });
      };

      var _logout = function () {};

      // return the object that will be used by other modules in the application
      return {
        currentUser: _currentUser,
        login: _login,
        logout: _logout
      };
    }
  ]);
}());