/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  // view route
  'GET /': { view: 'layout' },
  'GET /login.html': { view: 'app/login/login' },
  'GET /homepage.html': { view: 'app/homepage' },
  'GET /profile.html': { view: 'app/admin/profile' },
  'GET /app/directives/overlayDir.html': { view: 'app/directives/overlayDir' },

  // login(out) API routes
  'POST /login': 'AuthController.login',
  'GET /logout': 'AuthController.logout',
  'GET /session': 'AuthController.checkSession',

  // ArtPieceController API routes
  'GET /artpiece/search': 'ArtPieceController.search',
  'GET /artpiece/:id/file': 'ArtPieceController.getFile',
  'POST /artpiece/:id/file': 'ArtPieceController.linkFile',

  // UserController API routes
  'GET /user/:id/avatar': 'UserController.getAvatar',
  'POST /user/:id/avatar': 'UserController.setAvatar',
  'PUT /user/:id': 'UserController.updateData'

};
