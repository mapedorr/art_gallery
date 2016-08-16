var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
bcrypt = require('bcryptjs');

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ id: id } , function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function (username, password, done) {
    // search the user in the database
    User.findOne({ username: username }, function (err, userInDB) {
      if (err) { return done(err); }
      if (!userInDB) {
        return done(null, false, { message: "That username is not in our database." });
      }

      // check if passwords match
      bcrypt.compare(password, userInDB.password, function (err, res) {
        if (!res) return done(null, false, { message: 'Invalid password' });

        // return the obtained User object
        return done(null, userInDB);
      });
    });
  }
));