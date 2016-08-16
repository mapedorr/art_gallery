/**
 * ArtPieceService
 *
 * @description :: Server-side service that contains functions to perform operations
 *                 in the ArtPiece model.
 * @help        :: See http://sailsjs.org/documentation/concepts/services
 */

module.exports = {
  linkFile: function (data, done) {
    // upload the picture (file) of the art piece
    data.file.upload(function (err, uploadedFiles) {
      if (err) {
        return done(err);
      }

      if (uploadedFiles.length === 0) {
        return done({message: "File wasn't uploaded."});
      }

      ArtPiece.update(data.artPieceId,
        {
          imageurl: require('util').format('%s/artpiece/%s/file', sails.getBaseUrl(), data.artPieceId),
          imagefd: uploadedFiles[0].fd
        },
        function (err, artPieceUpdated) {
          if (err) {return done(err);}
          done(null, artPieceUpdated);
        });
    });
  }
};

