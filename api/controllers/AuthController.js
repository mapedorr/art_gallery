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
    passport.authenticate('local', function(err, userInDB, info) {
      if (err) return res.negotiate(err);
      if (!userInDB) return res.notFound();

      // log in the user and store its information in session
      // req.session.authenticated = true; 
      req.logIn(user, function(err) {
        if (err) return res.negotiate(err);
        return res.json(user);
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  }
};

