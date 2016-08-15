/**
 * ArtPiece.js
 *
 * @description :: Database model that represents a piece of art.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },

    artist: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    price: {
      type: 'float'
    },

    pictureUrl: {
      type: 'string'
    },

    pictureFd: {
      type: 'string'
    }
  }
};

