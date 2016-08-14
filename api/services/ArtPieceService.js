/**
 * ArtPieceService
 *
 * @description :: Server-side service that contains functions to perform operations
 *                 in the ArtPiece model.
 * @help        :: See http://sailsjs.org/documentation/concepts/services
 */

module.exports = {
  createArtPiece: function (options, done) {
    // create the ArtPiece
    ArtPiece.create(options).exec(function (err, artPieceInDB) {
      if (err) {
        return done(err);
      }
      done(null, artPieceInDB);
    });
  },

  linkFile: function (options, done) {
    // upload the picture (file) of the art piece
    options.file.upload(function (err, uploadedFiles) {
      if (err) {
        return done(err);
      }

      if (uploadedFiles.length === 0) {
        return done({message: "File wasn't uploaded."});
      }

      ArtPiece.update(options.artPieceId,
        {
          pictureUrl: require('util').format('%s/artPiece/picture/%s', sails.getBaseUrl(), options.artPieceId),
          pictureFd: uploadedFiles[0].fd
        },
        function (err, artPieceUpdated) {
          if (err) {return done(err);}
          done(null, artPieceUpdated);
        });
    });
  }
};

