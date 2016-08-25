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
      var doc = $document[0];
      var contentHeight = 0;

      // -----------------------------------------------------------------------
      // scope properties
      // -----------------------------------------------------------------------
      $scope.highlightedCard = null;
      $scope.selectedCard = null;
      $scope.cards = [];
      $scope.cardsCopy = null;
      $scope.orderFilter = null;
      $scope.searchFilter = '';

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------

      /**
       * Method called when the controller is ready. Set the data required by
       * the view.
       */
      $scope.initialize = function () {
        var init = true;
        var limit = ($window.screen.availHeight === 320 || $window.screen.availWidth === 320) ? 3 : 6;

        // move the scroll bar to the top of the document (for Chrome and other explorers)
        doc.documentElement.scrollTop = doc.body.scrollTop = 0;

        // add a listener for the scroll event in the browser
        $window.addEventListener("scroll", function(e) {
          if (init === true) {
            // I beat you Firefox!
            // Firefox starts listening the scroll event because it stores the
            // scroll position in Y after refreshing the page, so this trick
            // will force it to move the scroll bar to top in the very first event
            // listening
            doc.documentElement.scrollTop = doc.body.scrollTop = 0;
            init = false;
            return;
          }

          // I took this operation from an old project, can't remember the source
          var scrollPercentage = ((doc.documentElement.scrollTop + doc.body.scrollTop) / (doc.documentElement.scrollHeight - doc.documentElement.clientHeight) * 100);

          // if the scroll is at its limit, load the next cluster of images
          if (scrollPercentage >= 100) {
            $scope.loadCards(3);
          }
        });

        // get all the art pieces in database
        $scope.loadCards(limit, $scope.checkIfMoreCardsNeeded);
      };

      $scope.searchFilterChange = function (e) {
        $gallerySrv.findPiece($scope.searchFilter, function (err, artPieces) {
          if (err) return;
          $scope.cards = artPieces;
          if (!$scope.cards && !$scope.searchFilter) $scope.cards = $scope.cardsCopy;
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

      /**
       * Method that loads cards from the Gallery in the database and attach them
       * to the current array of cards.
       * 
       * @param  {int}   _limit      The maximum amount of cards to load from  the
       *                             database.
       * @param  {Function} callback The function to call after completing the
       *                             request.
       */
      $scope.loadCards = function (_limit, callback) {
        $gallerySrv.getAllArtPieces({skip: $scope.cards.length, limit: _limit},
          function (err, artPieces) {
            if (err) return callback && (typeof callback === 'function') && callback(err);
            $scope.cards = $scope.cards.concat(artPieces);
            $scope.cardsCopy = angular.copy($scope.cards);
            callback && (typeof callback === 'function') && callback();
          }
        );
      };

      /**
       * Method that based on the height of the cards in the homepage and the
       * header determines if more cards are needed to fill the view so the
       * scroll bar is necessary. Other cards will be loaded during the scroll
       * event.
       * 
       * @param  {Object} err An Object containing an error from a response error
       *                      of the API.
       */
      $scope.checkIfMoreCardsNeeded = function (err) {
        if (err) return;

        // give angular 100 milliseconds to update the view, then check if more
        // cards should be loaded
        setTimeout(function () {
          contentHeight = (doc.getElementById('main-header').clientHeight + doc.getElementById('homepage').clientHeight);

          // if the height of the content of the page is lesser than the height
          // of the whole page, load 3 more cards
          if (contentHeight <= doc.documentElement.clientHeight) {
            // load another 3 cards
            $scope.loadCards(3, $scope.checkIfMoreCardsNeeded);
          }
        }, 100);
      };

      // -----------------------------------------------------------------------
      // controller listeners
      // -----------------------------------------------------------------------
      $scope.$on('orderCardsBy', function (event, attr) {
        $scope.orderFilter = attr;
      });

      // -----------------------------------------------------------------------
      // controller initiation
      // -----------------------------------------------------------------------
      $scope.initialize();
    }
  ]);
}());