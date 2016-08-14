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
    function ($document) {
      // function that closes the overlay
      var closeOverlay = function () {
        // make the card null so 'display: none;' is applied to the overlay
        // curtain and content
        this.card = null;
      };

      // function that loads the previous card in the list of cards of the
      // container parent
      var prevCard = function () {
        // ToDo
        console.log('show prev card');
      };

      // function that loads the next card in the list of cards of the
      // container parent
      var nextCard = function () {
        // ToDo
        console.log('show next card');
      };

      return {
        restrict: 'E',
        templateUrl: 'app/directives/overlayDir.html',
        scope: {
          card: '='
        },
        link: function (scope, element, attrs) {
          scope.$watch('card', function (newVal) {
            $document[0].body.className = newVal && 'hide-scroll';
          });

          // assign the functions to scope's methods
          scope.closeOverlay = closeOverlay.bind(scope);
          scope.prevCard = prevCard.bind(this);
          scope.nextCard = nextCard.bind(this);
        }
      };
    }
  ]);
}());