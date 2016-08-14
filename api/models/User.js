/**
 * User.js
 *
 * @description :: Database model that represents a user.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    email: {
      type: 'string',
      email: true
    },

    firstName: {
      type: 'string'
    },

    lastName: {
      type: 'string'
    },

    country: {
      type: 'string'
    },

    // the URL of the user's avatar
    avatarUrl: {
      type: 'string'
    },

    avatarFd: {
      type: 'string'
    },

    gallery: {
      type: 'gallery'
    },

    isSuperAdmin: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

