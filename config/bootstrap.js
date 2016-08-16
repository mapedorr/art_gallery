/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // import ASYNC to execue all the tasks
  var async = require('async');
  var fs = require('fs');
  var util = require('util');
  var baseUrl = sails.getBaseUrl();

  var readFile = function (path, callback) {
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        return callback(err);
      }

      callback(null, data);
    });
  };

  async.series([
      function (done) {
        // ---------------------------------------------------------------------------
        // | TASK: Admin user creation |||

        // check if the database already has an Admin user:
        //   - if not, create one
        //   - otherwise, go to the next task
        User.findByRol('admin').exec(function (err, adminsInDB) {
          if (err) {
            console.error('ERROR: trying to get the Admin');
            return done(err);
          }

          if (adminsInDB && adminsInDB.length > 0) {
            // the database already has an admin user
            console.log('User Admin is there');
            return done();
          }

          // create an Admin user so the application can be used
          var adminObj = {
            "username": "admin",
            "password": "asdasd",
            "email": "admin@ruvacabagallery.com",
            "firstName": "Admin",
            "lastName": "Minad",
            "country": "JavaScript",
            "rol": "admin"
          };

          User.create(adminObj, function (err, adminInDB) {
              if (err) {
                console.error('ERROR: trying to create the Admin');
                return done(err);
              }

              if (adminInDB) {
                console.log('Admin user created:\nusername: %s\npassword: %s\n',
                  adminInDB.username, adminObj.password);
                return done();
              }

              done();
          });
        });
      },
      function (done) {
        // ---------------------------------------------------------------------------
        // | TASK: Create pieces of art |||

        // check if the database already has pieces of art and ignore this task if the
        // response is affirmative
        ArtPiece.find({}, function (err, artPiecesInDB) {
          if (err) {
            console.error('ERROR: trying to get all the ArtPiece(s) in database');
            return done(err);
          }

          // if the database already has pieces of art, ignore the rest of the flow
          if (artPiecesInDB.length > 0) return done();

          // read the 'gallery.json' file and create records of each element in the array
          readFile('Source/gallery.json', function (err, data) {
            if (err) {
              console.error('ERROR: trying to read the "gallery.json" file');
              return done(err);
            }

            // add the pieces to database
            var piecesArray = JSON.parse(data);
            async.eachSeries(piecesArray,
              function (pieceObj, done2) {
                // store the imageurl
                var imageUrl = '' + pieceObj.imageurl;

                // transform the price in a number and create the ArtPiece
                pieceObj.price = Number(pieceObj.price.replace('$',''));
                ArtPiece.create(pieceObj, function (err, pieceInDB) {
                  if (err) {
                    console.error('ERROR: trying to create piece: ', pieceObj.name);
                    return done2(err);
                  }

                  // set the URL and FD for the image and update the record;
                  // this will be used later by the server to send the files to
                  // the client
                  pieceInDB.imageurl = util.format('%s/artpiece/%s/file', baseUrl, pieceInDB.id);
                  pieceInDB.imagefd = sails.config.appPath + '/' + '.tmp/uploads/' + imageUrl.split('/')[2];
                  pieceInDB.save(done2);
                });
              },
              function (err) {
                if (err) {
                  console.log('ERROR: trying to add pieces to DB.');
                  return done(err);
                }
                done();
              }
            );
          });
        });
      }
    ],
    function (err) {
      if (err) console.error('Something went wrong. We need an adult!');

      // eject the callback so Sails can cotinue with the application startup
      cb(err);
    }
  );

  return;
};
