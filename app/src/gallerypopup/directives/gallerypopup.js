'use strict';

angular.module('skinandInkApp')
  .directive('gallerypopup', function ($templateCache, $document, $compile, $log, CommonMain) {
    return {
      templateUrl: 'src/gallerypopup/views/gallerypopup.html',
      restrict: 'AE',
      link: function link($scope, element, attrs, $log) {
      
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
		  		element.removeClass('slideInLeft').addClass('slideOutLeft');
		  		setTimeout(function(){
		  			element.hide();
		  			$('#h').show().removeClass('slideOutLeft').addClass('slideInLeft');
		  		},600);
		  		element.removeClass('slideInLeft').addClass('slideOutLeft');
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
				setTimeout(function(){
					$('#h').hide();
					element.show().removeClass('slideOutLeft').addClass('slideInLeft');
				},600);
				
			// Hide element.
			} else {
				if(element.is(":visible")){
					element.removeClass('slideInLeft').addClass('slideOutLeft');
					setTimeout(function(){
						element.removeClass('slideOutLeft').addClass('slideInLeft');
					},600)
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
