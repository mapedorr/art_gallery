/**
 * User.js
 *
 * @description :: Database model that represents a user.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    username: {
      type: 'string',
      unique: true,
      required: true
    },

    password: {
      type: 'string',
      required: true,
      minLength: 6
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
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }
        else {
          user.password = hash;
          cb();
        }
      });
    });
  }
};

