'use strict';

angular.module('skinandInkApp')
  .directive('gallerypopup', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
      templateUrl: 'src/gallerypopup/views/gallerypopup.html',
      restrict: 'AE',
      link: function link($scope, element, attrs, $log) {
      
      	
  		
      	$scope.photos = [];

      	// initial image index
      	$scope._Index = 0;

      	// if a current image is the same as requested image
      	$scope.isActive = function (index) {
      	    return $scope._Index === index;
      	};

      	// show prev image
      	$scope.showPrev = function () {
      	    $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
      	};

      	// show next image
      	$scope.showNext = function () {
      	    $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
      	};

      	// show a certain image
      	$scope.showPhoto = function (index) {
      	    $scope._Index = index;
      	};


      	//$scope.windowHeight = (window.innerHeight - 80) + 'px';
      	$scope.windowHeight = (window.innerHeight - 220) + 'px';
      	$scope.fullHeight = (window.innerHeight) + 'px';

      	// I am the TRUTHY expression to watch.
      	var expression = attrs.gallerypopup;

      	var fbAlbumId = null;

      	
      	// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			element.hide().addClass('slideOutLeft');
		}

		// I watch the expression in $scope context to
		// see when it changes - and adjust the visibility
		// of the element accordingly.
		CommonMain.getData().then( function(d) {
		  // success
		  //$scope.photos = [];
		  if(d){
		    $scope.$watch(expression,function( newValue, oldValue ) {

		      	switch($scope.fbAlbum){
		      		case 'studio':
		      			fbAlbumId = $scope.globalInfo.general.fbAlbum;
		      		break;
		      		case 'piercing':
		      			fbAlbumId = $scope.globalInfo.general.piercingFbAlbum;
		      		break;
		      		default :
		      			fbAlbumId = $scope.globalInfo.general.fbAlbum;
		      		break;

		      		return fbAlbumId;
		      	}

		      	if ($scope.fbAlbum == 'close') {
		      		// this controls the button to close the gallery
		      		$('.back_home').removeClass('slideInDown').addClass('slideOutUp');
		      		setTimeout(function(){
		      			element.removeClass('slideInLeft').addClass('slideOutLeft');
		      			setTimeout(function(){
		      				element.hide();
		      				$('#h').show().removeClass('slideOutLeft').addClass('slideInLeft');
		      			},600);
		      		},200);
		      		return;
		      	} else {
		      		CommonMain.getFBPhotos(fbAlbumId).then( function(d) {
		      			// success
		      			$scope.photos = [];
		      			if(d){
		      				$scope.photosObjGallery = d.data;
		      				for (var i=0; i<d.data.length; i++){
		      					var ciao = {
		      						src: d.data[i].images[0].source, 
		      						thumb:d.data[i].images[d.data[i].images.length -1].source,
		      						 desc:'boh'
		      						}
		      					$scope.photos.push(ciao);
		      				}
		      			}
		    		}, function(d) {
		      			// request rejected (error)
		      			$scope.photosObjGallery = {};
		      		});
		      	}
		      	

		    	// Ignore first-run values since we've
		    	// already defaulted the element state.
		    	if ( newValue === oldValue ) {
		    		return;
		    	}
		    	// Show element.
		    	if ( newValue ) {
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

		    	// Hide element.
		    	} else {
		    		
		    		if(element.is(":visible")){
		    			$('.back_home').removeClass('slideInDown').addClass('slideOutUp');
		    			setTimeout(function(){
		    				element.removeClass('slideInLeft').addClass('slideOutLeft');
		    				setTimeout(function(){
		    					element.removeClass('slideOutLeft').addClass('slideInLeft');
		    					setTimeout(function(){
		    						$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
		    					},200);
		    				},600);
		    			},200);
		    		} 
		    	}
		    });
		  }
		}, function(d) {
		  // request rejected (error)
		  //$scope.globalInfo = {};
		});

	   }
    };
  });
