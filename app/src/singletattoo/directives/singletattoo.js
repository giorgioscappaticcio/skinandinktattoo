'use strict';

angular.module('skinandInkApp')
  .directive('singletattoo', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
    	      templateUrl: 'src/singletattoo/views/singletattoo.html',
    	      restrict: 'AE',
    	      link: function link($scope, element, attrs, $log) {
    	      
    	      	$scope.tattooPosition = 0;

    	      	$scope.generalInfoLoaded = false;

    	      	$scope.thumbLimit = 6;

    	      	$scope.nextTattoo = function(){
    	      		$scope.tattooPosition += 1;
    	      	}

    	      	$scope.prevTattoo = function(){
    	      		$scope.tattooPosition -= 1;
    	      	}

    	      	$scope.goToTattoo = function(indice){
    	      		$scope.tattooPosition = indice;
    	      	}

    	      	$scope.updateFacebookCall = function(){
	    	    
	    	        CommonMain.getFBInfo($scope.globalInfo.tattoo[$scope.tattooPosition].fbID).then( function(c) {
		      	    	  // success
		      	    	 
		      	    	  	$scope.singleTattoInfoObj = c;
		      	    	
		      	    	}, function(c) {
		      	    	  // request rejected (error)
		      	    	  $scope.singleTattoinfoObj = {};
		      	    	});

		      	    	CommonMain.getFBPhotos($scope.globalInfo.tattoo[$scope.tattooPosition].fbAlbum).then( function(a) {
		      	    	    // success
		      	    	    if(a){
		      	    	    	$scope.singleTattooPhotosObj = a.data;
		      	    	    }
		      	    	}, function(a) {
		      	    	      // request rejected (error)
		      	    	      $scope.singleTattooPhotosObj = {}
		      	    	});
		      	}

		      	$scope.navPosition = [];

      	    	$scope.createTattooThumb = function(){
	      	    	for (var i = 0 ; i < $scope.globalInfo.tattoo.length; i++){
	      	    		var navPos = $scope.globalInfo.tattoo[i].navPosition;
	      	    		var name = $scope.globalInfo.tattoo[i].title;
	      	    		//console.log(navPos)
    	      	    	CommonMain.getFBProfilePic($scope.globalInfo.tattoo[i].fbID, navPos, name).then( function(b) {
    	      	    	    // success
    	      	    	    if(b){
								$scope.tattooProfilePic.push({'url': b.url, 'id': b.navPos, 'name': b.name});
    	      	    	    	//console.log(b.navPos);
    	      	    	    }
    	      	    	}, function(b) {
    	      	    	      // request rejected (error)
    	      	    	      $scope.singleTattooProfilePicObj = {}
    	      	    	});
					}
      	    	}
    	      	
    	      	$scope.$watch('tattooPosition',function(oldValue, newValue){

    	      		if (!$scope.generalInfoLoaded){
    	      			return;
    	      		} else {
    	      			$scope.updateFacebookCall();
    	      		}
    	      	});

    	      	
    	      	   
    	      	    
	      	    	
		      	    	
	      	    	
	      	    	
    	      	 
    	      	
			


    	      	    

    	      	    
    	      	    


    	      	// I am the TRUTHY expression to watch.
    	      	var expression = attrs.singletattoo;

    	      	
    	      	// I check to see the default display of the
    			// element based on the link-time value of the
    			// model we are watching.
    			if ( ! $scope.$eval( expression ) ) {
    				//element.hide().addClass('slideOutLeft');
    			}

    			// I watch the expression in $scope context to
    			// see when it changes - and adjust the visibility
    			// of the element accordingly.
    			$scope.$watch(expression,function( newValue, oldValue ) {

    			  	
					// Ignore first-run values since we've
    				// already defaulted the element state.
    				if ( newValue === oldValue ) {
    					element.hide()
    				}
    				// Show element.
    				if ( newValue ) {
						//reset thumb image array
						$scope.tattooProfilePic = [];
						// reset tattoo position
						$scope.tattooPosition = 0;
						$scope.generalInfoLoaded = true;
						$scope.createTattooThumb();
						$scope.updateFacebookCall();
						$scope._Index = 0;
						var body = $document.find('body').eq(0);
						body.animate({scrollTop:0}, '500', 'swing', function() { 
						   	$('#h').removeClass('slideInLeft').addClass('slideOutLeft');
					     	setTimeout(function(){
					     		$('#h').hide();
					     		element.show().removeClass('slideOutLeft').addClass('slideInLeft');
					     		setTimeout(function(){
					     			$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
					     		},200);	
					     	},600);
						});
    					return;
					// Hide element.
    				} else {
    					element.hide();
    					 
    				}
    			});
    		   }
    };
  });
