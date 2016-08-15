/**
 * HomepageCtrl.js
 *
 * @description :: AngularJS Controller that handles the operations made in the
 *                 homepage page (views/app/homepage.jade).
 */

(function () {
  'use strict';

  angular.module('HomepageController', [])
  .controller('homepageCtrl', [
    '$scope',
    'gallerySrv',
    function ($scope, $gallerySrv) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.highlightedCard = null;
      $scope.selectedCard = null;
      $scope.cards = [];

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------

      /**
       * Method called when the controller is ready. Set the data required by
       * the view.
       */
      $scope.initialize = function () {
        // get all the art pieces in database
        $gallerySrv.getAllArtPieces({}, function (err, artPieces) {
          if (err) {
            // ToDo
            console.log('error getting gallery art pieces: ', err);
            return;
          }

          $scope.cards = artPieces;
        });
      };

      /**
       * Method that assigns the ID of the received card to $scope.highlightedCard
       * so the style of the element can be updated.
       * 
       * @param  {Object} card Object with the information of the card
       *              ==> (see /api/models/ArtPiece.js)
       */
      $scope.highlight = function (card) {
        $scope.highlightedCard = card && card.id;
      };

      /**
       * Method that opens the Overlay Directive and shows the full information
       * of the received card.
       * 
       * @param  {Object} card Object with the information of the card
       *              ==> (see /api/models/ArtPiece.js)
       */
      $scope.showDetail = function (card) {
        $scope.selectedCard = angular.copy(card);
      };

      // -----------------------------------------------------------------------
      // controller initiation
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());