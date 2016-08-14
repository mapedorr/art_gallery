/**
 * ProfileSrv.js
 *
 * @description :: Service used for Profile operations
 */

(function () {
  'use strict';

  angular.module('ProfileService', [])
  .factory('profileSrv', [
    '$http',
    function ($http) {
      // -----------------------------------------------------------------------
      // service variables
      // -----------------------------------------------------------------------
      // ToDo

      // -----------------------------------------------------------------------
      // service methods
      // -----------------------------------------------------------------------
      /**
       * Function that sends the new values for the Admin profile to the API
       * so they can be updated in the database.
       * 
       * @param  {Object}   newVals  The Object with the new values of the profile.
       * @param  {Function} callback The function to call with the response from
       *                             the server.
       */
      var _saveProfile = function (newVals, callback) {
      };

      // return the object that will be used by other modules in the application
      return {
        saveProfile: _saveProfile
      };
    }
  ]);
}());