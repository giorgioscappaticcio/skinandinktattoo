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

  	
  	

  
  	  

  	





  	
  	

  });
