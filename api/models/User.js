/**
 * User.js
 *
 * @description :: Database model that represents a user.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');

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

    rol: {
      type: 'string',
      defaultsTo: 'editor'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeValidate: function (user, callback) {
    // if the rol of the user to create is 'admin', check if there is not a user
    // with that rol in the database. If exists, set the rol of the user to create
    // to 'editor'
    User.findByRol('admin').exec(function (err, userInDB) {
      if (err) {
        console.error("[ERROR - /api/models/User.js | HAyRh69cXv] >> ", err);
        callback(err);
      }

      if (userInDB.length >= 1 && user.rol === 'admin') {
        user.rol = 'editor';
      }

      callback();
    });
  },

  beforeCreate: function (user, callback) {
    // encrypt the user password before it is stored in database
    this.encryptPassword(user, callback);
  },

  beforeUpdate: function (user, callback) {
    if (user.password) {
      return this.encryptPassword(user, callback);
    }
    
    callback();
  },

  encryptPassword: function (user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.error("[ERROR - /api/models/User.js | jBQfHlNO1w] >> ", err);
          return callback(err);
        }
        
        user.password = hash;
        return callback();
      });
    });
  }
};

