'use strict';

angular.module('skinandInkApp')
  .controller('SliderController', function ($scope) {
    $scope.images = [{
    	src: 'src/common/assets/images/001.jpg',
    	title: 'Homepage 1'
    }, {
    	src: 'src/common/assets/images/002.jpg',
    	title: 'Homepage 2' 
    }, {
    	src: 'src/common/assets/images/003.jpg',
    	title: 'Homepage 3'
    }, {
    	src: 'src/common/assets/images/004.jpg',
    	title: 'Homepage 4'
    }, {
    	src: 'src/common/assets/images/005.jpg',
    	title: 'Homepage 5'
    }];
 });
