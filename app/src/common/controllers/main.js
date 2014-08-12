'use strict';

angular.module('skinandInkApp')
  .controller('MainCtrl', function ($scope, $log, CommonMain) {
  	
  	$scope.center = {
  		latitude: 0,
  		longitude: 0
  	};
  	
  	$scope.map = {
		center: $scope.center,
		zoom: 15,
		draggable: true,
		icon: 'src/common/assets/images/skull.png',
		control: {}

	};

  	

  	// I toggle the value of isVisible.
    $scope.toggleGallery = function(album) {

        $scope.galleryIsVisible = ! $scope.galleryIsVisible;
        $scope.fbAlbum = album;
    };

    $scope.toggleTattoo = function() {
      $scope.singleTattooIsVisible = ! $scope.singleTattooIsVisible;
    };

    // Default the blocks to be visible.
    $scope.galleryIsVisible = false;

    $scope.singleTattooIsVisible = false;

    CommonMain.getData().then( function(d) {
      
      if(d){
        console.log(d);
        $scope.globalInfo = d;
        CommonMain.getFBInfo($scope.globalInfo.general.fbID).then( function(c) {
          // success
          
          if(d){
            $scope.infoObj = c;
          $log.debug('center', $scope.infoObj);
          $scope.center = {
            latitude: c.location.latitude,
            longitude: c.location.longitude
          }
          $log.debug('center', $scope.center);
          $scope.map.control.refresh($scope.center);
          }
        }, function(c) {
          // request rejected (error)
          $scope.infoObj = {};
        });

        
        CommonMain.getFBPhotos($scope.globalInfo.general.fbAlbum).then( function(c) {
          // success
          
          if(c){
            $scope.photosObj = c.data;
          $log.debug('photos', $scope.photosObj);
          
          }
        }, function(c) {
          // request rejected (error)
          $scope.photosObj = {};
        });
      }
    }, function(d) {
      // request rejected (error)
      $scope.globalInfo = {};
    });

  	

  
  	  

  	





  	
  	

  });
