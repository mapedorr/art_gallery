/**
 * OverlayDir.js
 *
 * @description :: AngularJS Directive that creates an overlay element that
 *                 contains all the information of an specific piece of art.
 *                 Users can navigate through all the images in the gallery using
 *                 the previous (<) and next (>) buttons.
 *                 The overlay can be closed using only the X button in the top
 *                 right corner.
 */

(function () {
  'use strict';

  angular.module('OverlayDirective', [])
  .directive('overlayDir', [
    '$document',
    'gallerySrv',
    function ($document, $gallerySrv) {
      // function that closes the overlay
      var closeOverlay = function () {
        // make the card null so 'display: none;' is applied to the overlay
        // curtain and content
        this.card = null;
        this.cardIndex = -1;
      };

      // function that loads the previous card in the list of cards of the
      // container parent
      var prevCard = function () {
        var that = this;

        if (--this.cardIndex < 0) {
          $gallerySrv.getAllArtPieces({skip: this.cardsArray.length, limit: 1},
            function (err, artPieces) {
              if (err) return;

              // if there is no other image in the DB, then show the last image in the array
              if (!artPieces || !artPieces.length) return that.cardIndex = that.cardsArray.length - 1;

              that.cardsArray.push(artPieces[0]);
              that.cardIndex = that.cardsArray.length - 1;
          });
        }
      };

      // function that loads the next card in the list of cards of the
      // container parent
      var nextCard = function () {
        var that = this;
        if (++this.cardIndex >= this.cardsArray.length) {
          // try to get a new image from the db
          $gallerySrv.getAllArtPieces({skip: this.cardsArray.length, limit: 1},
            function (err, artPieces) {
              if (err) return;

              // if there is no other image in the DB, then show the first image in the array
              if (!artPieces || !artPieces.length) return that.cardIndex = 0;

              that.cardsArray.push(artPieces[0]);
              that.card = that.cardsArray[that.cardIndex];
          });
        }
      };

      var getNextCard = function (callback) {

      };

      return {
        restrict: 'E',
        templateUrl: 'app/directives/overlayDir.html',
        scope: {
          cardIndex: '=',
          cardsArray: '='
        },
        link: function (scope, element, attrs) {
          scope.card = null;

          // hide the scroll bar in the body element
          scope.$watch('cardIndex', function (newVal) {
            if (scope.cardsArray && newVal >= 0) {
              scope.card = scope.cardsArray[scope.cardIndex];
            }

            $document[0].body.className = scope.card && 'hide-scroll';
          });

          // assign the functions to scope's methods
          scope.closeOverlay = closeOverlay.bind(scope);
          scope.prevCard = prevCard.bind(scope);
          scope.nextCard = nextCard.bind(scope);
        }
      };
    }
  ]);
}());