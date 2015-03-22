'use strict';

angular.module('Interviews', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'uiGmapgoogle-maps'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/',
        controller: 'MainCtrl'
      });

    $locationProvider.html5Mode(true);
  })
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: 'AIzaSyC0ojvwjVe4Ly7fDvzygU719J_vbrdFsMc',
          v: '3.17',
          libraries: 'weather,geometry,visualization'
      });
  });