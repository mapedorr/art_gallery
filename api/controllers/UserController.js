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
  }
};

