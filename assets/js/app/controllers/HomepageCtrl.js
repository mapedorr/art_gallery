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
    '$location',
    '$document',
    '$window',
    'gallerySrv',
    function ($scope, $location, $document, $window, $gallerySrv) {
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
        $gallerySrv.getAllArtPieces({skip: 0, limit: 3}, function (err, artPieces) {
          if (err) return;
          $scope.cards = artPieces;
        });

        // add a listener for the scroll event in the browser
        $document.on('scroll', function(e) {
          var scrollY = e.target.defaultView.scrollY;

          if (scrollY > 0 && scrollY >= e.target.defaultView.scrollMaxY) {
            $gallerySrv.getAllArtPieces({skip: $scope.cards.length, limit: 3},
              function (err, artPieces) {
                if (err) return;
                $scope.cards = $scope.cards.concat(artPieces);
              }
            );
          }
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
      $scope.showDetail = function (cardIndex) {
        $scope.selectedCard = cardIndex;
        $scope.cardsArray = $scope.cards;
      };

      // -----------------------------------------------------------------------
      // controller initiation
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());