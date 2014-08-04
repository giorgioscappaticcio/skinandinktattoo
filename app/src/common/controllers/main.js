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

  	CommonMain.getFBInfo(164903213837).then( function(d) {
  		// success
  		
  		if(d){
  			$scope.infoObj = d;
			$log.debug('center', $scope.infoObj);
			$scope.center = {
				latitude: d.location.latitude,
				longitude: d.location.longitude
			}
			$log.debug('center', $scope.center);
			$scope.map.control.refresh($scope.center);
  		}
  	}, function(d) {
  		// request rejected (error)
  		$scope.infoObj = {};
  	});

  	
  	CommonMain.getFBPhotos(10152187799888838).then( function(d) {
  		// success
  		
  		if(d){
  			$scope.photosObj = d.data;
			$log.debug('photos', $scope.photosObj);
			
  		}
  	}, function(d) {
  		// request rejected (error)
  		$scope.photosObj = {};
  	});

  	// I toggle the value of isVisible.
    $scope.toggle = function(album) {

        $scope.isVisible = ! $scope.isVisible;
        $scope.fbAlbum = album;
    };

    // Default the blocks to be visible.
    $scope.isVisible = false;
  	

  
  	  

  	





  	
  	

  });
