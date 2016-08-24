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
      var _getCurrentUser = function (callback) {
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
        })
        .success(function (data) {
          if (data.id) currentUser = data;
          callback();
        })
        .error(function (data) {
          callback(data.message || data);
        });
      };

      var _logout = function () {};

      var _updateCurrentUser = function (callback) {
        $http({
          method: 'GET',
          url: '/session'
        })
        .success(function (data) {
          if (data.id) currentUser = data;
          callback && callback();
        })
        .error(function (data) {
          callback && callback();
        });
      };

      var _getSession = function (callback) {
        if (currentUser) return callback && callback();
        _updateCurrentUser(callback);
      };

      // return the object that will be used by other modules in the application
      return {
        getCurrentUser: _getCurrentUser,
        login: _login,
        logout: _logout,
        updateCurrentUser: _updateCurrentUser,
        getSession: _getSession
      };
    }
  ]);
}());