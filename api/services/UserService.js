/**
 * UserService
 *
 * @description :: Server-side service that contains functions to perform operations
 *                 in the User model.
 * @help        :: See http://sailsjs.org/documentation/concepts/services
 */

module.exports = {
  setAvatar: function (data, done) {
    // upload the avatar of the user
    data.file.upload(function (err, uploadedFiles) {
      if (err) {
        return done(err);
      }

      if (uploadedFiles.length === 0) {
        return done({message: "File wasn't uploaded."});
      }

      User.update(data.userId,
        {
          avatarUrl: require('util').format('http://localhost:1337/user/%s/avatar', data.userId),
          avatarFd: uploadedFiles[0].fd
        },
        function (err, userUpdated) {
          if (err) {return done(err);}
          done(null, userUpdated);
        });
    });
  }
};

