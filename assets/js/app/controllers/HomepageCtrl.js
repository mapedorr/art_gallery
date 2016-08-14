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
    function ($scope) {
      // -----------------------------------------------------------------------
      // controller variables
      // -----------------------------------------------------------------------
      $scope.highlightedCard = null;
      $scope.selectedCard = null;

      $scope.fakeData = [
        {
          id: 1,
          title: 'La uno',
          artist: 'Yeguis',
          description: 'Phasellus condimentum condimentum tempus.',
          price: '15',
          url: 'https://c2.staticflickr.com/8/7419/27880426241_78d5a2e1bb_k.jpg'
        },
        {
          id: 2,
          title: 'La dos',
          artist: 'Yeguis',
          description: 'Fusce in metus quam. Donec massa eros, congue eu lacus sed, eleifend venenatis ex.',
          price: '10',
          url: 'https://c8.staticflickr.com/8/7289/27750831871_cdfb2da172_k.jpg'
        },
        {
          id: 3,
          title: 'La tres',
          artist: 'Yeguis',
          description: 'Sed aliquam vitae massa non egestas.',
          price: '23',
          url: 'https://c3.staticflickr.com/8/7310/28058874322_2f1188eb21_k.jpg'
        },
        {
          id: 4,
          title: 'La cuatro',
          artist: 'Yeguis',
          description: 'Nullam pellentesque urna mi, non volutpat leo fringilla sit amet.',
          price: '12',
          url: 'https://c8.staticflickr.com/8/7649/27804991815_7ea639daed_k.jpg'
        },
        {
          id: 5,
          title: 'La cinco',
          artist: 'Yeguis',
          description: 'Fusce id lorem orci. Nunc porta lacus ac bibendum interdum.',
          price: '21',
          url: 'https://c2.staticflickr.com/8/7392/27167116833_a53304eefc_k.jpg'
        },
        {
          id: 6,
          title: 'La seis',
          artist: 'Yeguis',
          description: 'Aliquam erat volutpat. In vel nisi nec purus malesuada eleifend id sed ipsum.',
          price: '5',
          url: 'https://c8.staticflickr.com/9/8170/28024132823_9394414c4b_k.jpg'
        },
        {
          id: 7,
          title: 'La siete',
          artist: 'Yeguis',
          description: 'Quisque interdum lectus orci, non congue ex bibendum et.',
          price: '10',
          url: 'https://c7.staticflickr.com/9/8893/27921390990_71d4e9bd2f_k.jpg'
        },
        {
          id: 8,
          title: 'La ocho',
          artist: 'Yeguis',
          description: 'Cras ultrices vehicula eleifend. Suspendisse vel porta metus.',
          price: '13',
          url: 'https://c6.staticflickr.com/8/7740/27978130965_30061d1f85_k.jpg'
        },
        {
          id: 9,
          title: 'La nueve',
          artist: 'Yeguis',
          description: 'Nulla hendrerit interdum dui ut porta. Nam venenatis leo eu malesuada sodales.',
          price: '16',
          url: 'https://c3.staticflickr.com/8/7437/27254266234_8b92e6e2d1_k.jpg'
        }
      ];

      // -----------------------------------------------------------------------
      // controller methods
      // -----------------------------------------------------------------------

      // method that assigns the ID of the received card to $scope.highlightedCard
      // so the style of the element can be updated
      $scope.highlight = function (card) {
        $scope.highlightedCard = card && card.id;
      };

      // method that opens the Overlay Directive and shows the full information
      // of the received card
      $scope.showDetail = function (card) {
        $scope.selectedCard = angular.copy(card);
      };
    }
  ]);
}());