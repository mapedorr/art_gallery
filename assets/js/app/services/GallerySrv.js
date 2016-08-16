/**
 * GallerySrv.js
 *
 * @description :: Service used for Gallery operations
 */

(function () {
  'use strict';

  angular.module('GalleryService', [])
  .factory('gallerySrv', [
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
       * Method that gets all the art pieces in database and sends them to
       * the callback function received as parameter.
       * 
       * @param  {Object}   queryObj An Object that defines a query for the art
       *                             pieces to get.
       * @param  {Function} callback Function to which the server response will
       *                             be send.
       */
      var _getAllArtPieces = function (queryObj, callback) {
        var url = '/artpiece/find';
        var p = '';

        if (queryObj) {
          url += '?';
          for (p in queryObj) {
            if (queryObj.hasOwnProperty(p)) {
              url += p + '=' + queryObj[p] + '&';
            }
          }
          url = url.slice(0,-1);
        }

        $http({
          method: 'GET',
          url: url
        }).success(function(data, status, headers, config){
          callback(null, data);
        }).error(function(data, status, headers, config) {
          callback(data);
        });
      };


      var _createPiece = function (pieceObj, callback) {};
      var _updatePiece = function (pieceObj, callback) {};
      var _deletePiece = function (pieceId, callback) {};
      var _uploadJson = function(json, callback) {};
      var _findPiece = function (queryObj, callback) {};

      // return the object that will be used by other modules in the application
      return {
        getAllArtPieces: _getAllArtPieces,
        createPiece: _createPiece,
        updatePiece: _updatePiece,
        deletePiece: _deletePiece,
        uploadJson: _uploadJson,
        findPiece: _findPiece
      };
    }
  ]);
}());