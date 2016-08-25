/**
 * ArtPieceController
 *
 * @description :: Server-side controller that exposes functions to operate with
 *                 the ArtPieceService from the front-end.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  search: function (req, res) {
    if (!req.query.filter) return res.badRequest();

    ArtPiece.find(
      {
        or: [
          { name: { 'contains': req.query.filter } },
          { artist: { 'contains': req.query.filter } }
        ]
      },
      function (err, artPieces) {
        if (err) return res.negotiate(err);
        res.json(artPieces);
      }
    );
  },

  linkFile: function (req, res) {
    ArtPieceService.linkFile({
      file: req.file('picture'),
      artPieceId: req.param('id')
    }, function (err, artPieceInDB) {
      if (err) return res.negotiate(err);
      if (!artPieceInDB) return res.notFound();

      res.json(artPieceInDB);
    });
  },

  getFile: function (req, res) {
    ArtPiece.findOne(req.param('id'), function (err, artPieceInDB) {
      if (err) return res.negotiate(err);
      if (!artPieceInDB || (artPieceInDB && !artPieceInDB.imagefd)) return res.notFound();

      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk();

      // stream the file down
      fileAdapter.read(artPieceInDB.imagefd)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    });
  }
};

