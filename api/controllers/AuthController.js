/**
 * AuthController
 *
 * @description :: Server-side controller that handles authentication.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {
  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  /**
   * Method that authenticates the user. On success, store user data in session.
   * On failure, redirect to login page.
   * 
   * @param  {Object} req The request object.
   * @param  {Object} res The response object.
   */
  login: function(req, res) {
    // use local strategy for authentication
    console.log(req.cookies);
    passport.authenticate('local', function(err, userInDB, info) {
      if (err) return res.negotiate(err);
      if (!userInDB) return res.badRequest(info);

      // log in the user and store its information in session
      req.session.user = userInDB; 
      req.logIn(userInDB, function(err) {
        if (err) return res.negotiate(err);
        return res.json(userInDB);
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.session.user = undefined;
    req.logOut();
    req.session.destroy(function () {
      res.clearCookie('sails.sid');
      console.log(req.cookies);
      return res.send('logout successful!');
    });
  },

  checkSession: function (req, res) {
    if (!req.session.user) {
      return res.notFound({ message: 'No session stored.' });
    }

    res.send(req.session.user);
  }
};

