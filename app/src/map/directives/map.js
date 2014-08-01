'use strict';

angular.module('skinandInkApp')
  .directive('map', function () {
    return {
      templateUrl: 'src/map/views/map.html',
      restrict: 'AE',
      link: function postLink($scope, element, attrs) {
        
      }
    };
  });
