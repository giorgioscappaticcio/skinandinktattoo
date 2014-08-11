'use strict';

angular.module('skinandInkApp')
  .directive('singletattoo', function ($templateCache, $document, $compile, $log, CommonMain, $window, $location) {
    return {
    	      templateUrl: 'src/singletattoo/views/singletattoo.html',
    	      restrict: 'AE',
    	      link: function link($scope, element, attrs, $log) {
    	      
    	      	


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
