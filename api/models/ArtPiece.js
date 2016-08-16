/**
 * ArtPiece.js
 *
 * @description :: Database model that represents a piece of art.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },

    artist: {
      type: 'string'
    },

    about: {
      type: 'string'
    },

    price: {
      type: 'float'
    },

    imageurl: {
      type: 'string'
    },

    imagefd: {
      type: 'string'
    }
  }
};

