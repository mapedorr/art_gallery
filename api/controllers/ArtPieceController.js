/**
 * ArtPieceController
 *
 * @description :: Server-side controller that exposes functions to operate with
 *                 the ArtPieceService from the front-end.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  createArtPiece: function (req, res) {
    ArtPieceService.createArtPiece(req.body, function (err, artPieceInDB) {
      if (err) {
        res.status(err.status || 400);
        res.json(err);
        return;
      }

      res.json(artPieceInDB);
    });
  },

  linkFile: function (req, res) {
    ArtPieceService.linkFile({
      file: req.file('picture'),
      artPieceId: req.param('id')
    }, function (err, artPieceInDB) {
      if (err) {
        res.status(err.status || 400);
        res.json(err);
        return;
      }

      res.json(artPieceInDB);
    });
  }
};

