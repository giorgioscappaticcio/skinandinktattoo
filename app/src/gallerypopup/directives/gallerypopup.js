'use strict';

angular.module('skinandInkApp')
  .directive('gallerypopup', function ($templateCache, $document, $compile, $log, CommonMain, $window) {
    return {
      templateUrl: 'src/gallerypopup/views/gallerypopup.html',
      restrict: 'AE',
      link: function link($scope, element, attrs, $log) {
      
      	$scope.quantity = 5;
      	$scope.windowHeight = (window.innerHeight - 80) + 'px';
      	$scope.fullHeight = (window.innerHeight) + 'px';

      	var windowEl = angular.element($window);
      	var handler = function() {
      	    $scope.scroll = (windowEl.scrollTop() - 70) + 'px';
      	}
      	windowEl.on('scroll', $scope.$apply.bind($scope, handler));
      	handler();
      	  

      	// I am the TRUTHY expression to watch.
      	var expression = attrs.gallerypopup;

      	var fbAlbumId = null;

      	$scope.fbAlbum = 'studio'
      	// I check to see the default display of the
		// element based on the link-time value of the
		// model we are watching.
		if ( ! $scope.$eval( expression ) ) {
			element.hide().addClass('slideOutLeft');
		}

		// I watch the expression in $scope context to
		// see when it changes - and adjust the visibility
		// of the element accordingly.
		$scope.$watch(expression,function( newValue, oldValue ) {

		  	switch($scope.fbAlbum){
		  		case 'studio':
		  			fbAlbumId = 10152187799888838;
		  		break;
		  		case 'piercing':
		  			fbAlbumId = 473296213837;
		  		break;
		  		default :
		  			fbAlbumId = 0;
		  		break;

		  		return fbAlbumId;
		  	}

		  	if (fbAlbumId == 0) {
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
		  			
		  			if(d){
		  				$scope.photosObjGallery = d.data;
		  		
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
				$('#h').removeClass('slideInLeft').addClass('slideOutLeft');
				imagesLoaded( document.querySelector('.grid-wrap'), function( instance ) {
				  var allDone = true;
				  if (allDone){
				  	setTimeout(function(){
				  		$('#h').hide();
				  		element.show().removeClass('slideOutLeft').addClass('slideInLeft');
				  		new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
				  		setTimeout(function(){
				  			$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
				  		},200);	
				  	},600);
				  }
				});
			// Hide element.
			} else {
				if(element.is(":visible")){
					$('.back_home').removeClass('slideInDown').addClass('slideOutUp');
					setTimeout(function(){
						element.removeClass('slideInLeft').addClass('slideOutLeft');
						imagesLoaded( document.querySelector('.grid-wrap'), function( instance ) {
							var allDone = true;
							if (allDone){
								setTimeout(function(){
									element.removeClass('slideOutLeft').addClass('slideInLeft');
									new CBPGridGallery( document.getElementById( 'grid-gallery' ) );
									setTimeout(function(){
										$('.back_home').removeClass('slideOutUp').addClass('slideInDown');
									},200);
								},600);
							}
						});
					},200);
					
				} else {
					$('#h').removeClass('slideOutLeft').addClass('slideInLeft');
					setTimeout(function(){
						$('#h').hide();
						element.show().removeClass('slideOutLeft').addClass('slideInLeft');
					},600);
				}
			}
		});
		}
    };
  });
