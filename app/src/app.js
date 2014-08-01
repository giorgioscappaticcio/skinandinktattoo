'use strict';

angular.module('skinandInkApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'google-maps'

])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/common/views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
