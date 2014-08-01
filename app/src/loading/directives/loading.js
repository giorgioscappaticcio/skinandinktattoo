'use strict';

angular.module('skinandInkApp')
  .directive('loading', function () {
    return {
      templateUrl: 'src/loading/views/loading.html',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
