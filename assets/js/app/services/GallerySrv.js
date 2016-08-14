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
      var _getGallery = function (queryObj, callback) {};
      var _createPiece = function (pieceObj, callback) {};
      var _updatePiece = function (pieceObj, callback) {};
      var _deletePiece = function (pieceId, callback) {};
      var _uploadJson = function(json, callback) {};
      var _findPiece = function (queryObj, callback) {};

      // return the object that will be used by other modules in the application
      return {};
    }
  ]);
}());