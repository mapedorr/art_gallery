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
    'authSrv',
    function ($http, $authSrv) {
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
      var _saveData = function (newVals, callback) {
        console.log('??????', newVals.passwordConfirm);
        $http({
            method: 'PUT',
            url: '/user/' + $authSrv.getCurrentUser().id,
            data: {
              firstName: newVals.firstName,
              lastName: newVals.lastName,
              country: newVals.country,
              email: newVals.email,
              password: newVals.passwordConfirm
            }
          })
          .success(function (data, status, headers, config) {
            $authSrv.updateCurrentUser(callback);
          })
          .error(function (data, status, headers, config) {
            callback(data);
          });
      };

      var _saveAvatar = function (avatar, callback) {
        var fd = new FormData();
        fd.append('avatar', avatar);

        //  transformRequest: angular.identity >> Leave the data intact in Angular’s default transformRequest function
        //  headers:{'Content-Type': undefined} >> the browser sets the Content-Type to multipart/form-data instead of using Content-Type : application/json
        //  ==> documentation: http://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
        $http.post('/user/' + $authSrv.getCurrentUser().id + '/avatar' ,
          fd,
          {
            transformRequest: angular.identity,
            headers:{'Content-Type': undefined}
          })
          .success(function (data) {
            $authSrv.updateCurrentUser(callback);
          })
          .error(function (err) {
            callback(err);
          });
      };

      // return the object that will be used by other modules in the application
      return {
        saveData: _saveData,
        saveAvatar: _saveAvatar
      };
    }
  ]);
}());