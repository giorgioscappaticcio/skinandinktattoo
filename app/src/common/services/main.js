'use strict';

angular.module('skinandInkApp')
  .service('CommonMain', function CommonMain($http, $q) {
    
  	
  	

  	this.getData = function() {

  	  
  	  var d = $q.defer();

  	  $http({method: 'GET', url: 'src/common/assets/data/data.json'}).
	    success(function(data, status, headers, config) {
	    	var superData = data.tattoo[0].title
	    	return d.resolve(superData)
	    }).
	    error(function(data, status, headers, config) {
	      return d.reject('you got a problem');
	    });
		
		return d.promise;
  	};

  	this.getFBInfo = function(fbID){
  		var fbInfoAPI = "https://graph.facebook.com/"+fbID;
		var d = $q.defer();

		$http({method: 'GET', url: fbInfoAPI}).
			success(function(data, status, headers, config) {
				var superData = data
				return d.resolve(superData)
			}).
			error(function(data, status, headers, config) {
				return d.reject('you got a problem');
			});

		return d.promise;
	};

  	this.getFBPhotos = function(fbAlbum){
  		var fbInfoAPI = 'https://graph.facebook.com/'+fbAlbum+'/photos?limit=100';
		var d = $q.defer();

		$http({method: 'GET', url: fbInfoAPI}).
			success(function(data, status, headers, config) {
				var superData = data
				return d.resolve(superData)
			}).
			error(function(data, status, headers, config) {
				return d.reject('you got a problem');
			});

		return d.promise;
	};

	
	
    
  });
