/**
 * UserController
 *
 * @description :: Server-side controller that exposes functions to operate with
 *                 the UserService from the front-end.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  setAvatar: function (req, res) {
    UserService.setAvatar({
      file: req.file('avatar'),
      userId: req.param('id')
    }, function (err, userInDB) {
      if (err) return res.negotiate(err);
      if (!userInDB) return res.notFound();
      req.session.user = userInDB[0];
      res.json(userInDB);
    });
  },

  getAvatar: function (req, res) {
    User.findOne(req.param('id'), function (err, userInDB) {
      if (err) return res.negotiate(err);
      if (!userInDB || (userInDB && !userInDB.avatarFd)) return res.notFound();

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk();

      // stream the file down
      fileAdapter.read(userInDB.avatarFd)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    });
  },

  updateData: function (req, res) {
    var newData = req.body;
    if (!newData) return res.badRequest();
    User.findOne(req.param('id'), function (err, userInDB) {
      if (err) return res.negotiate(err);
      if (!userInDB) return res.notFound();

      var dataToSend = {
        firstName: newData.firstName,
        lastName: newData.lastName,
        country: newData.country,
        email: newData.email
      };

      if (newData.password) {
        dataToSend.password = newData.password;
      }

      User.update(userInDB.id, dataToSend, function (err, userUpdated) {
        if (err) return res.negotiate(err);
        req.session.user = userUpdated[0];
        return res.json(userUpdated);
      });
    });
  }
};

