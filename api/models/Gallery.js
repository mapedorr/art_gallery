/**
 * Gallery.js
 *
 * @description :: Database model that represents a gallery. A gallery contain
 *                 a set of pieces of art (ArtPiece).
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    artPieces: {
      collection: 'artPiece',
      via: 'owner'
    },

    adminUsers: {
      collection: 'user',
      via: 'gallery'
    }
  }
};

