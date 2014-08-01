'use strict';

angular.module('skinandInkApp')
  .directive('slider', function ($timeout) {
    return {
      templateUrl: 'src/slider/views/slider.html',
      restrict: 'AE',
      replace: true,
      scope: {
      	images: '='
      },
      link: function (scope, element, attrs) {
      	scope.currentIndex = 0; // Initially the index is at the first image
      	 
      	scope.next = function() {
      	  scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
      	};
      	 
      	scope.prev = function() {
      	  scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
      	};
      	scope.$watch('currentIndex', function() {
      	  scope.images.forEach(function(image) {
      	    image.visible = false; // make every image invisible
      	  });
      	 
      	scope.images[scope.currentIndex].visible = true; // make the current image visible

      	});

      }
    };
  });
